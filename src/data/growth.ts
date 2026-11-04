// THE GROWTH EXPERIMENT: A proposed campaign for Wispr Flow in Indian Engineering Colleges
// DISCLAIMER: Fictional marketing experiment and strategy proposal created by Mugesh R.
// Not an official campaign, partnership, endorsement, or verified metric from Wispr Flow.

export interface Persona {
  id: string
  title: string
  context: string
  painPoint: string
  voiceBenefit: string
  dailyWords: string
}

export const AUDIENCE_PERSONAS: Persona[] = [
  {
    id: 'coder',
    title: 'The Hackathon & Code Builder',
    context: 'Writing code comments, READMEs, PR reviews, and Discord design threads during late-night build sessions.',
    painPoint: 'Hands must leave the flow state to type long explanations. Context switching between thinking and typing code slows momentum.',
    voiceBenefit: 'Speaks complex documentation and architecture comments in real-time without breaking mental focus.',
    dailyWords: '~1,200 words of documentation & chat',
  },
  {
    id: 'student',
    title: 'The Lab & Assignment Writer',
    context: 'Submitting weekly lab records, comprehensive project reports, IEEE-format papers, and seminar scripts.',
    painPoint: 'Spending hours mechanically typing repetitive procedures and observation summaries after lab work is done.',
    voiceBenefit: 'Dictates raw observations directly from bench notes into formatted drafts in one-third the time.',
    dailyWords: '~2,500 words of reports & notes',
  },
  {
    id: 'hardware',
    title: 'The ECE & Hardware Experimenter',
    context: 'Working at a physical workbench with oscilloscopes, soldering irons, microcontrollers, and multimeter probes.',
    painPoint: 'Both hands are physically holding probes or wiring breadboards; taking notes requires stopping the experiment.',
    voiceBenefit: 'Hands-free voice note-taking while probing live circuit pins and logging component behaviour.',
    dailyWords: '~800 words of bench logs',
  },
]

export const PROBLEM_COMPARISON = {
  headline: 'Transcription Latency: The Brain vs. The Keyboard',
  sub: 'Engineering students think at the speed of speech, but communicate at the speed of mechanical typing.',
  thinkingSpeed: {
    wpm: '150 – 200',
    label: 'Thinking & Speaking Speed',
    detail: 'Natural spoken flow when explaining technical logic aloud.',
  },
  typingSpeed: {
    wpm: '40 – 55',
    label: 'Average Typing Speed',
    detail: 'Manual mechanical keyboard speed on laptop during technical writing.',
  },
  frictionPoints: [
    {
      title: 'Context Fragmentation',
      detail: 'When formulating an algorithm or debugging an issue, stopping to type forces a cognitive gear shift.',
    },
    {
      title: 'Fatigue & Omission',
      detail: 'Students write shorter, less thorough comments and project notes simply because typing takes too long.',
    },
    {
      title: 'Workbench Impossibility',
      detail: 'In electronics and physical labs, typing while testing hardware is physically impractical.',
    },
  ],
}

export interface CampaignConcept {
  id: string
  badge: string
  title: string
  format: string
  hook: string
  storyboard: string[]
  cta: string
}

export const CAMPAIGN_CONCEPTS: CampaignConcept[] = [
  {
    id: 'video',
    badge: 'Concept 01',
    title: '20-Second Short: "The 2:00 AM README"',
    format: 'Reels / YouTube Shorts / Instagram (9:16 vertical)',
    hook: 'Split screen: 2:00 AM hackathon exhaustion vs. effortless speech.',
    storyboard: [
      '00:00 – 00:04 | Left screen: Exhausted student angrily mashing backspace trying to write a project README before submission.',
      '00:05 – 00:12 | Right screen: Student leans back with headphones, speaking naturally: "This API takes sensor inputs, filters noise, and returns an alert payload."',
      '00:13 – 00:17 | Screen shows speech converting in real-time into crisp, structured markdown without awkward typos.',
      '00:18 – 00:20 | Graphic tag: Think it. Speak it. Build it. Wispr Flow for Student Builders.',
    ],
    cta: 'Link in bio: Try Wispr Flow on your next project README.',
  },
  {
    id: 'challenge',
    badge: 'Concept 02',
    title: 'Campus Challenge: The 60-Second Spec Sprint',
    format: 'On-ground Hackathon Booth & College Tech Fest Activation',
    hook: 'Can your fingers beat your voice? Two students go head-to-head.',
    storyboard: [
      'Setup: A booth at an engineering college tech fest (e.g. SJCE / state hackathons).',
      'The Race: Student A types a 120-word technical problem statement on a keyboard. Student B speaks the same prompt with Wispr Flow.',
      'Audience Observation: Live external monitor shows Student B finishing in 22 seconds with zero typos while Student A is still on line two.',
      'Prize / Incentive: Participants get a student community invite and access to the workflow guide.',
    ],
    cta: 'Live QR code scan: install the app and challenge your lab partner.',
  },
  {
    id: 'creator',
    badge: 'Concept 03',
    title: 'Student Creator Collaboration: "Build In Public, Out Loud"',
    format: 'Collaboration with Indian Engineering & Tech Micro-creators',
    hook: 'Authentic desk setups, unpolished build logs, real engineering workflows.',
    storyboard: [
      'Partner with college students who share project build vlogs on LinkedIn, Instagram, and YouTube.',
      'Focus prompt: "Watch me document an entire semester IoT project in 10 minutes without typing a paragraph."',
      'Authentic highlight: Show hands on hardware components while voice-dictating circuit observation logs.',
      'Transparency: Creators showcase real speech-to-text accuracy with Indian English and technical jargon (capacitance, microcontrollers, async/await).',
    ],
    cta: 'Creator pinned comment with custom student invite code.',
  },
]

