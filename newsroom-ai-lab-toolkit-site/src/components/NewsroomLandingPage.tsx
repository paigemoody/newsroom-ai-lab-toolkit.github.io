import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

function md(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-family:var(--font-display)">$1</strong>');
}

function MD({ children, style }: { children: string; style?: React.CSSProperties }) {
  return <span dangerouslySetInnerHTML={{ __html: md(children) }} style={style} />;
}

function PartnerLogo({ partner, duplicate }: { partner: { name: string; logo: string; href?: string; invert?: boolean; containerWidth?: number; maxHeight?: string }; duplicate?: boolean }) {
  const src = useBaseUrl(partner.logo);
  const width = partner.containerWidth ?? 140;
  const maxHeight = partner.maxHeight ?? '2.25rem';
  const img = <img src={src} alt={duplicate ? '' : partner.name} style={{ maxWidth: '100%', maxHeight, width: 'auto', height: 'auto', objectFit: 'contain', opacity: 0.9, filter: partner.invert ? 'brightness(0) invert(1)' : undefined }} />;
  return (
    <div style={{ width: `${width}px`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 2rem' }}>
      {partner.href
        ? <a href={partner.href} target="_blank" rel="noopener noreferrer" className="partner-logo-link" tabIndex={duplicate ? -1 : 0} aria-hidden={duplicate || undefined}>{img}</a>
        : img}
    </div>
  );
}

export default function NewsroomLandingPage() {
  const { items } = usePluginData('load-markdown-data', 'landing-page') as { items: Record<string, any>[] };

  if (!items?.length) return null;

  const s = (key: string) => items.find(i => i.section === key) ?? {};

  const hero = s('hero');
  const credibility = s('credibility');
  const approach = s('approach');
  const why = s('whyItWorks');

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .partner-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-marquee { animation: none; }
        }

        .landing-container { font-family: var(--font-ui); }
        .landing-container * { box-sizing: border-box; }
        .section-dark a { color: color-mix(in oklch, var(--hh-accent) 80%, var(--hh-text-inverse)); }
        .section-dark a:hover, .section-dark a:focus-visible { color: var(--hh-text-inverse); }
        .section-dark a:focus-visible {
          outline: 2px solid var(--hh-focus-ring);
          outline-offset: 2px;
        }

        .partner-logo-link { display: flex; align-items: center; opacity: 1; transition: opacity 0.2s; }
        .partner-logo-link:hover, .partner-logo-link:focus-visible { opacity: 0.7; }
        .partner-logo-link:focus-visible {
          outline: 2px solid var(--hh-focus-ring);
          outline-offset: 2px;
        }

        /* Accent is a 10%-rule brand color, not a default button fill - ink by default,
           accent only on hover/focus (brand design system usage discipline). */
        .hh-cta-btn {
          background-color: var(--hh-text-strong);
          color: var(--hh-bg-page);
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .hh-cta-btn:hover, .hh-cta-btn:focus-visible {
          background-color: var(--hh-accent);
          color: var(--hh-text-on-accent);
        }
        .hh-cta-btn:focus-visible {
          outline: 2px solid var(--hh-focus-ring);
          outline-offset: 2px;
        }
      `}</style>

      <div className="landing-container" style={{ minHeight: '100vh', backgroundColor: 'var(--hh-bg-page)' }}>

        {/* Hero */}
        <section style={{ backgroundColor: 'var(--hh-inverse-surface)', color: 'var(--hh-text-inverse)', padding: '5rem 1.5rem 2.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>
              <MD>{hero.headline}</MD>
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.75', maxWidth: '48rem', fontFamily: 'var(--font-editorial)', color: 'color-mix(in oklch, var(--hh-text-inverse) 90%, transparent)' }}>
              <MD>{hero.subheading}</MD>
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section style={{ padding: '2.5rem 1.5rem 2rem', backgroundColor: 'var(--hh-surface-secondary)' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)' }}>
              <span style={{ color: 'var(--hh-accent)', fontWeight: '500' }}>/ </span>{approach.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--hh-text-primary)' }}>
              {approach.paragraphs?.map((p: string, i: number) => (
                <p key={i}><MD>{p}</MD></p>
              ))}
            </div>
            {approach.bold && (
              <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)', display: 'block', fontSize: '1.125rem', marginBottom: '0.75rem' }}><MD>{approach.bold}</MD></strong>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', paddingTop: '1.5rem' }}>
              {approach.cards?.map((card: any, i: number) => (
                <div key={card.title}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '300', lineHeight: 1, marginBottom: '1rem', color: 'var(--hh-text-strong)' }}>
                    {i + 1}/
                  </p>
                  <h3 style={{ fontWeight: '700', fontSize: '1.125rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)' }}>{card.title}</h3>
                  <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', lineHeight: '1.7', color: 'var(--hh-text-secondary)', margin: 0 }}><MD>{card.body}</MD></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credibility + Partners */}
        <section style={{ backgroundColor: 'var(--hh-surface-secondary)', color: 'var(--hh-text-strong)', padding: '1.5rem 1.5rem 0' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)' }}>
              <span style={{ color: 'var(--hh-accent)', fontWeight: '500' }}>/ </span>{credibility.heading}
            </h2>
            <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)', display: 'block', fontSize: '1.125rem', marginBottom: '0.75rem' }}><MD>{credibility.bold}</MD></strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--hh-text-primary)' }}>
              {credibility.paragraphs?.map((p: string, i: number) => (
                <p key={i} style={{ margin: 0 }}><MD>{p}</MD></p>
              ))}
            </div>
          </div>
          {credibility.partners?.length > 0 && (
            <div style={{ backgroundColor: 'var(--hh-partner-strip-bg)', paddingTop: '1.25rem', margin: '0 -1.5rem' }}>
              <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'color-mix(in oklch, var(--hh-text-inverse) 75%, transparent)', margin: 0 }}>
                  Partner newsrooms
                </p>
              </div>
              <div style={{ padding: '0.5rem 0 1rem', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent 1.5rem, black 3.5rem, black calc(100% - 3.5rem), transparent calc(100% - 1.5rem))', maskImage: 'linear-gradient(to right, transparent 1.5rem, black 3.5rem, black calc(100% - 3.5rem), transparent calc(100% - 1.5rem))' }}>
                <div className="partner-marquee">
                  {/* Duplicated for the seamless scroll loop - the second half is the same
                      links again, so it's hidden from the tab order and a11y tree
                      (tabIndex=-1 + aria-hidden) rather than making keyboard/screen-reader
                      users tab through the same 8 partners twice. */}
                  {[...credibility.partners, ...credibility.partners].map((partner: any, i: number) => (
                    <PartnerLogo key={i} partner={partner} duplicate={i >= credibility.partners.length} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Why It Works */}
        <section style={{ padding: '4rem 1.5rem', backgroundColor: 'color-mix(in oklch, var(--hh-accent) 8%, var(--hh-bg-page))' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'var(--font-display)', color: 'var(--hh-text-strong)' }}>
              <span style={{ color: 'var(--hh-accent)', fontWeight: '500' }}>/ </span>{why.heading}
            </h2>
            {why.intro && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--hh-text-primary)' }}>
                {why.intro.map((p: string, i: number) => (
                  <p key={i}><MD>{p}</MD></p>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {why.items?.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={24} style={{ color: 'var(--hh-accent)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <p style={{ fontSize: '1.125rem', fontFamily: 'var(--font-editorial)', color: 'var(--hh-text-primary)' }}>
                    <strong style={{ fontFamily: 'var(--font-display)' }}><MD>{item.title}</MD></strong>{' '}<MD>{item.description}</MD>
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem' }}>
              <Link
                to="/docs/how-this-works"
                className="hh-cta-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '1.25rem', padding: '1rem 2.25rem', borderRadius: '0.375rem', textDecoration: 'none' }}
              >
                / Get Started <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
