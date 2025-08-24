export const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWER = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";
export const SYMBOLS_BASE = "!@#$%^&*_-+=:?~"; // non-ambiguous base set
export const AMBIGUOUS_SYMBOLS = "{}[]()/\\'\"`,;:.<>";
export const SIMILAR = new Set(["i","l","1","O","0"]); // characters to exclude when excludeSimilar


export interface Options {
    upper: boolean;
    lower: boolean;
    digits: boolean;
    symbols: boolean;
    excludeSimilar: boolean;
    noAmbiguous: boolean;
}


export function buildPool(opts: Options): { pools: string[]; combined: string } {
    const pools: string[] = [];
    if (opts.upper) pools.push(UPPER);
    if (opts.lower) pools.push(LOWER);
    if (opts.digits) pools.push(DIGITS);
    if (opts.symbols) pools.push(opts.noAmbiguous ? SYMBOLS_BASE : SYMBOLS_BASE + AMBIGUOUS_SYMBOLS);


    // Combine
    let combined = pools.join("");


    // Exclusions after pool build
    if (opts.excludeSimilar) {
        combined = [...combined].filter(ch => !SIMILAR.has(ch)).join("");
        for (let i = 0; i < pools.length; i++) {
            pools[i] = [...pools[i]].filter(ch => !SIMILAR.has(ch)).join("");
        }
    }
    if (opts.noAmbiguous && opts.symbols) {
// already controlled above for symbols pool; ensure combined also respects
// (covered by pools join) — nothing else to do.
}


return { pools, combined };
}


export function assertCrypto(): Crypto {
if (typeof crypto === "undefined" || typeof crypto.getRandomValues !== "function") {
throw new Error("Secure crypto.getRandomValues is required.");
}
return crypto as Crypto;
}


export function csprngInt(maxExclusive: number): number {
// Returns integer in [0, maxExclusive)
    if (maxExclusive <= 0) return 0;
    const c = assertCrypto();
    // Rejection sampling to remove modulo bias
    const range = Math.ceil(Math.log2(maxExclusive));
    const byteLen = Math.max(1, Math.ceil(range / 8));
    const max = 2 ** (8 * byteLen);
    const threshold = max - (max % maxExclusive);
    const buf = new Uint8Array(byteLen);
    while (true) {
        c.getRandomValues(buf);
        let num = 0;
        for (let i = 0; i < byteLen; i++) num = (num << 8) | buf[i];
        if (num < threshold) return num % maxExclusive;
    }
}


export function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = csprngInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}