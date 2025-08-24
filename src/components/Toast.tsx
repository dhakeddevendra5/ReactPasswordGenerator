import { useEffect, useRef } from 'react';

type ToastProps = { open: boolean; onClose: () => void; children: React.ReactNode };
export function Toast({ open, onClose, children }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  useEffect(() => { if (open) ref.current?.focus(); }, [open]);
  if (!open) return null;
  return (
    <div ref={ref} tabIndex={-1} role="status" aria-live="polite" className="toast">
      {children}
    </div>
  );
}