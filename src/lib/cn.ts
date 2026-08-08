type ClassValue = string | number | false | null | undefined;

/** Minimal `classnames` — joins truthy values with a space. */
export const cn = (...values: ClassValue[]): string =>
  values.filter(Boolean).join(' ');
