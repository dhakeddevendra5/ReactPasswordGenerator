export function estimateEntropyBits(length: number, poolSize: number): number {
  if (length <= 0 || poolSize <= 1) return 0;
  // Shannon‑style approximation: log2(pool^length) = length * log2(pool)
  return length * Math.log2(poolSize);
}

export type Strength = { bits: number; score: 0|1|2|3; label: string };

export function mapEntropyToStrength(bits: number): Strength {
  // Buckets inspired by zxcvbn‑like tiers (very rough heuristic)
  // < 28: very weak; < 50: weak; < 80: medium; otherwise strong
  let score: 0|1|2|3 = 0;
  if (bits < 28) score = 0;
  else if (bits < 50) score = 1;
  else if (bits < 80) score = 2;
  else score = 3;
  return { bits, score, label: ["Very Weak","Weak","Medium","Strong"][score] };
}