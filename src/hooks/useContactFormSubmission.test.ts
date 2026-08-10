import { act, renderHook } from "@testing-library/react-native";

import { useContactFormSubmission } from "./useContactFormSubmission";

describe("useContactFormSubmission", () => {
    let fetchSpy: jest.Mock;

    beforeEach(() => {
        fetchSpy = jest.fn();
        global.fetch = fetchSpy as unknown as typeof fetch;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const fillValidFields = (
        updateField: ReturnType<typeof useContactFormSubmission>["updateField"],
    ) => {
        updateField("name", "Jane Recruiter");
        updateField("email", "jane@example.com");
        updateField("message", "Are you open to a new role?");
    };

    it("blocks submission and reports field errors when required fields are empty", async () => {
        const { result } = renderHook(() => useContactFormSubmission());

        await act(async () => {
            await result.current.submit();
        });

        expect(result.current.fieldErrors).toEqual({ email: true, message: true, name: true });
        expect(result.current.status).toBe("idle");
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("clears a field's error as soon as it's edited", async () => {
        const { result } = renderHook(() => useContactFormSubmission());

        await act(async () => {
            await result.current.submit();
        });

        expect(result.current.fieldErrors.name).toBe(true);

        act(() => result.current.updateField("name", "Jane Recruiter"));

        expect(result.current.fieldErrors.name).toBe(false);
        expect(result.current.fieldErrors.email).toBe(true);
    });

    it("trims whitespace from name, email, and message before posting", async () => {
        fetchSpy.mockResolvedValue({ ok: true });
        const { result } = renderHook(() => useContactFormSubmission());

        act(() => {
            result.current.updateField("name", "  Jane Recruiter  ");
            result.current.updateField("email", " jane@example.com ");
            result.current.updateField("message", " Are you open to a new role? ");
        });

        await act(async () => {
            await result.current.submit();
        });

        expect(fetchSpy).toHaveBeenCalledWith(
            "https://formspree.io/f/xljrgjpe",
            expect.objectContaining({
                body: JSON.stringify({
                    email: "jane@example.com",
                    message: "Are you open to a new role?",
                    name: "Jane Recruiter",
                }),
            }),
        );
    });

    it("pretends success without making a request when the honeypot field is filled", async () => {
        const { result } = renderHook(() => useContactFormSubmission());

        act(() => fillValidFields(result.current.updateField));
        act(() => result.current.updateField("honeypot", "I am a bot"));

        await act(async () => {
            await result.current.submit();
        });

        expect(result.current.status).toBe("success");
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("POSTs to the Formspree endpoint and reports success on a valid submission", async () => {
        fetchSpy.mockResolvedValue({ ok: true });
        const { result } = renderHook(() => useContactFormSubmission());

        act(() => fillValidFields(result.current.updateField));

        await act(async () => {
            await result.current.submit();
        });

        expect(fetchSpy).toHaveBeenCalledWith(
            "https://formspree.io/f/xljrgjpe",
            expect.objectContaining({ method: "POST" }),
        );
        expect(result.current.status).toBe("success");
        expect(result.current.values).toEqual({ email: "", honeypot: "", message: "", name: "" });
    });

    it("reports an error status when Formspree responds with a non-ok status", async () => {
        fetchSpy.mockResolvedValue({ ok: false });
        const { result } = renderHook(() => useContactFormSubmission());

        act(() => fillValidFields(result.current.updateField));

        await act(async () => {
            await result.current.submit();
        });

        expect(result.current.status).toBe("error");
    });

    it("reports an error status when the request throws", async () => {
        fetchSpy.mockRejectedValue(new Error("network down"));
        const { result } = renderHook(() => useContactFormSubmission());

        act(() => fillValidFields(result.current.updateField));

        await act(async () => {
            await result.current.submit();
        });

        expect(result.current.status).toBe("error");
    });
});
