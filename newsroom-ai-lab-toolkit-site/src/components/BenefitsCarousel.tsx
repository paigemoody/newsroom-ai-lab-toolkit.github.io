import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import CarouselShell from './CarouselShell';
import { mdInline } from './mdInline';

interface Example { user: string; need: string; goal: string }
interface Benefit { title: string; body: string; example?: Example }

function BenefitCard({ item }: { item: Benefit }) {
  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{item.title}</h3>
      <p
        style={{ margin: item.example ? '0 0 1rem' : 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--hh-text-primary)' }}
        dangerouslySetInnerHTML={{ __html: mdInline(item.body) }}
      />
      {item.example && (
        <div style={{ background: 'var(--hh-surface-secondary)', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '1rem', lineHeight: 1.7 }}>
          <span style={{ background: 'var(--hh-highlight-user-bg)', color: 'var(--hh-highlight-user-text)', padding: '1px 4px', borderRadius: 3 }}>{item.example.user}</span>
          {' need '}
          <span style={{ background: 'var(--hh-highlight-need-bg)', color: 'var(--hh-highlight-need-text)', padding: '1px 4px', borderRadius: 3 }}>{item.example.need}</span>
          {' so that '}
          <span style={{ background: 'var(--hh-highlight-goal-bg)', color: 'var(--hh-highlight-goal-text)', padding: '1px 4px', borderRadius: 3 }}>{item.example.goal}</span>.
        </div>
      )}
    </div>
  );
}

export default function BenefitsCarousel() {
  const { items } = usePluginData('load-markdown-data', 'problem-statement-benefits') as { items: Benefit[] };
  return (
    <CarouselShell items={items} renderCard={(item) => <BenefitCard item={item} />} />
  );
}
