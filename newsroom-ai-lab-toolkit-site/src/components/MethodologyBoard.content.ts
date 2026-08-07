export type StepDetail = {
  title: string;
  summary: string;
  outcome: string;
  whatYoullDo: string;
  whyItMatters: string;
};

export const STEP_DETAILS: StepDetail[] = [
  // Step 1 — Talk to people
  {
    title: 'Informal User Research: Talk to people',
    summary:
      "Like backgrounding a story: you're building a sense of what's happening before you know the central question.",
    outcome:
      'A collection of real pain points, friction moments and unarticulated needs from the people closest to the work.',
    whatYoullDo:
      'Have informal conversations. Ask "what\'s annoying, slow or broken?" "What do you wish you could do if you had a magic wand?" Your job is to capture experiences and aspirations — not to evaluate or suggest solutions. You\'ll write everything down without filtering.',
    whyItMatters:
      'People will tell you what they need if you\'re not already pitching them a solution. Solutioning too early narrows what you\'re willing to hear. This step only works if you stay genuinely curious about the problem, not the fix.',
  },

  // Step 2 — Problem Statements
  {
    title: 'Problem Statements: Clearly define the problem',
    summary:
      "Like finding your nut graf: who is affected, what's at stake, why it matters.",
    outcome:
      'A small set of clear problem statements, each naming who is affected, what they can\'t do and why it matters.',
    whatYoullDo:
      'Review your notes and observations and frame each as a structured statement that captures the essence of the experience.',
    whyItMatters:
      'Fuzzy problems produce fuzzy solutions. A sharp problem statement keeps the work scoped and gives you something to test your solution against later.',
  },

  // Step 3 — Problem Briefs
  {
    title: 'Problem Briefs: Expand your understanding and define scope',
    summary:
      "Like writing a story pitch or memo: add context, who's affected, what success looks like, what still needs reporting.",
    outcome:
      'A brief per problem that includes context, who\'s affected, what success looks like and what\'s still unknown. ',
    whatYoullDo:
      'For each problem statement, expand it into a short brief: background, affected audience, what currently happens, what a good outcome looks like and open questions. Keep it to one page.',
    whyItMatters:
      'Writing it out forces you to confront gaps. A brief that\'s hard to write usually means the problem isn\'t well understood yet.',
  },

  // Step 4 — Choose which brief to tackle first
  {
    title: 'Choose which brief to tackle first',
    summary:
      "Pick one brief and commit. Splitting focus produces worse outcomes for everyone. The brief you don't choose now is a candidate for the next cycle.",
    outcome:
      'One brief selected as the focus for this cycle, with a short note on why.',
    whatYoullDo:
      'Compare your briefs. Consider: which affects the most people, which is most tractable right now, which carries the most risk if left alone. Pick one and document why.',
    whyItMatters:
      'Splitting focus consistently produces worse results for everyone. Choosing one brief is what makes the rest of the process work.',
  },

  // Step 5 — Break down the problem into smaller parts
  {
    title: 'Break down the problem into smaller parts',
    summary:
      'Like outlining a story: break the work into concrete, independently tackable pieces. Each part should be small enough to scope, build and verify quickly.',
    outcome:
      'A set of discrete parts — each with a clear scope and a definition of done.',
    whatYoullDo:
      'Ask: what are the distinct things that need to exist for this solution to work? Write each one as a concrete deliverable. Aim for parts that don\'t block each other.',
    whyItMatters:
      'Big, undivided problems stay in-progress indefinitely. Smaller parts let you build evidence that something works — or doesn\'t — before committing more time.',
  },

  // Step 6 — Pick a part to explore
  {
    title: 'Pick a part of the solution to explore',
    summary:
      "It doesn't have to be part 1. Start with whichever part offers the highest immediate value: either because it unblocks other work, or because it will teach you something important about the problem or what is needed in the solution.",
    outcome: 'One part selected as the focus for this iteration.',
    whatYoullDo:
      'Review your parts and ask: which is the biggest blocker, which carries the most unknowns, which would deliver value fastest? Pick one and make it the focus.',
    whyItMatters:
      'Tackling parts in the right order compounds your learning. Resolving the biggest uncertainty early protects the rest of the work.',
  },

  // Step 7 — Define requirements
  {
    title: 'Define requirements for this part of the solution',
    summary:
      'Before drafting, automating or prototyping anything, pause to define the work clearly enough that a human can judge whether the result is useful, accurate and safe to use.',
    outcome:
      'A written definition of what this part needs to do, who it needs to work for and what done looks like — including at least one concrete success criterion.',
    whatYoullDo:
      'Write down: what this part must do, who will use or rely on it, what accuracy or quality looks like and what edge cases matter.',
    whyItMatters:
      'Without requirements, you can\'t tell if your prototype worked. This step is the difference between "seems good" and actually knowing whether the solution meets the needs of the people it\'s meant to serve.',
  },

  // Step 8 — Prototype
  {
    title: 'Prototype this part of the solution',
    summary:
      'Build the smallest, most testable version of this part. Enough to learn whether your approach works — not a finished product.',
    outcome:
      'A working prototype that can be put in front of real users for evaluation.',
    whatYoullDo:
      'Use whatever tools fit — prompts, spreadsheets, scripts, mockups. Build only what\'s needed to test your requirements. Expect to throw things away.',
    whyItMatters:
      'A prototype surfaces the real problems with an approach faster and cheaper than a finished build. The goal is to learn more about the problem and possible solutions. Each iteration gets you closer to a solution that works for the people it\'s meant to serve.',
  },

  // Step 9 — Test with users
  {
    title: 'Test with the people the solution is for',
    summary:
      "Bring your solution to the stakeholders, users or colleagues it's meant to serve. Observe how they interact with it, listen to their feedback and note what surprised you — their reactions are your most reliable signal.",
    outcome:
      'Clear, direct feedback on whether this part is useful, accurate and safe enough to build on.',
    whatYoullDo:
      'Put the prototype in front of real users with as little explanation as possible. Watch what confuses them. Ask what they\'d change. Note the gap between what they say and what they do.',
    whyItMatters:
      'Internal testing misses the failures that happen in real use. This step is what separates something that seems to work from something that actually does.',
  },

  // Step 10 — Select next part and repeat
  {
    title: 'Select next part to tackle and repeat the cycle',
    summary:
      'Once a part of the larger solution is verified to meet user needs, move on to tackle the next. Keep going until all parts of the brief are solved.',
    outcome:
      'One part marked complete — or a revised plan for what needs to change. The next part selected if any remain.',
    whatYoullDo:
      'Review test results against your requirements from step 7. Decide: pass, revise or descope. If passing, mark it done and return to Step 6 for the next part.',
    whyItMatters:
      'Without an explicit done gate, solutions drift. This step enforces the standard that a part is only complete when real users have verified it works.',
  },
];
