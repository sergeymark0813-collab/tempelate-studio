import { useCallback, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send, Settings2 } from 'lucide-react';
import type { DeviceId } from '../types';
import { TEMPLATES, getTemplate } from '../templates/registry';
import { getDevice } from '../lib/devices';
import { useStyleConfig } from '../hooks/useStyleConfig';
import {
  EXPORT_FORMATS,
  captureNode,
  exportFilename,
  saveBlob,
  type ExportFormat,
} from '../lib/exportImage';
import TopBar from '../components/TopBar';
import StylePanel from '../components/StylePanel';
import PreviewStage from '../components/PreviewStage';
import DeviceTabs from '../components/DeviceTabs';
import ExportBar from '../components/ExportBar';
import OrderDialog from '../components/OrderDialog';

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const template = getTemplate(id);

  const [deviceId, setDeviceId] = useState<DeviceId>('desktop');
  const [scale, setScale] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const style = useStyleConfig(template?.id ?? 'unknown', template?.defaults ?? TEMPLATES[0].defaults);
  const device = getDevice(deviceId);

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      const node = captureRef.current;
      if (!node || !template) throw new Error('Предпросмотр ещё не готов');
      const blob = await captureNode(node, {
        format,
        scale: 2,
        background: style.config.background,
        font: style.config.font,
      });
      const ext = EXPORT_FORMATS.find((f) => f.id === format)?.ext ?? 'png';
      saveBlob(blob, exportFilename([template.id, device.id], ext));
    },
    [template, device.id, style.config.background, style.config.font],
  );

  if (!template) return <Navigate to="/" replace />;

  const index = TEMPLATES.findIndex((t) => t.id === template.id);
  const prev = TEMPLATES[(index - 1 + TEMPLATES.length) % TEMPLATES.length];
  const next = TEMPLATES[(index + 1) % TEMPLATES.length];

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <TopBar
        className="sticky top-0 lg:static"
        left={
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden h-6 w-px bg-white/10 sm:block" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{template.name}</div>
              <div className="truncate text-xs text-white/40">{template.category}</div>
            </div>
          </div>
        }
        right={
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                to={`/template/${prev.id}`}
                title={`Предыдущий: ${prev.name}`}
                className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-white/50 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
              >
                <ChevronLeft size={16} />
              </Link>
              <Link
                to={`/template/${next.id}`}
                title={`Следующий: ${next.name}`}
                className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-white/50 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
              >
                <ChevronRight size={16} />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOrdering(true)}
              className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-600"
            >
              <Send size={15} />
              <span className="hidden sm:inline">Заказать</span>
            </button>
          </div>
        }
      />

      <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        {/* controls — sidebar on desktop */}
        <aside className="hidden w-[344px] shrink-0 overflow-hidden border-r border-white/8 bg-shell-900 lg:block">
          <StylePanel {...style} />
        </aside>

        {/* preview */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Tight padding and gap below `sm`: at 320px the device tabs plus the
              export buttons are otherwise a few pixels wider than the screen. */}
          <div className="sticky top-16 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/8 bg-shell-900/90 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:static lg:bg-shell-900/60">
            <DeviceTabs value={deviceId} onChange={setDeviceId} />
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden font-mono text-xs text-white/35 md:inline">
                {device.width}px · {Math.round(scale * 100)}%
              </span>
              <ExportBar onExport={handleExport} />
            </div>
          </div>

          {/*
            Below `lg` the document scrolls: the stage grows with the preview.
            A `flex-1` scroll container here would collapse to a fraction of the
            screen and leave the rest of the viewport as empty backdrop.
          */}
          <div className="scroll-slim stage-grid bg-shell-950 p-4 pb-28 lg:min-h-0 lg:flex-1 lg:overflow-auto lg:p-8">
            <PreviewStage
              template={template}
              config={style.config}
              device={device}
              captureRef={captureRef}
              onScale={setScale}
            />
            <p className="mx-auto mt-5 max-w-md text-center text-xs leading-relaxed text-white/25">
              Меняется только оформление — структура и блоки шаблона остаются такими же, как в
              готовом сайте.
            </p>
          </div>
        </main>
      </div>

      {/* controls — bottom sheet on mobile */}
      <button
        type="button"
        onClick={() => setPanelOpen(true)}
        className="focus-ring fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-shell-950 shadow-2xl lg:hidden"
      >
        <Settings2 size={16} /> Оформление
      </button>

      {panelOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setPanelOpen(false)}
            role="presentation"
          />
          {/*
            A definite height (not `max-h`) is required: StylePanel fills its
            parent with `h-full`, and a percentage height against an auto-height
            box resolves to auto — the panel would overflow and be clipped
            instead of scrolling, putting the font picker out of reach.
          */}
          {/*
            `relative z-10` keeps the sheet above the click-away scrim, which is
            absolutely positioned and would otherwise paint over this static box
            and swallow every tap on the controls.
          */}
          <div className="relative z-10 flex h-[82dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-shell-900 ring-1 ring-white/12">
            <StylePanel {...style} onClose={() => setPanelOpen(false)} />
          </div>
        </div>
      )}

      {ordering && (
        <OrderDialog template={template} config={style.config} onClose={() => setOrdering(false)} />
      )}
    </div>
  );
}
