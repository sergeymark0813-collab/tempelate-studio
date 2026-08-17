import TopBar from '../components/TopBar';
import SiteFooter from '../components/SiteFooter';
import { PRIVACY } from '../data/privacy';
import { useI18n } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

/* ===========================================================================
   The privacy policy, rendered from src/data/privacy.

   AdSense will not approve a site without one, and the disclosure has to be
   reachable from every page — hence the link in SiteFooter rather than a page
   only findable by typing the address.
   =========================================================================== */

export default function PrivacyPage() {
  const { locale } = useI18n();
  const policy = PRIVACY[locale];

  usePageMeta(`${policy.title} — Template Studio`, policy.intro);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />

      <article className="mx-auto w-full max-w-3xl flex-1 px-5 py-14 sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">{policy.title}</h1>
        <p className="mt-2 font-mono text-xs text-white/30">{policy.updated}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-white/60">{policy.intro}</p>

        {policy.sections.map((section) => (
          <section key={section.heading} className="mt-9">
            <h2 className="font-display text-[17px] font-semibold tracking-tight">
              {section.heading}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-[14.5px] leading-relaxed text-white/55">
                {paragraph}
              </p>
            ))}

            {section.items && (
              <ul className="mt-3 grid gap-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl bg-white/[0.03] px-4 py-2.5 ring-1 ring-white/6"
                  >
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                    <span className="text-[14px] leading-relaxed text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <SiteFooter />
    </div>
  );
}