export interface DistributionChannel {
  channel: string
  reachMethod: string
  tactics: string[]
}

export const DISTRIBUTION_CHANNELS: DistributionChannel[] = [
  {
    channel: 'Engineering Clubs & Student Chapters',
    reachMethod: 'Direct peer workshops in GDG, IEEE, ACM, and Robotics clubs.',
    tactics: [
      'Host 15-minute lightning sessions at college hackathon openings on "Voice-driven engineering productivity".',
      'Provide student club leads with documentation templates optimized for voice dictation.',
    ],
  },
  {
    channel: 'Campus Tech WhatsApp & Telegram Communities',
    reachMethod: 'High-utility student circles where project deadlines and hackathon updates circulate.',
    tactics: [
      'Share quick 15-second screen recordings solving a specific college pain point: "How to draft your lab observation record in 3 minutes".',
      'Avoid spammy corporate advertising; emphasize genuine student utility.',
    ],
  },
  {
    channel: 'LinkedIn & X (Twitter) Build-In-Public Culture',
    reachMethod: 'Engineering students posting daily #100DaysOfCode and hardware logs.',
    tactics: [
      'Encourage students to post screenshots of their voice-generated technical summaries.',
      'Tag and feature exceptional student projects built using voice-first workflows.',
    ],
  },
  {
    channel: 'College Tech Fest Booth Demonstrations',
    reachMethod: 'Interactive foot-traffic activations during annual symposiums and hackathons.',
    tactics: [
      'Interactive testing station where students can test technical terminology recognition.',
      'Printable desk stickers with keyboard shortcuts and voice dictation tips.',
    ],
  },
]

export interface MetricTier {
  id: string
  label: string
  scope: string
  reach: string
  engagement: string
  clicks: string
  signups: string
  activeUsers: string
  costPerSignupHypothetical: string
}

export const MEASUREMENT_TIERS: MetricTier[] = [
  {
    id: 'pilot',
    label: 'Single Campus Pilot',
    scope: '1 Engineering College (~3,500 students, e.g. SJCE)',
    reach: '12,500 impressions',
    engagement: '1,120 engagements (9.0%)',
    clicks: '980 link visits',
    signups: '260 student trials',
    activeUsers: '115 retained weekly active users',
    costPerSignupHypothetical: 'Near zero (organic peer-to-peer / club workshops)',
  },
  {
    id: 'cluster',
    label: 'Regional 5-Campus Cluster',
    scope: '5 Engineering Institutions (~18,000 students)',
    reach: '68,000 impressions',
    engagement: '5,400 engagements (7.9%)',
    clicks: '4,800 link visits',
    signups: '1,420 student trials',
    activeUsers: '620 retained weekly active users',
    costPerSignupHypothetical: '₹35 – ₹50 (booth collateral + student creator incentives)',
  },
  {
    id: 'statewide',
    label: 'Statewide Hackathon Tour',
    scope: '15 Engineering Colleges + 3 State Hackathons (~50,000 students)',
    reach: '210,000 impressions',
    engagement: '18,500 engagements (8.8%)',
    clicks: '15,200 link visits',
    signups: '4,850 student trials',
    activeUsers: '2,100 retained weekly active users',
    costPerSignupHypothetical: '₹40 – ₹60 (event sponsorships + creator collabs)',
  },
]
