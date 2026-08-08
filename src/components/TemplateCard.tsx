import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { useInView } from '../hooks/useInView';
import { useFitScale } from '../hooks/useFitScale';
import TemplateFrame from './TemplateFrame';

const THUMB_WIDTH = 1440;

/**
 * Live thumbnail: the real template, rendered at desktop width in its signature
 * palette and scaled into the card. No screenshots to keep in sync.
 */
function Thumb({ template }: { template: TemplateDefinition }) {
  const { ref, scale } = useFitScale(THUMB_WIDTH);
  return (
    <div ref={ref} className="h-full w-full overflow-hidden" aria-hidden>
      <div
        className="pointer-events-none select-none"
        style={{ width: THUMB_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <TemplateFrame
          template={template}
          config={template.defaults}
          width={THUMB_WIDTH}
          minHeight={1100}
        />
      </div>
    </div>
  );
}

export default function TemplateCard({
  template,
  index,
}: {
  template: TemplateDefinition;
  index: number;
}) {
  // Cards near the top of the catalog mount straight away; the rest wait until
  // they scroll into view so the first paint stays cheap.
  const { ref, seen } = useInView<HTMLDivElement>({ fallbackMs: index < 6 ? 0 : 1500 });

  return (
    <Link
      to={`/template/${template.id}`}
      className="focus-ring group fade-up relative flex flex-col overflow-hidden rounded-2xl bg-shell-850 ring-1 ring-white/8 transition duration-300 hover:-translate-y-1 hover:ring-white/20 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div ref={ref} className="relative aspect-16/11 overflow-hidden bg-shell-800">
        {seen ? (
          <Thumb template={template} />
        ) : (
          <div className="h-full w-full animate-pulse bg-white/[0.03]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-shell-850/90 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-shell-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Открыть шаблон
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-white/8 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/55 uppercase">
            {template.category}
          </span>
          <ArrowUpRight
            size={17}
            className="text-white/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70"
          />
        </div>
        <h3 className="font-display text-lg font-semibold tracking-tight">{template.name}</h3>
        <p className="text-[13.5px] leading-relaxed text-white/45">{template.description}</p>
      </div>
    </Link>
  );
}
