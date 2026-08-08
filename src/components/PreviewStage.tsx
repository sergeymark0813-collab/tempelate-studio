import { useEffect } from 'react';
import type { Device, StyleConfig, TemplateDefinition } from '../types';
import { useElementSize } from '../hooks/useElementSize';
import { useFitScale } from '../hooks/useFitScale';
import TemplateFrame from './TemplateFrame';

interface PreviewStageProps {
  template: TemplateDefinition;
  config: StyleConfig;
  device: Device;
  /** Ref to the natural-size node, handed to the exporter. */
  captureRef: React.RefObject<HTMLDivElement | null>;
  onScale?: (scale: number) => void;
}

/**
 * Renders the template at the device's true width and scales it down with a
 * transform so it fits the available space. The captured node stays unscaled,
 * so exports are always full resolution.
 */
export default function PreviewStage({
  template,
  config,
  device,
  captureRef,
  onScale,
}: PreviewStageProps) {
  const { ref: areaRef, scale } = useFitScale(device.width, { gutter: 2 });
  const natural = useElementSize(captureRef);

  useEffect(() => {
    onScale?.(scale);
  }, [scale, onScale]);

  // Until the first measurement lands, fall back to the device's minimum so the
  // frame is never taller than the content it holds.
  const contentHeight = natural.height || device.minHeight;

  return (
    <div ref={areaRef} className="flex w-full justify-center">
      <div
        className="overflow-hidden rounded-[14px] ring-1 ring-white/12"
        style={{
          // Rounded to whole pixels: a fractional box leaves a hairline of the
          // stage backdrop inside the rounded corners.
          width: Math.round(device.width * scale),
          height: Math.round(contentHeight * scale),
          // Any residual rounding gap shows the page colour, never the near-black stage.
          background: config.background,
          boxShadow: '0 40px 90px -50px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <div
          style={{
            width: device.width,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <TemplateFrame
            template={template}
            config={config}
            width={device.width}
            minHeight={device.minHeight}
            nodeRef={captureRef}
          />
        </div>
      </div>
    </div>
  );
}
