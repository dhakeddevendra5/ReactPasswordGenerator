import { useState } from 'react';
import { Controls } from './components/Controls';
import { PasswordDisplay } from './components/PasswordDisplay';
import { StrengthMeter } from './components/StrengthMeter';
import { Toast } from './components/Toast';
import { usePassword } from './hooks/usePassword';
import { messages } from './messages';
import './styles.css';

export default function App() {
  const { password, options, setOptions, length, setLength, generate, copy, strength, canGenerate, poolsCount, poolSize } = usePassword();
  const [toast, setToast] = useState<{ open: boolean; text: string }>({ open: false, text: '' });

  function showToast(text: string) { setToast({ open: true, text }); setTimeout(() => setToast({ open: false, text: '' }), 1600); }

  return (
    <main className="container">
      <h1 style={{ marginBottom: '.5rem' }}>{messages.appName}</h1>
      <p className="small" aria-live="polite">Pool size: {poolSize} • Selected sets: {poolsCount}</p>

      <section className="card" aria-label="Generator">
        <div className="grid" style={{ gap: '1rem' }}>
          <PasswordDisplay
            value={password}
            onCopy={async () => { const ok = await copy(); showToast(ok ? messages.copied : messages.copyFailed); }}
            copyLabel={messages.copy}
            disabled={!password}
          />

          <StrengthMeter bits={strength.bits} score={strength.score} label={strength.label} />

          <Controls
            length={length}
            setLength={setLength}
            options={options}
            setOptions={setOptions}
            onGenerate={generate}
            canGenerate={canGenerate}
            setsCount={poolsCount}
          />
        </div>
      </section>

      <Toast open={toast.open} onClose={() => setToast({ open: false, text: '' })}>{toast.text}</Toast>
    </main>
  );
}