import React from 'react';
import IterationJourneyCarousel from './IterationJourneyCarousel';

const STEPS = [
  {
    emoji: '🚶',
    label: 'Problem Statement',
    statement: {
      user: 'Reporters',
      need: 'a faster way to get from the newsroom to the courthouse than walking',
      goal: 'they can be on scene to cover breaking stories the moment something important happens',
    },
    feedback: "Walking works, but it takes too long — by the time we arrive, we've already missed the moment.",
  },
  {
    emoji: '🛹',
    label: 'Skateboard',
    body: 'A simple board with wheels that requires physical effort to move.',
    feedback: "Faster than walking, but it's tiring to keep pushing and hard to balance — we need to arrive ready to report, not out of breath.",
  },
  {
    emoji: '🛴',
    label: 'Scooter',
    body: 'A two-wheeled vehicle with a platform for standing and handlebars for steering.',
    feedback: "Easier to steer and balance, but we still get tired pushing — and it's too slow when a story breaks without warning.",
  },
  {
    emoji: '🚲',
    label: 'Bicycle',
    body: 'A two-wheeled vehicle that is powered by pedaling.',
    feedback: "Much faster and less tiring, but there's no power boost for the hill by the courthouse, and we're at the mercy of the weather to get there quickly.",
  },
  {
    emoji: '🏍️',
    label: 'Motorcycle',
    body: 'A two-wheeled or three-wheeled vehicle with an engine and motor for propulsion.',
    feedback: "Great speed and power, but we arrive exposed to the weather and can't carry camera gear or notebooks.",
  },
  {
    emoji: '🚙',
    label: 'Car',
    body: 'A four-wheeled vehicle with an engine and motor for propulsion.',
    feedback: "This covers weather protection and cargo space for gear — but we need to move fast enough to beat other outlets to the scene.",
  },
  {
    emoji: '🏎️',
    label: 'Race car',
    body: "Gets reporters from the newsroom to the courthouse fast, comfortably, and reliably enough to be there the moment something important happens: engines, suspension, and aerodynamics tuned for peak performance, built on everything learned through every round of feedback along the way.",
  },
];

export default function SkateboardJourneyCarousel() {
  return <IterationJourneyCarousel items={STEPS} />;
}
