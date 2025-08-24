import { useMemo, useState } from 'react';
import { buildPool, csprngInt, shuffle, type Options } from "../utils/charset";
import { copyToClipboard } from '../utils/clipboard';
import { estimateEntropyBits, mapEntropyToStrength } from '../utils/entropy';
import { useLocalStorage } from './useLocalStorage';

export type PasswordState = {
  length: number;
  options: Options;
  password: string;
};

const DEFAULT_OPTIONS: Options = {
  upper: true,
  lower: true,
  digits: true,
  symbols: false,
  excludeSimilar: true,
  noAmbiguous: true,
};

export function usePassword() {
  const [state, setState] = useLocalStorage<PasswordState>('pwgen:state', {
    length: 16,
    options: DEFAULT_OPTIONS,
    password: '',
  });

  const { combined, pools } = useMemo(() => buildPool(state.options), [state.options]);

  const canGenerate = combined.length > 0 && state.length >= pools.length;

  const strength = useMemo(() => {
    const bits = estimateEntropyBits(state.length, combined.length || 1);
    return mapEntropyToStrength(bits);
  }, [state.length, combined.length]);

  function setLength(n: number) {
    setState(s => ({ ...s, length: Math.max(8, Math.min(64, Math.trunc(n))) }));
  }

  function setOptions(update: Partial<Options>) {
    setState(s => ({ ...s, options: { ...s.options, ...update } }));
  }

  function generate(): string {
    if (!canGenerate) return state.password;

    // Pre‑place one char per selected pool to guarantee inclusion
    const chars: string[] = [];
    for (const pool of pools) {
      if (!pool) continue;
      const idx = csprngInt(pool.length);
      chars.push(pool[idx]);
    }
    // Fill remaining from combined
    while (chars.length < state.length) {
      const idx = csprngInt(combined.length);
      chars.push(combined[idx]);
    }
    // Shuffle
    shuffle(chars);

    const pwd = chars.join('');
    setState(s => ({ ...s, password: pwd }));
    return pwd;
  }

  async function copy(): Promise<boolean> {
    if (!state.password) return false;
    return copyToClipboard(state.password);
  }

  return {
    password: state.password,
    options: state.options,
    setOptions,
    length: state.length,
    setLength,
    generate,
    copy,
    strength,
    canGenerate,
    poolsCount: pools.length,
    poolSize: combined.length,
  } as const;
}