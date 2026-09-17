#!/usr/bin/env bash
# Builds the static export and syncs it to Namecheap public_html over SFTP.
#
# public_html on this hosting account is shared with several unrelated addon
# domains (myfishpalapp.com, bigsmashsoftware.com, etc.) — this script must
# only ever touch the top-level entries that belong to this site's own
# export, never wipe the whole directory.
#
# Requires: lftp (`brew install lftp`) and an SSH key authorized in cPanel
# (Manage SSH Keys), unlocked once via `yarn deploy:unlock` — the account has
# no shell access and can't be scripted with a password prompt.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

ENV_FILE="$REPO_ROOT/.env.deploy"
if [[ ! -f "$ENV_FILE" ]]; then
    echo "Missing .env.deploy — copy .env.deploy.example to .env.deploy and fill in your values." >&2
    exit 1
fi
# shellcheck disable=SC1090
source "$ENV_FILE"

for var in DEPLOY_SSH_HOST DEPLOY_SSH_PORT DEPLOY_SSH_USER DEPLOY_SSH_KEY DEPLOY_REMOTE_PATH; do
    if [[ -z "${!var:-}" ]]; then
        echo "$var is not set in .env.deploy" >&2
        exit 1
    fi
done

if [[ ! -f "$DEPLOY_SSH_KEY" ]]; then
    echo "SSH key not found at $DEPLOY_SSH_KEY" >&2
    exit 1
fi

# Merely absent from ssh-agent isn't fatal on its own — a ~/.ssh/config with
# UseKeychain/AddKeysToAgent (see README) silently loads it from Keychain the
# moment the real ssh connection below needs it, without ever showing up
# here. So this is a hint, not a hard failure; SSH_ASKPASS_REQUIRE=never on
# that real connection is what actually guarantees a locked key fails fast
# instead of hanging on an invisible GUI passphrase prompt.
KEY_FINGERPRINT="$(ssh-keygen -lf "$DEPLOY_SSH_KEY" | awk '{print $2}')"
if ! ssh-add -l 2>/dev/null | grep -qF "$KEY_FINGERPRINT"; then
    echo "Note: deploy key isn't in ssh-agent yet. If it's saved in Keychain (see README), the connection below will unlock it silently; otherwise run 'yarn deploy:unlock' first." >&2
fi

echo "==> Building static export"
yarn expo export --platform web

DIST_DIR="$REPO_ROOT/dist"
if [[ ! -f "$DIST_DIR/index.html" ]]; then
    echo "dist/index.html missing after export — build failed." >&2
    exit 1
fi
if ! grep -q "SENIOR MOBILE SOFTWARE ENGINEER" "$DIST_DIR/index.html"; then
    echo "dist/index.html does not contain expected page text — export looks broken (script-only shell?). Aborting before upload." >&2
    exit 1
fi

# Exactly the top-level entries this export produces. Deriving this from
# dist/ itself (rather than a separately maintained list) keeps deletion
# scope in lockstep with whatever the export actually contains, so a future
# route or asset folder is picked up automatically instead of silently
# surviving as a stale file on the server.
REMOTE_TARGETS=()
while IFS= read -r entry; do
    REMOTE_TARGETS+=("$entry")
done < <(cd "$DIST_DIR" && find . -mindepth 1 -maxdepth 1 -exec basename {} \;)

if [[ ${#REMOTE_TARGETS[@]} -eq 0 ]]; then
    echo "dist/ is empty — nothing to deploy." >&2
    exit 1
fi

echo "==> Will replace these entries under $DEPLOY_REMOTE_PATH/ on $DEPLOY_SSH_HOST:"
printf '    %s\n' "${REMOTE_TARGETS[@]}"

# Uploaded into this staging directory first, then swapped into place one
# rename per entry - never a bare "delete everything, then re-upload" pass,
# which would leave the live site with missing files/assets for the full
# upload duration if the connection dropped partway through. A fixed name
# (rather than one keyed to this run) lets a crashed prior run's leftovers
# be cleaned up automatically by the rm -rf below instead of accumulating.
STAGING_DIR=".deploy-staging"

LFTP_SCRIPT="$(mktemp)"
trap 'rm -f "$LFTP_SCRIPT"' EXIT

{
    # SSH_ASKPASS_REQUIRE=never is the actual hang fix: without it, a locked
    # key with no TTY can still trigger an invisible macOS GUI passphrase
    # prompt that waits forever instead of failing (BatchMode=yes alone
    # doesn't stop this on macOS) — this forces an immediate, loud failure
    # instead, while leaving a Keychain-backed silent unlock unaffected.
    echo "set sftp:connect-program \"SSH_ASKPASS_REQUIRE=never ssh -a -x -i $DEPLOY_SSH_KEY -p $DEPLOY_SSH_PORT -o BatchMode=yes\""
    echo "set sftp:auto-confirm yes"
    # Left on for the whole script (rm -rf's own -f already tolerates a
    # missing target, so this never masks a real failure) - any genuine
    # error aborts loudly instead of continuing past it.
    echo "set cmd:fail-exit yes"
    echo "open -u $DEPLOY_SSH_USER, sftp://$DEPLOY_SSH_HOST"
    echo "cd $DEPLOY_REMOTE_PATH"
    echo "rm -rf \"$STAGING_DIR\""
    echo "mkdir \"$STAGING_DIR\""
    echo "lcd \"$DIST_DIR\""
    echo "mirror --reverse --verbose --parallel=4 . \"$STAGING_DIR\""
    for target in "${REMOTE_TARGETS[@]}"; do
        echo "rm -rf \"$target\""
        echo "mv \"$STAGING_DIR/$target\" \"$target\""
    done
    echo "rm -rf \"$STAGING_DIR\""
    echo "bye"
} > "$LFTP_SCRIPT"

echo "==> Uploading via SFTP"
lftp -f "$LFTP_SCRIPT"

if [[ -n "${DEPLOY_SITE_URL:-}" ]]; then
    echo "==> Smoke-testing $DEPLOY_SITE_URL"
    # The upload above already succeeded, so a connection failure here (a
    # DNS hiccup, a stalled handshake) is only a failed smoke test, not a
    # failed deploy - it must not trip set -e and mask that the site is
    # already live. --connect-timeout/--max-time bound how long a
    # black-holed request can hang before that failure is even reported.
    if HTTP_CODE="$(curl -s -o /dev/null -w '%{http_code}' --connect-timeout 5 --max-time 15 "$DEPLOY_SITE_URL/")"; then
        if [[ "$HTTP_CODE" != "200" ]]; then
            echo "Warning: $DEPLOY_SITE_URL/ returned $HTTP_CODE" >&2
        else
            echo "    $DEPLOY_SITE_URL/ -> 200"
        fi
    else
        echo "Warning: could not reach $DEPLOY_SITE_URL/ for the smoke test" >&2
    fi
fi

echo "==> Deploy complete"
