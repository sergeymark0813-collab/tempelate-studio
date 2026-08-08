import type { ComponentType } from 'react';
import type { BlockInstance, DesignSystem, Frame } from '../../lib/studio/types';
import { useFitScale } from '../../hooks/useFitScale';
import { Avatar, DsProvider, Field, Glyph, Type, useDs } from './atoms';
import * as Web from './blocksWeb';
import * as App from './blocksApp';
import * as Graphic from './blocksGraphic';

/* ===========================================================================
   Turns a generated frame into pixels.

   The artboard always renders at its true width and is scaled down to fit, so
   proportions stay honest — a 1440px layout is laid out at 1440px whatever the
   window is doing.
   =========================================================================== */

const REGISTRY: Record<string, ComponentType<{ block: BlockInstance }>> = {
  nav: Web.Nav,
  hero: Web.Hero,
  logos: Web.Logos,
  pageHeader: Web.PageHeader,
  categories: Web.Categories,
  features: Web.Features,
  bento: Web.Bento,
  showcase: Web.Showcase,
  catalog: Web.Catalog,
  productDetail: Web.ProductDetail,
  gallery: Web.Gallery,
  stats: Web.Stats,
  steps: Web.Steps,
  pricing: Web.Pricing,
  team: Web.Team,
  testimonials: Web.Testimonials,
  faq: Web.Faq,
  contactForm: Web.ContactForm,
  cta: Web.Cta,
  footer: Web.Footer,
  authForm: Web.AuthForm,

  kpis: App.Kpis,
  chart: App.Chart,
  table: App.Table,
  activity: App.Activity,
  board: App.Board,
  mobileHeader: App.MobileHeader,
  mobileHero: App.MobileHero,
  mobileChips: App.MobileChips,
  mobileCards: App.MobileCards,
  mobileList: App.MobileList,
  mobileStats: App.MobileStats,
  tabbar: App.Tabbar,
  uiKit: App.UiKit,

  poster: Graphic.Poster,
  posterTall: Graphic.PosterTall,
  posterStory: Graphic.PosterStory,
  slideTitle: Graphic.SlideTitle,
  slideContent: Graphic.SlideContent,
  slideStats: Graphic.SlideStats,
  cardFront: Graphic.CardFront,
  cardBack: Graphic.CardBack,
  emailHeader: Graphic.EmailHeader,
  emailHero: Graphic.EmailHero,
  emailCards: Graphic.EmailCards,
  emailCta: Graphic.EmailCta,
  emailFooter: Graphic.EmailFooter,
  logoMark: Graphic.LogoMark,
  logoVariants: Graphic.LogoVariants,
  logoUsage: Graphic.LogoUsage,
  productCard: Graphic.ProductCard,
};

function Block({ block }: { block: BlockInstance }) {
  const Component = REGISTRY[block.type];
  if (!Component) return null;
  return <Component block={block} />;
}

/* ------------------------------ app chrome ------------------------------- */

/** Sidebar + topbar for dashboard-style products, drawn from the same tokens. */
function AppChrome({ frame }: { frame: Frame }) {
  const ds = useDs();
  const nav = ['Обзор', 'Сделки', 'Клиенты', 'Отчёты', 'Задачи', 'Настройки'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '236px 1fr', height: '100%', background: ds.color.bg }}>
      <aside style={{ background: ds.color.surface, borderRight: `1px solid ${ds.color.border}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span style={{ width: 28, height: 28, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
          <Type step="h3" style={{ fontSize: 16 }}>
            Панель
          </Type>
        </div>

        {nav.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: ds.radius.sm,
              background: i === 0 ? ds.color.surface2 : 'transparent',
            }}
          >
            <Glyph seed={i * 7 + 3} size={17} color={i === 0 ? ds.color.primary : ds.color.textFaint} />
            <Type step="small" tone={i === 0 ? 'default' : 'muted'}>
              {item}
            </Type>
          </div>
        ))}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: `1px solid ${ds.color.border}` }}>
          <Avatar seed={11} name="Анна Реут" size={32} />
          <div style={{ minWidth: 0 }}>
            <Type step="small">Анна Реут</Type>
            <Type step="small" tone="faint" style={{ fontSize: 11 }}>
              Администратор
            </Type>
          </div>
        </div>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: 64, borderBottom: `1px solid ${ds.color.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 24, gap: 20 }}>
          <Type step="h3" style={{ fontSize: 18 }}>
            {frame.name}
          </Type>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Field label="Поиск" style={{ paddingBlock: 8, minWidth: 220 }} />
            <Glyph seed={5} size={20} color={ds.color.textFaint} />
            <Avatar seed={11} name="Анна Реут" size={32} />
          </div>
        </header>

        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', gap: ds.grid.gutter }}>
          {frame.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- artboard -------------------------------- */

function Artboard({ frame }: { frame: Frame }) {
  const ds = useDs();
  const { canvas } = frame;

  if (canvas.chrome === 'desktop') return <AppChrome frame={frame} />;

  if (canvas.kind === 'mobile') {
    return (
      <div style={{ height: '100%', background: ds.color.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px 6px' }}>
          <Type step="small" style={{ fontSize: 12, fontWeight: 600 }}>
            9:41
          </Type>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {[10, 13, 16].map((h) => (
              <span key={h} style={{ width: 3, height: h * 0.6, borderRadius: 1, background: ds.color.text, opacity: 0.7 }} />
            ))}
            <span style={{ width: 22, height: 11, borderRadius: 3, border: `1px solid ${ds.color.borderStrong}`, marginLeft: 4 }} />
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {frame.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: ds.color.bg, height: canvas.height ? '100%' : undefined, display: 'flex', flexDirection: 'column' }}>
      {frame.blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
}

/* --------------------------------- shell --------------------------------- */

export default function FrameView({ frame, ds }: { frame: Frame; ds: DesignSystem }) {
  const { canvas } = frame;
  const { ref, scale } = useFitScale(canvas.width, { gutter: 2 });

  const phone = canvas.chrome === 'phone';
  const browser = canvas.chrome === 'browser';

  const outerRadius = phone ? 44 : browser ? 12 : canvas.chrome === 'paper' ? 10 : 6;

  return (
    <div ref={ref} className="flex w-full justify-center">
      <div
        style={{
          width: Math.round(canvas.width * scale),
          transformOrigin: 'top left',
        }}
      >
        <div
          style={{
            width: canvas.width,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div
            style={{
              borderRadius: outerRadius,
              overflow: 'hidden',
              border: phone ? '10px solid #101014' : '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 50px 100px -60px rgba(0,0,0,0.95)',
              background: ds.color.bg,
            }}
          >
            {browser && (
              <div style={{ height: 38, background: '#16181d', display: 'flex', alignItems: 'center', gap: 8, paddingInline: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
                  <span key={color} style={{ width: 11, height: 11, borderRadius: 999, background: color }} />
                ))}
                <span style={{ flex: 1, height: 20, marginLeft: 10, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }} />
              </div>
            )}

            <div style={{ height: canvas.height ? canvas.height : undefined }}>
              <DsProvider ds={ds}>
                <Artboard frame={frame} />
              </DsProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
