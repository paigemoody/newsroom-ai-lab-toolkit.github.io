import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import CarouselShell from './CarouselShell';
import ProblemStatement, { Statement } from './ProblemStatement';

interface ProblemStatementExample {
  original: Statement;
  discussion?: string;
  notes?: string[];
  questions?: string[];
  improvements: Statement[];
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--hh-text-secondary)',
  marginBottom: '0.4rem',
};

function ExampleCard({ ex }: { ex: ProblemStatementExample }) {
  return (
    <>
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={labelStyle}>Original</div>
        <ProblemStatement {...ex.original} />
      </div>

      {(ex.discussion || ex.notes) && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={labelStyle}>What could be stronger</div>
          {ex.discussion && <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--hh-text-primary)' }}>{ex.discussion}</p>}
          {ex.notes && (
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--hh-text-primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {ex.notes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          )}
        </div>
      )}

      {ex.questions && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={labelStyle}>Questions to ask</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--hh-text-primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {ex.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}

      <div>
        <div style={labelStyle}>{ex.improvements.length === 1 ? 'Improved' : 'Improvement options'}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ex.improvements.map((imp, i) => (
            <div key={i} style={{ background: 'var(--hh-surface-secondary)', borderRadius: '0.5rem', padding: '0.75rem' }}>
              <ProblemStatement {...imp} />
              {imp.note && <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: 'var(--hh-text-secondary)', fontStyle: 'italic' }}>{imp.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ProblemStatementCarousel() {
  const { items } = usePluginData('load-markdown-data', 'problem-statement-examples') as { items: ProblemStatementExample[] };
  return (
    <CarouselShell items={items} renderCard={(ex) => <ExampleCard ex={ex} />} />
  );
}
