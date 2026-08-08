import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type { ComponentType } from 'react';
import type { DeviceId } from '../types';
import { DEVICES } from '../lib/devices';
import { cn } from '../lib/cn';

const ICONS: Record<DeviceId, ComponentType<{ size?: number }>> = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
};

export default function DeviceTabs({
  value,
  onChange,
}: {
  value: DeviceId;
  onChange: (id: DeviceId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Устройство"
      className="flex gap-1 rounded-xl bg-white/[0.04] p-1 ring-1 ring-white/8"
    >
      {DEVICES.map((device) => {
        const Icon = ICONS[device.id];
        const active = device.id === value;
        return (
          <button
            key={device.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(device.id)}
            title={`${device.label} — ${device.width}px`}
            className={cn(
              'focus-ring flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition',
              active
                ? 'bg-white text-shell-950'
                : 'text-white/55 hover:bg-white/6 hover:text-white/85',
            )}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{device.label}</span>
          </button>
        );
      })}
    </div>
  );
}
