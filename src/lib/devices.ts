import type { Device, DeviceId } from '../types';

/**
 * Templates are always rendered at these exact pixel widths and then scaled to
 * fit the stage, so what the client sees is a true-to-life layout — and the
 * exported PNG matches it pixel for pixel.
 */
export const DEVICES: Device[] = [
  { id: 'desktop', label: 'Компьютер', width: 1440, minHeight: 900 },
  { id: 'tablet', label: 'Планшет', width: 834, minHeight: 1112 },
  { id: 'mobile', label: 'Телефон', width: 390, minHeight: 844 },
];

export const getDevice = (id: DeviceId): Device =>
  DEVICES.find((d) => d.id === id) ?? DEVICES[0];
