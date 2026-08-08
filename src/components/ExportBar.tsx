import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import type { ExportFormat } from '../lib/exportImage';
import { EXPORT_FORMATS } from '../lib/exportImage';
import { cn } from '../lib/cn';

export default function ExportBar({
  onExport,
  disabled,
}: {
  onExport: (format: ExportFormat) => Promise<void>;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState<ExportFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (format: ExportFormat) => {
    if (busy) return;
    setBusy(format);
    setError(null);
    try {
      await onExport(format);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить изображение');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {EXPORT_FORMATS.map(({ id, label }, index) => (
        <button
          key={id}
          type="button"
          onClick={() => run(id)}
          disabled={disabled || busy !== null}
          title={`Скачать ${label} (2×)`}
          className={cn(
            'focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition disabled:opacity-50',
            index === 0
              ? 'bg-white text-shell-950 hover:bg-white/90'
              : 'text-white/75 ring-1 ring-white/12 hover:bg-white/6 hover:text-white',
          )}
        >
          {busy === id ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          {label}
        </button>
      ))}

      {error && (
        <span className="absolute top-full right-0 mt-2 rounded-lg bg-red-500/15 px-3 py-1.5 text-xs whitespace-nowrap text-red-200 ring-1 ring-red-400/30">
          {error}
        </span>
      )}
    </div>
  );
}
