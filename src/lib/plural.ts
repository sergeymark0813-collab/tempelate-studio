/**
 * Russian plural agreement: `plural(5, ['страница', 'страницы', 'страниц'])`.
 * Forms are [one, few, many] — 1 страница, 2 страницы, 5 страниц.
 */
export function plural(count: number, forms: [string, string, string]): string {
  const rest100 = Math.abs(count) % 100;
  const rest10 = rest100 % 10;

  if (rest100 > 10 && rest100 < 20) return forms[2];
  if (rest10 === 1) return forms[0];
  if (rest10 >= 2 && rest10 <= 4) return forms[1];
  return forms[2];
}
