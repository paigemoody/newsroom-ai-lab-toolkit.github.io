import React from 'react';
import IterationJourneyCarousel from './IterationJourneyCarousel';

const STEPS = [
  {
    emoji: '🖼️',
    label: 'Problem Statement',
    statement: {
      user: 'The client',
      verb: 'needs' as const,
      need: 'a commissioned portrait that captures their likeness and presence',
      goal: 'they have a piece that feels personal and complete for their home',
    },
  },
  {
    image: '/img/monalisa_1.png',
    label: 'Working prototype',
    body: 'A rough sketch capturing the basic pose and framing.',
    feedback: "Now that I'm seeing the pose sketched out, I realize the hands feel a little stiff — I'd actually prefer something softer and more natural, and it's hard to judge the overall feel without any color yet.",
  },
  {
    image: '/img/monalisa_2.png',
    label: 'Refine hand positioning',
    body: 'Based on that feedback, hand positioning was refined to feel more natural.',
    feedback: "Now that the hands read more naturally, I realize the piece still feels flat without any color — I think I'd prefer to see it blocked in with base tones so we can judge the overall mood.",
  },
  {
    image: '/img/monalisa_3.png',
    label: 'Add basic colors',
    body: 'Based on that feedback, basic colors were added to the figure.',
    feedback: "Now that I'm seeing the colors, I realize they feel a little too flat and simple — I'd prefer richer tones and some shading to give it depth.",
  },
  {
    image: '/img/monalisa_4.png',
    label: 'Alter colors & add detail',
    body: 'Based on that feedback, colors were refined and more detail was added.',
    feedback: "Now that the shading is coming together, I realize a few areas still feel unfinished — I'd prefer just a touch more polish before we call it done.",
  },
  {
    image: '/img/monalisa_5.png',
    label: 'Final, delivered',
    body: 'Final polish complete and delivered to stakeholders.',
  },
];

export default function MonaLisaJourneyCarousel() {
  return <IterationJourneyCarousel items={STEPS} />;
}
