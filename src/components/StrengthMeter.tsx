import { messages } from '../messages';

type Props = { bits: number; score: 0|1|2|3; label: string };
export function StrengthMeter({ bits, score, label }: Props) {
  const pct = ((score + 1) / 4) * 100;
  const clr = ["#ef4444", "#f59e0b", "#10b981", "#0ea5e9"][score];
  const aria = `${messages.strength}: ${label} (${Math.round(bits)} bits)`;
  return (
    <div className="grid" aria-live="polite" aria-atomic="true">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span><strong>{messages.strength}</strong>: {label}</span>
        <span className="small">{Math.round(bits)} bits</span>
      </div>
      <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={aria}>
        <div style={{ width: `${pct}%`, background: clr }} />
      </div>
    </div>
  );
}
