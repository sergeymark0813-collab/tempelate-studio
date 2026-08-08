import { useEffect, useState } from 'react';
import { Check, Copy, Github, Mail, X } from 'lucide-react';
import type { StyleConfig, TemplateDefinition } from '../types';
import { studio } from '../data/studio';
import { getFont } from '../lib/fonts';
import { BUTTON_SHAPES } from '../lib/styleVars';

/**
 * The conversion step: turns "I like this design" into a message to the studio,
 * pre-filled with the exact template and style choices the client made.
 */
export default function OrderDialog({
  template,
  config,
  onClose,
}: {
  template: TemplateDefinition;
  config: StyleConfig;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const shapeLabel = BUTTON_SHAPES.find((s) => s.id === config.buttonShape)?.label ?? '';
  const summary = [
    `Шаблон: ${template.name} (${template.category}, id: ${template.id})`,
    `Основной цвет: ${config.primary}`,
    `Дополнительный: ${config.secondary}`,
    `Кнопки: ${config.button}, форма — ${shapeLabel.toLowerCase()}`,
    `Фон: ${config.background}`,
    `Текст: ${config.text}`,
    `Шрифт: ${getFont(config.font).label}`,
    `Радиус карточек: ${config.cardRadius}px`,
  ].join('\n');

  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent(
    `Заказ сайта — шаблон «${template.name}»`,
  )}&body=${encodeURIComponent(`Здравствуйте! Хочу такой сайт.\n\n${summary}\n\n`)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Заказать разработку"
        onClick={(e) => e.stopPropagation()}
        className="fade-up w-full max-w-lg overflow-hidden rounded-2xl bg-shell-850 ring-1 ring-white/12"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <h2 className="font-display text-lg font-semibold">Заказать этот сайт</h2>
            <p className="mt-1 text-sm text-white/50">
              {studio.owner} · {studio.role}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="focus-ring -mr-1 grid h-9 w-9 place-items-center rounded-lg text-white/50 transition hover:bg-white/6 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-white/70">
            Скачайте превью в PNG или JPG и пришлите вместе с этими параметрами — так я соберу сайт
            один в один с тем, что вы видите. Срок — {studio.turnaround}, стоимость —{' '}
            {studio.priceFrom}.
          </p>

          <pre className="scroll-slim mt-4 max-h-44 overflow-auto rounded-xl bg-black/40 p-4 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap text-white/60 ring-1 ring-white/8">
            {summary}
          </pre>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={mailto}
              className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              <Mail size={16} /> Написать на почту
            </a>
            <button
              type="button"
              onClick={copy}
              className="focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/75 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Скопировано' : 'Скопировать параметры'}
            </button>
            <a
              href={studio.github}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/75 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
            >
              <Github size={16} /> GitHub
            </a>
          </div>

          <p className="mt-4 text-xs text-white/35">{studio.email}</p>
        </div>
      </div>
    </div>
  );
}
