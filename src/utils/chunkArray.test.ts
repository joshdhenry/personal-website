import { chunkArray } from "./chunkArray";

describe("chunkArray", () => {
    it("splits evenly-divisible arrays into equal-size groups", () => {
        expect(chunkArray([1, 2, 3, 4, 5, 6], 3)).toEqual([
            [1, 2, 3],
            [4, 5, 6],
        ]);
    });

    it("leaves the last group shorter when the array does not divide evenly", () => {
        expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it("returns an empty array for an empty input", () => {
        expect(chunkArray([], 3)).toEqual([]);
    });
});
