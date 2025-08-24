import { messages } from '../messages';

interface Props { value: string; onCopy: () => void; copyLabel: string; disabled?: boolean }
export function PasswordDisplay({ value, onCopy, copyLabel, disabled }: Props) {
  return (
    <div className="grid" style={{ gap: '.5rem' }}>
      <label htmlFor="password" className="small">{messages.heading}</label>
      <div className="row" style={{ alignItems: 'stretch' }}>
        <output id="password" className="output" aria-live="polite" aria-atomic="true">{value || '—'}</output>
        <button className="secondary" onClick={onCopy} aria-label={copyLabel} disabled={disabled}>
          {copyLabel}
        </button>
      </div>
    </div>
  );
}