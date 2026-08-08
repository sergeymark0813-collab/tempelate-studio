import type { CSSProperties, Ref } from 'react';
import type { StyleConfig, TemplateDefinition } from '../types';
import { styleVars } from '../lib/styleVars';

interface TemplateFrameProps {
  template: TemplateDefinition;
  config: StyleConfig;
  /** Rendered CSS width in px — always a real device width, never scaled. */
  width: number;
  minHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** Target for image export. */
  nodeRef?: Ref<HTMLDivElement>;
}

/**
 * The single place where a `StyleConfig` meets a template. Both the gallery
 * thumbnails and the editor preview go through here, so a design can never
 * look different in the two contexts.
 */
export default function TemplateFrame({
  template,
  config,
  width,
  minHeight,
  className,
  style,
  nodeRef,
}: TemplateFrameProps) {
  const { Component } = template;
  return (
    <div
      ref={nodeRef}
      className={className}
      style={{ width, minHeight, ...styleVars(config), ...style }}
    >
      <Component />
    </div>
  );
}
