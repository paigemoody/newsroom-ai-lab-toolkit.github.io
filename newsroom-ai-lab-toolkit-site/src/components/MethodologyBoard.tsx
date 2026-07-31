import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { STEP_DETAILS } from './MethodologyBoard.content';

const CSS = `
  .mb-page { padding: 2.5rem 1.25rem; }
  @media (min-width: 768px) { .mb-page { padding-left: 3rem; padding-right: 3rem; } }
  .mb-nav-btn { transition: opacity 0.15s, background 0.15s, border-color 0.15s, color 0.15s; }
  /* Accent is a 10%-rule brand color, not a default button fill - ink by default,
     accent only on hover/focus (brand design system usage discipline). */
  .mb-next-btn { border-color: var(--hh-text-strong); background: var(--hh-text-strong); color: var(--hh-bg-page); }
  .mb-next-btn:hover, .mb-next-btn:focus-visible {
    border-color: var(--hh-accent);
    background: var(--hh-accent);
    color: var(--hh-text-on-accent);
  }
  .mb-next-btn:focus-visible {
    outline: 2px solid var(--hh-focus-ring);
    outline-offset: 2px;
  }
  .mb-dot { transition: width 0.2s ease, background 0.2s ease; }
  .mb-arc-travel-dot { animation: arc-travel 0.65s ease-in-out forwards; }
  @keyframes arc-travel {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -0.9; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mb-arc-travel-dot { animation: none; }
  }
`;

const Cp: React.CSSProperties = { fontFamily: "'Chakra Petch', sans-serif" };
const Fr: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const Gs: React.CSSProperties = { fontFamily: "'Geist', sans-serif" };
const c = {
  paper:        'var(--hh-bg-page)',
  ink:          'var(--hh-text-strong)',
  text:         'var(--hh-text-primary)',
  textSec:      'var(--hh-text-secondary)',
  border:       'var(--hh-border)',
  surface:      'var(--hh-surface-secondary)',
  accent:       'var(--hh-accent)',
  accentSubtle: 'var(--hh-accent-subtle)',
};


function Block({ n, total, title, note, children, footer }: { n: string; total?: number; title: string; note?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div style={{ borderRadius:'0.75rem', border:`1px solid ${c.border}`, background:c.paper, overflow:'hidden' }}>
      <div style={{ padding:'1.75rem 1.75rem 1.25rem', borderBottom:`1px solid ${c.border}`, background:c.surface }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:'1rem' }}>
          <span style={{ ...Cp, fontSize:36, fontWeight:300, color:c.accent, flexShrink:0, lineHeight:1, marginTop:'-0.125rem' }}>
            {n}{total && <span style={{ fontSize:16, opacity:0.45 }}>/{total}</span>}
          </span>
          <div style={{ flex:1 }}>
            <h2 style={{ ...Cp, fontSize:22, fontWeight:600, color:c.ink, margin:'0 0 0.5rem', lineHeight:1.2 }}>{title}</h2>
            {note && <p style={{ ...Fr, fontSize:16, color:c.textSec, lineHeight:1.6, margin:0 }}>{note}</p>}
          </div>
          {footer && <div style={{ flexShrink:0, alignSelf:'flex-start' }}>{footer}</div>}
        </div>
      </div>
      {children && <div style={{ padding:'1.75rem' }}>{children}</div>}
    </div>
  );
}

