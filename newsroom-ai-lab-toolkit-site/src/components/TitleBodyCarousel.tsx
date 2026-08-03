import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import CarouselShell from './CarouselShell';
import { mdInline } from './mdInline';

interface TitleBodyItem { title: string; body: string }

function TitleBodyCard({ item }: { item: TitleBodyItem }) {
  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem', fontFamily: 'var(--font-ui)' }}>{item.title}</h3>
      <div
        className="tip-body"
        style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--hh-text-primary)' }}
        dangerouslySetInnerHTML={{ __html: mdInline(item.body) }}
      />
    </div>
  );
}

export default function TitleBodyCarousel({ pluginId }: { pluginId: string }) {
  const { items } = usePluginData('load-markdown-data', pluginId) as { items: TitleBodyItem[] };
  return <CarouselShell items={items} renderCard={(item) => <TitleBodyCard item={item} />} />;
}
