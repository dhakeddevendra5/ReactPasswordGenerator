import { messages } from '../messages';

interface Props {
  length: number;
  setLength: (n: number) => void;
  options: {
    upper: boolean; lower: boolean; digits: boolean; symbols: boolean; excludeSimilar: boolean; noAmbiguous: boolean;
  };
  setOptions: (u: Partial<Props['options']>) => void;
  onGenerate: () => void;
  canGenerate: boolean;
  setsCount: number;
}

export function Controls({ length, setLength, options, setOptions, onGenerate, canGenerate, setsCount }: Props) {
  const tooShort = length < setsCount;
  return (
    <fieldset className="grid card" aria-describedby="hint">
      <legend style={{ fontWeight: 700, padding: '0 .5rem' }}>{messages.heading}</legend>

      <div className="grid">
        <label htmlFor="len">{messages.length}: {length}</label>
        <input
          id="len"
          type="range"
          min={8} max={64} step={1}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          aria-valuemin={8} aria-valuemax={64} aria-valuenow={length}
        />
        <input
          type="number" inputMode="numeric" min={8} max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          aria-label={messages.length}
          style={{ width: '6rem', padding: '.45rem .6rem', borderRadius: 10, border: '1px solid #e2e8f0' }}
        />
        <p id="hint" className="helper">
          {!canGenerate ? messages.setsHint : tooShort ? messages.lengthHint : '\u00A0'}
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
        <label className="switch"><input type="checkbox" checked={options.upper} onChange={e => setOptions({ upper: e.target.checked })} />{messages.uppercase}</label>
        <label className="switch"><input type="checkbox" checked={options.lower} onChange={e => setOptions({ lower: e.target.checked })} />{messages.lowercase}</label>
        <label className="switch"><input type="checkbox" checked={options.digits} onChange={e => setOptions({ digits: e.target.checked })} />{messages.numbers}</label>
        <label className="switch"><input type="checkbox" checked={options.symbols} onChange={e => setOptions({ symbols: e.target.checked })} />{messages.symbols}</label>
        <label className="switch"><input type="checkbox" checked={options.excludeSimilar} onChange={e => setOptions({ excludeSimilar: e.target.checked })} />{messages.excludeSimilar}</label>
        <label className="switch"><input type="checkbox" checked={options.noAmbiguous} onChange={e => setOptions({ noAmbiguous: e.target.checked })} />{messages.noAmbiguous}</label>
      </div>

      <div className="row" style={{ justifyContent: 'flex-end', marginTop: '.5rem' }}>
        <button className="secondary" onClick={onGenerate} disabled={!canGenerate || tooShort}>
          {messages.generate}
        </button>
      </div>
    </fieldset>
  );
}