function StepStructuredContent({ idx }: { idx: number }) {
  const detail = STEP_DETAILS[idx];
  if (!detail) return null;
  const sections = [
    { label: "What you'll do", text: detail.whatYoullDo },
    { label: 'Outcome',        text: detail.outcome },
    { label: 'Why it matters', text: detail.whyItMatters },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      {sections.map(({ label, text }) => (
        <div key={label}>
          <p style={{ ...Cp, fontSize:11, fontWeight:600, color:c.textSec, textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 0.5rem' }}>{label}</p>
          <p style={{ ...Fr, fontSize:16, color:c.text, lineHeight:1.65, margin:0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

const PHASE_SPANS = [
  { label: 'Empathize' },
  { label: 'Define' },
  { label: 'Plan' },
  { label: 'Prototype' },
  { label: 'Test' },
];

const DOT_BIG = 16;
const DOT_SMALL = 8;

function CombinedProgress({ steps, currentIdx, onStep, isLooping, triggerLoop }: { steps: typeof STEPS; currentIdx: number; onStep: (i: number) => void; isLooping: boolean; triggerLoop: () => void }) {
  const total = steps.length;
  const currentPhase = steps[currentIdx].phase;
  const stepPct = (i: number) => (i / (total - 1)) * 100;

  const phaseFirstIdx = PHASE_SPANS.map((_, pi) => steps.findIndex(s => s.phase === pi));
  const phaseLastIdx  = PHASE_SPANS.map((_, pi) => steps.reduce((last, s, i) => s.phase === pi ? i : last, -1));

  // node positions: first step of each non-zero phase
  const segBoundaries = PHASE_SPANS.slice(1).map((_, i) => stepPct(phaseFirstIdx[i + 1]));

  // segment backgrounds use midpoints so every phase gets visible width
  const segRanges = PHASE_SPANS.map((_, pi) => ({
    left:  pi === 0 ? 0   : (stepPct(phaseLastIdx[pi - 1]) + stepPct(phaseFirstIdx[pi])) / 2,
    right: pi === PHASE_SPANS.length - 1 ? 100 : (stepPct(phaseLastIdx[pi]) + stepPct(phaseFirstIdx[pi + 1])) / 2,
  }));

  const loopStartPct = stepPct(phaseFirstIdx[2]); // start of Plan phase

  return (
    <div style={{ marginTop:'1.5rem' }}>

      {/* Bar + ticks */}
      <div style={{ position:'relative', margin:'6rem 0 0.5rem' }}>

        {/* Loop arc - SVG so a dot can travel the path */}
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          style={{ position:'absolute', left:`${loopStartPct}%`, width:`${100 - loopStartPct}%`, top:-64, height:60, pointerEvents:'none' }}
        >
          {/* Dashed base arc (left → right, curving upward) */}
          <path d="M 0 60 A 50 60 0 0 1 100 60" fill="none"
            stroke={`color-mix(in oklch, ${c.accent} 55%, transparent)`}
            strokeWidth="1.5" pathLength="1" strokeDasharray="0.04 0.06" />
          {/* Traveling dot (right → left, curving upward) when looping */}
          {isLooping && (
            <path d="M 100 60 A 50 60 0 0 0 0 60" fill="none"
              className="mb-arc-travel-dot"
              stroke={c.accent} strokeWidth="3"
              pathLength="1" strokeDasharray="0.1 0.9" strokeLinecap="round" />
          )}
        </svg>

        {/* Bar */}
        <div style={{ position:'relative', height:6, borderRadius:999, overflow:'hidden', background:c.border }}>
          {/* Fill */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${stepPct(currentIdx)}%`, background:c.accent, transition:'width 0.35s ease' }} />
          {/* Phase dividers */}
          {segBoundaries.map((b, i) => (
            <div key={i} style={{ position:'absolute', left:`${b}%`, top:0, bottom:0, width:2, background:c.paper, transform:'translateX(-50%)' }} />
          ))}
        </div>

        {/* Step dots - one per step */}
        {steps.map((_, i) => (
          <div key={i} style={{ position:'absolute', left:`${stepPct(i)}%`, top:'50%', transform:'translate(-50%, -50%)', width:DOT_SMALL, height:DOT_SMALL, borderRadius:'50%', background: i < currentIdx ? c.accent : c.paper, border:`1.5px solid ${i <= currentIdx ? c.accent : c.border}`, zIndex:1, pointerEvents:'none', transition:'all 0.2s ease' }} />
        ))}

        {/* Start node - start of Empathize */}
        <div style={{ position:'absolute', left:'0%', top:'50%', transform:'translate(-50%, -50%)', width:DOT_BIG, height:DOT_BIG, borderRadius:'50%', background:c.accent, border:`2px solid ${c.accent}`, zIndex:2 }} />

        {/* Phase-transition nodes - skip the last boundary (100%) which is the end node.
            Only the starts of Define and Iterate (Plan) are top-level labeled phases and get the big-dot treatment;
            the Prototype/Test boundaries inside "Iterate" stay small. */}
        {segBoundaries.filter(b => b < 100).map((b, i) => {
          const nextPhaseFirstIdx = phaseFirstIdx[i + 1];
          const passed = currentIdx >= nextPhaseFirstIdx;
          const isLabeledPhaseStart = i === 0 || i === 1;
          const size = isLabeledPhaseStart ? DOT_BIG : DOT_SMALL;
          return (
            <button key={i} onClick={() => !isLooping && onStep(nextPhaseFirstIdx)} title={`Start of ${PHASE_SPANS[i + 1].label}`}
              style={{ position:'absolute', left:`${b}%`, top:'50%', transform:'translate(-50%, -50%)', width:size, height:size, borderRadius:'50%', border:`${isLabeledPhaseStart ? 2 : 1.5}px solid ${passed ? c.accent : c.border}`, background: passed ? c.accent : c.paper, cursor:'pointer', padding:0, transition:'all 0.2s ease', zIndex:2 }}
            />
          );
        })}

        {/* End node - triggers loop back to Ideate start */}
        <button onClick={triggerLoop} title="Loop back to Ideate · Prototype · Test"
          style={{ position:'absolute', left:'100%', top:'50%', transform:'translate(-50%, -50%)', width:DOT_SMALL, height:DOT_SMALL, borderRadius:'50%', border:`1.5px solid ${currentIdx === total - 1 ? c.accent : c.border}`, background: currentIdx === total - 1 ? c.accent : c.paper, transition:'all 0.2s ease', zIndex:2, cursor:'pointer', padding:0 }}
        />
      </div>

      {/* Phase labels below the bar */}
      <div style={{ position:'relative', height:'1.5rem', marginTop:'0.5rem' }}>
        {PHASE_SPANS.slice(0, 2).map((phase, pi) => {
          const mid = (segRanges[pi].left + segRanges[pi].right) / 2;
          const active = currentPhase === pi;
          return (
            <div key={pi} style={{ position:'absolute', left:`${mid}%`, transform:'translateX(-50%)' }}>
              <span style={{ ...Cp, fontSize: active ? '0.9rem' : '0.75rem', fontWeight: active ? 700 : 400, color: active ? c.ink : c.textSec, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap', transition:'color 0.2s ease, font-size 0.2s ease' }}>
                {phase.label}
              </span>
            </div>
          );
        })}
        <div style={{ position:'absolute', left:`${(segRanges[2].left + 100) / 2}%`, transform:'translateX(-50%)' }}>
          <span style={{ ...Cp, fontSize: currentPhase >= 2 ? '0.9rem' : '0.75rem', fontWeight: currentPhase >= 2 ? 700 : 400, color: currentPhase >= 2 ? c.ink : c.textSec, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap', transition:'color 0.2s ease, font-size 0.2s ease' }}>
            Iterate
          </span>
        </div>
      </div>

    </div>
  );
}


const STEP_CONTENTS: Array<() => React.ReactNode> = [
  // 1 - Talk to people
  () => null,

  // 2 - Refine your understanding
  () => (
    <>
      <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1.25rem' }}>
        <p style={{ ...Cp, fontSize:20, fontWeight:500, margin:'0 0 1rem', lineHeight:1.5 }}>
          <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-user-bg)', color:'var(--hh-highlight-user-text)' }}>[User]</span>
          {' '}<span style={{ color:c.textSec, fontStyle:'italic', fontWeight:400 }}>needs</span>{' '}
          <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-need-bg)', color:'var(--hh-highlight-need-text)' }}>[need]</span>
          {' '}<span style={{ color:c.textSec, fontStyle:'italic', fontWeight:400 }}>so that</span>{' '}
          <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-goal-bg)', color:'var(--hh-highlight-goal-text)' }}>[goal]</span>.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
          {[
            { token:'User', bg:'var(--hh-highlight-user-bg)', text:'var(--hh-highlight-user-text)', label:'Who is affected?',    hint:'Reporter, editor, another specific role, a specific desk or team, the whole newsroom?' },
            { token:'Need', bg:'var(--hh-highlight-need-bg)', text:'var(--hh-highlight-need-text)', label:'What do they need?',  hint:'What do they need to accomplish, avoid, or understand?' },
            { token:'Goal', bg:'var(--hh-highlight-goal-bg)', text:'var(--hh-highlight-goal-text)', label:'Why does it matter?', hint:"What's the bigger outcome or value?" },
          ].map(({ token, bg, text, label, hint }) => (
            <p key={token} style={{ ...Fr, fontSize:14, color:c.text, lineHeight:1.5, margin:0 }}>
              <span style={{ ...Gs, fontSize:13, fontWeight:600, borderRadius:4, padding:'2px 6px', marginRight:6, background:bg, color:text }}>{token}</span>
              <span style={{ color:c.textSec, fontStyle:'italic', marginRight:4 }}>{label}</span>
              {hint}
            </p>
          ))}
        </div>
      </div>
      <div style={{ marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
        {[[75,55],[80,45],[72,50]].map((w, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.625rem', borderRadius:'0.5rem', padding:'0.625rem 0.875rem', background:c.surface, border:`1px solid ${c.border}` }}>
            <div style={{ width:14, height:14, borderRadius:'50%', flexShrink:0, border:`2px solid ${c.border}`, background:c.paper }} />
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ height:8, borderRadius:9999, background:c.border, width:`${w[0]}%` }} />
              <div style={{ height:7, borderRadius:9999, background:c.border, width:`${w[1]}%`, opacity:0.6 }} />
            </div>
          </div>
        ))}
        {[
          { user:'Weekend editors',   need:'an efficient way to locate usable photos for breaking stories',                                                             goal:"breaking stories aren't delayed by missing photo content" },
          { user:'Student reporters', need:'a way to more independently identify gaps in sourcing, missing perspectives, and opportunities for visuals',                goal:'they can strengthen their reporting quality before getting a human review' },
        ].map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.625rem', borderRadius:'0.5rem', padding:'0.75rem 0.875rem', background:c.surface, border:`1px solid ${c.accent}` }}>
            <div style={{ width:14, height:14, borderRadius:'50%', flexShrink:0, border:`2px solid ${c.accent}`, background:c.accent, marginTop:3 }} />
            <p style={{ ...Fr, fontSize:14, color:c.text, lineHeight:1.6, margin:0, flex:1 }}>
              <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-user-bg)', color:'var(--hh-highlight-user-text)' }}>{s.user}</span>
              {' '}need{' '}
              <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-need-bg)', color:'var(--hh-highlight-need-text)' }}>{s.need}</span>
              {' '}so that{' '}
              <span style={{ borderRadius:4, padding:'2px 6px', background:'var(--hh-highlight-goal-bg)', color:'var(--hh-highlight-goal-text)' }}>{s.goal}</span>.
            </p>
          </div>
        ))}
      </div>
    </>
  ),

  // 3 - Write the pitch
  () => (
    <div style={{ display:'flex', gap:'1rem' }}>
      {['Brief A','Brief B'].map((label, i) => (
        <div key={label} style={{ flex:1, background:c.paper, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem' }}>
          <p style={{ ...Gs, fontSize:14, fontWeight:600, color:c.text, margin:'0 0 0.75rem' }}>{label}</p>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {[70,55,65,45,60,40].map((w, j) => (
              <div key={j} style={{ height:7, borderRadius:9999, background:c.surface, width:`${w - i*5}%` }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),

  // 4 - Choose which story to pursue first
  () => (
    <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
      <div style={{ flex:1, background:c.accentSubtle, border:`2px solid ${c.accent}`, borderRadius:'0.75rem', padding:'1rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.75rem' }}>
          <p style={{ ...Gs, fontSize:14, fontWeight:600, color:c.ink, margin:0 }}>Brief A</p>
          <span style={{ ...Gs, fontSize:12, background:c.accent, color:c.paper, padding:'3px 10px', borderRadius:9999, fontWeight:500 }}>✓</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[70,55,65,45,60,40].map((w,j) => <div key={j} style={{ height:7, borderRadius:9999, background:c.border, width:`${w}%` }} />)}
        </div>
      </div>
      <div style={{ flex:1, background:c.paper, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem', opacity:0.5 }}>
        <p style={{ ...Gs, fontSize:14, fontWeight:600, color:c.textSec, margin:'0 0 0.75rem' }}>Brief B</p>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[65,50,60,40,55,35].map((w,j) => <div key={j} style={{ height:7, borderRadius:9999, background:c.surface, width:`${w}%` }} />)}
        </div>
      </div>
    </div>
  ),

  // 5 - Outline the story parts
  () => (
    <div>
      <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem', marginBottom:'1rem' }}>
        <p style={{ ...Gs, fontSize:11, color:c.textSec, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:500, margin:'0 0 0.5rem' }}>Brief A</p>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[75,55,65].map((w,j) => <div key={j} style={{ height:7, borderRadius:9999, background:c.border, width:`${w}%` }} />)}
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:2, height:20, background:c.border }} />
          <svg width="12" height="8" viewBox="0 0 10 7" fill={c.accent}><path d="M5 7L0 0h10z" /></svg>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.625rem' }}>
        {['Part 1','Part 2','Part 3'].map((p) => (
          <div key={p} style={{ borderRadius:'0.5rem', border:`1px solid ${c.border}`, background:c.paper, padding:'0.75rem' }}>
            <p style={{ ...Gs, fontSize:13, fontWeight:500, color:c.text, margin:'0 0 0.5rem' }}>{p}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ height:6, borderRadius:9999, background:c.surface, width:'80%' }} />
              <div style={{ height:6, borderRadius:9999, background:c.surface, width:'55%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  // 6 - Decide which angle to report on first
  () => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.625rem' }}>
      {['part 1','part 2','part 3','part 4','part 5'].map((p, i) => (
        <div key={p} style={{
          borderRadius:'0.5rem',
          border:`2px solid ${i === 1 ? c.accent : c.border}`,
          background: i === 1 ? c.accentSubtle : c.paper,
          padding:'0.75rem',
          gridColumn: i === 4 ? 2 : undefined,
        }}>
          <p style={{ ...Gs, fontSize:13, fontWeight:i === 1 ? 600 : 500, color: i === 1 ? c.ink : c.textSec, margin:0 }}>{p}</p>
        </div>
      ))}
    </div>
  ),

  // 7 - Define requirements
  () => (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
      {[
        { icon:'📥', label:'What inputs does this part need?',        hint:'Name the concrete inputs required - data, sources, context, approvals. Be specific: vague inputs produce vague outputs.' },
        { icon:'✅', label:'What does good enough output look like?', hint:'Define quality before building. Can a human reliably evaluate the result and catch errors? What does "good enough" look like?' },
        { icon:'⚙️', label:'What kind of solution fits?',              hint:'Could be AI, a rules-based tool, a process change, or keeping it fully human. Start with the problem, not the tool - and identify where humans must stay in the loop.' },
      ].map(({ icon, label, hint }, i, arr) => (
        <div key={label}>
          <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem' }}>
            <p style={{ ...Gs, fontSize:15, color:c.ink, fontWeight:500, margin:'0 0 0.375rem' }}>
              <span style={{ marginRight:'0.5rem' }}>{icon}</span>{label}
            </p>
            <p style={{ ...Fr, fontSize:14, color:c.textSec, lineHeight:1.6, margin:0 }}>{hint}</p>
          </div>
          {i < arr.length - 1 && (
            <div style={{ display:'flex', justifyContent:'center', margin:'0.25rem 0', color:c.border, fontSize:18 }}>↓</div>
          )}
        </div>
      ))}
    </div>
  ),

  // 8 - Experiment, build and verify
  () => (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div>
        <p style={{ ...Gs, fontSize:11, color:c.textSec, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, margin:'0 0 0.75rem' }}>Zoom in: one iteration cycle</p>
        <div style={{ display:'flex', alignItems:'stretch', gap:0 }}>
          {[
            { icon:'💡', label:'Hypothesize',     sub:'What approach works for this part?' },
            { icon:'🏗️', label:'Build',           sub:'Make something testable' },
            { icon:'🗣️', label:'Test & Feedback', sub:'Try it with real users' },
            { icon:'📖', label:'Learn & Adjust',  sub:'What did we discover?' },
          ].map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <div style={{ flex:1, background:c.surface, border:`1.5px solid ${c.border}`, borderRadius:'0.5rem', padding:'0.75rem 0.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.25rem' }}>
                <span style={{ fontSize:18 }}>{step.icon}</span>
                <p style={{ ...Gs, fontSize:12, fontWeight:600, color:c.ink, margin:0, lineHeight:1.3 }}>{step.label}</p>
                <p style={{ ...Fr, fontSize:12, color:c.textSec, margin:0, lineHeight:1.4 }}>{step.sub}</p>
              </div>
              {i < arr.length - 1
                ? <div style={{ display:'flex', alignItems:'center', padding:'0 0.25rem', color:c.border, fontSize:16, flexShrink:0 }}>→</div>
                : <div style={{ display:'flex', alignItems:'center', padding:'0 0.25rem', color:c.accent, fontSize:14, flexShrink:0, fontWeight:600 }}>↩</div>
              }
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <p style={{ ...Gs, fontSize:11, color:c.textSec, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, margin:'0 0 0.75rem' }}>Zoom out: iteration cycles add up to a solution</p>
        <div style={{ display:'flex', gap:'0.625rem', alignItems:'flex-end' }}>
          {[
            { sprint:'Cycle 1', pct:20, label:'rough draft',       status:'done'   },
            { sprint:'Cycle 2', pct:50, label:'tested + adjusted', status:'done'   },
            { sprint:'Cycle 3', pct:75, label:'getting closer',    status:'done'   },
            { sprint:'Cycle 4', pct:98, label:'good enough ✓',     status:'target' },
          ].map((s) => (
            <div key={s.sprint} style={{ flex:1, display:'flex', flexDirection:'column', gap:'0.375rem' }}>
              <div style={{ height:72, background:c.surface, borderRadius:'0.5rem', border:`1.5px solid ${c.border}`, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:`${s.pct}%`, background:c.accent, opacity: s.status === 'target' ? 0.12 : 0.15 }} />
                {s.status === 'target' && (
                  <div style={{ position:'absolute', top:'50%', left:0, right:0, transform:'translateY(-50%)', textAlign:'center' }}>
                    <p style={{ ...Gs, fontSize:11, fontWeight:700, color:c.textSec, margin:0 }}>goal</p>
                  </div>
                )}
                <div style={{ position:'absolute', bottom:'0.375rem', left:0, right:0, textAlign:'center' }}>
                  <span style={{ ...Gs, fontSize:11, fontWeight:600, color:c.textSec }}>{s.pct}%</span>
                </div>
              </div>
              <p style={{ ...Gs, fontSize:11, fontWeight:600, color:c.textSec, margin:0 }}>{s.sprint}</p>
              <p style={{ ...Fr, fontSize:11, color:c.textSec, margin:0, fontStyle:'italic', lineHeight:1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  // 9 - Test
  () => (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
      {[
        { icon:'🙋', label:'Who should you test with?',      hint:'Identify the stakeholders, users, or colleagues whose reaction matters most for this part. Aim for people who reflect real usage, not just internal allies.' },
        { icon:'👀', label:'What are you trying to learn?',  hint:'Define 1–3 specific questions before the session. Are you checking whether the output is accurate? Useful? Trusted? Understandable?' },
        { icon:'📝', label:'How will you capture what you learn?', hint:'Take notes on what people actually do and say - not just what you hoped they would. Surprises and confusions are the most valuable signal.' },
      ].map(({ icon, label, hint }, i, arr) => (
        <div key={label}>
          <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem' }}>
            <p style={{ ...Gs, fontSize:15, color:c.ink, fontWeight:500, margin:'0 0 0.375rem' }}>
              <span style={{ marginRight:'0.5rem' }}>{icon}</span>{label}
            </p>
            <p style={{ ...Fr, fontSize:14, color:c.textSec, lineHeight:1.6, margin:0 }}>{hint}</p>
          </div>
          {i < arr.length - 1 && (
            <div style={{ display:'flex', justifyContent:'center', margin:'0.25rem 0', color:c.border, fontSize:18 }}>↓</div>
          )}
        </div>
      ))}
    </div>
  ),

  // 10 - Select next part and repeat
  () => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.625rem' }}>
      {[
        { label:'part 1', solved:false, active:false },
        { label:'part 2', solved:true,  active:false },
        { label:'part 3', solved:false, active:true  },
        { label:'part 4', solved:false, active:false },
        { label:'part 5', solved:false, active:false },
      ].map((p, i) => (
        <div key={p.label} style={{
          borderRadius:'0.5rem',
          border:`2px solid ${p.solved || p.active ? c.accent : c.border}`,
          background: p.solved || p.active ? c.accentSubtle : c.paper,
          padding:'0.75rem',
          gridColumn: i === 4 ? 2 : undefined,
        }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <p style={{ ...Gs, fontSize:13, fontWeight: p.solved || p.active ? 600 : 500, color: p.solved ? c.accent : p.active ? c.ink : c.textSec, margin:0 }}>{p.label}</p>
            {p.solved && <span style={{ fontSize:14, color:c.accent }}>✓</span>}
          </div>
        </div>
      ))}
    </div>
  ),
];

const STEPS = [
  { n:'1',  phase:0 },
  { n:'2',  phase:1 },
  { n:'3',  phase:1 },
  { n:'4',  phase:1 },
  { n:'5',  phase:1 },
  { n:'6',  phase:2 },
  { n:'7',  phase:2 },
  { n:'8',  phase:3 },
  { n:'9',  phase:4 },
  { n:'10', phase:4 },
];

// activePart: 0-indexed part currently being worked on
// completed: 0-indexed parts finished in prior iterations
// includeActive: step 10 mode - also mark activePart as solved
function PartsGrid({ activePart, completed, includeActive }: { activePart: number; completed: number[]; includeActive?: boolean }) {
  const parts = ['Part 1', 'Part 2', 'Part 3'];
  const green = c.accent;
  const greenBg = 'color-mix(in oklch, var(--hh-accent) 12%, var(--hh-bg-page))';
  const greenBar = 'color-mix(in oklch, var(--hh-accent) 30%, white)';
  const completedSet = new Set(completed);
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.625rem' }}>
      {parts.map((label, i) => {
        const solved = completedSet.has(i) || (!!includeActive && i === activePart);
        const active = !solved && i === activePart;
        return (
          <div key={label} style={{
            borderRadius:'0.5rem',
            border:`${solved || active ? '2px' : '1px'} solid ${solved ? green : active ? c.accent : c.border}`,
            background: solved ? greenBg : active ? c.accentSubtle : c.paper,
            padding:'0.75rem',
            transition:'background 0.3s ease, border-color 0.3s ease',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
              <p style={{ ...Gs, fontSize:13, fontWeight: solved || active ? 600 : 500, color: solved ? green : active ? c.ink : c.text, margin:0 }}>{label}</p>
              {solved && <span style={{ fontSize:12, color:green }}>✓</span>}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ height:6, borderRadius:9999, background: solved ? greenBar : active ? c.border : c.surface, width:'80%' }} />
              <div style={{ height:6, borderRadius:9999, background: solved ? greenBar : active ? c.border : c.surface, width:'55%' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Step6Content({ activePart, completed }: { activePart: number; completed: number[] }) {
  return (
    <div>
      <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:'0.75rem', padding:'1rem', marginBottom:'1rem' }}>
        <p style={{ ...Gs, fontSize:11, color:c.textSec, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:500, margin:'0 0 0.5rem' }}>Brief A</p>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[75,55,65].map((w,j) => <div key={j} style={{ height:7, borderRadius:9999, background:c.border, width:`${w}%` }} />)}
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:2, height:20, background:c.border }} />
          <svg width="12" height="8" viewBox="0 0 10 7" fill={c.accent}><path d="M5 7L0 0h10z" /></svg>
        </div>
      </div>
      <PartsGrid activePart={activePart} completed={completed} />
    </div>
  );
}

export default function MethodologyBoard() {
  const [idx, setIdx] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const setupUrl = useBaseUrl('/docs/setup/a-setup');
  const PART_ORDER = [2, 0, 1]; // Part 3 first, then Part 1, then Part 2
  const [iterationStep, setIterationStep] = useState(0);
  const activePart = PART_ORDER[iterationStep];
  const completedParts = PART_ORDER.slice(0, iterationStep);
  const total = STEPS.length;
  const ideateStartIdx = STEPS.findIndex(s => s.phase === 2);

  const triggerLoop = () => {
    if (isLooping) return;
    setIsLooping(true);
    setTimeout(() => {
      setIterationStep(prev => (prev + 1) % 3);
      setIdx(ideateStartIdx);
      setIsLooping(false);
    }, 750);
  };

  const handlePrev = () => { if (!isLooping) setIdx(i => Math.max(0, i - 1)); };
  const handleNext = () => { if (isLooping) return; idx === total - 1 ? triggerLoop() : setIdx(i => i + 1); };

  const navFooter = (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
      <button type="button" onClick={handlePrev}
        style={{ ...Gs, padding:'0.375rem 0.875rem', borderRadius:'0.375rem', border:`2px solid ${c.border}`, background:c.paper, cursor: idx === 0 ? 'default' : 'pointer', fontWeight:600, fontSize:'0.85rem', color:c.ink, opacity: idx === 0 ? 0 : 1, transition:'opacity 0.15s' }}
      >←</button>
      <button type="button" className="mb-next-btn" onClick={handleNext}
        style={{ ...Gs, padding:'0.375rem 0.875rem', borderRadius:'0.375rem', borderWidth:'2px', borderStyle:'solid', cursor:'pointer', fontWeight:600, fontSize:'0.85rem' }}
      >→</button>
    </div>
  );

  const isLastStep10 = idx === 9 && iterationStep === PART_ORDER.length - 1;


  return (
    <>
      <style>{CSS}</style>
      <div className="mb-page" style={{ background:'transparent', fontFamily:"'Geist', sans-serif" }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto' }}>

          <p style={{ ...Fr, fontSize:19, color:c.textSec, lineHeight:1.65, margin:'0 0 1.5rem', maxWidth:'45rem' }}>
            Click through the steps below to explore the Playbook process.
          </p>
          <CombinedProgress steps={STEPS} currentIdx={idx} onStep={setIdx} isLooping={isLooping} triggerLoop={triggerLoop} />

          <div style={{ marginTop:'1.5rem' }}>
            {STEPS.map((s, i) => i !== idx ? null : (
              <Block key={i} n={s.n} total={total} title={i === 9 && isLastStep10 ? 'All parts verified - the full solution is built.' : STEP_DETAILS[i].title} note={i === 9 && isLastStep10 ? undefined : STEP_DETAILS[i].summary} footer={i === 9 && isLastStep10 ? undefined : navFooter}>
                {(() => {
                  const visual = i === 7 || i === 8 ? null
                    : i === 5 ? <Step6Content activePart={activePart} completed={completedParts} />
                    : i === 9 ? <PartsGrid activePart={activePart} completed={completedParts} includeActive />
                    : STEP_CONTENTS[i]();
                  return (
                    <>
                      {!isLastStep10 && <StepStructuredContent idx={i} />}
                      {visual && (
                        <div style={{ marginTop:'1.5rem', paddingTop:'1.5rem', borderTop:`1px solid ${c.border}` }}>
                          {visual}
                        </div>
                      )}
                    </>
                  );
                })()}
              </Block>
            ))}
          </div>

          <div style={{ marginTop:'1rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.625rem' }}>
            <p style={{ ...Fr, fontSize:18, color:c.textSec, margin:0 }}>Ready to try this with a real problem in your newsroom?</p>
            <a href={setupUrl}
              style={{ ...Gs, display:'inline-block', padding:'1rem 2.5rem', borderRadius:'0.5rem', background:c.accent, color:c.paper, fontWeight:600, fontSize:'1.1rem', textDecoration:'none', letterSpacing:'0.01em' }}
            >
              Let's get started →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
