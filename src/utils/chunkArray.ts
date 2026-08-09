/**
 * Splits an array into consecutive groups of `size`, the last group
 * possibly shorter. Used by the Projects grids to lay cards out in fixed-
 * size flex rows (2 per row featured, 3 per row compact) without relying on
 * percentage-width/gap math.
 */
export const chunkArray = <ItemType>(items: readonly ItemType[], size: number): ItemType[][] => {
    const chunks: ItemType[][] = [];

    for (let startIndex = 0; startIndex < items.length; startIndex += size) {
        chunks.push(items.slice(startIndex, startIndex + size));
    }

    return chunks;
};
