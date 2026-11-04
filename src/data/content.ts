// All portfolio copy lives here so it is easy to edit.
// Nothing here claims awards, statistics, or finished products that are not stated by the owner.

export const OWNER = {
  name: 'Mugesh R.',
  title: "The Engineer's Terminal",
  lines: [
    'ECE system initialized',
    'Mindset: Experimental',
    'Status: Building something new',
  ],
  intro:
    'This is not a traditional portfolio. Explore how I think, experiment, and build.',
}

export const WHO_ME = [
  'I am an Electronics and Communication Engineering (ECE) student who learns by building.',
  'I am drawn to the place where software meets physical hardware: sensors, microcontrollers, circuits and the code that makes them useful.',
  'My learning mindset:',
  '  - Try it first, then read the theory that explains why it behaved that way.',
  '  - Treat a failed experiment as data, not as a verdict.',
  '  - Write down what broke, so the same mistake is not paid for twice.',
  '  - Stay curious across the stack: web apps, computer vision, and electronics.',
]

export interface JourneyStep {
  stage: string
  title: string
  detail: string
}

// A learning path, deliberately without dates or claims of mastery.
export const JOURNEY: JourneyStep[] = [
  {
    stage: '01',
    title: 'Foundations',
    detail: 'Circuit basics, components, Ohm and Kirchhoff laws, reading datasheets.',
  },
  {
    stage: '02',
    title: 'Hands-on electronics',
    detail: 'Breadboard circuits, sensors and microcontrollers: learning by wiring and debugging.',
  },
  {
    stage: '03',
    title: 'Software for engineers',
    detail: 'Web development with React, TypeScript and Vite; Python for experiments.',
  },
  {
    stage: '04',
    title: 'Applied AI',
    detail: 'Exploring computer vision with YOLO to turn camera streams into useful signals.',
  },
  {
    stage: '05',
    title: 'Toward hardware design',
    detail: 'Early PCB design experiments. Still learning, still iterating.',
  },
]

export type ProjectKind = 'project' | 'experiment'

export interface Project {
  id: string
  name: string
  kind: ProjectKind
  /** Honest, explicit status label shown on the card. */
  status: string
  problem: string
  implementation: string[]
  stack: string[]
  /** Optional caveat about what this is not. */
  note?: string
}

/**
 * Visual evidence for the My Work page. Drop a real image into public/projects/ named
 * <id>.png, <id>.jpg or <id>.webp and it appears automatically; until then a placeholder shows.
 * Edit the caption so it says exactly what your image demonstrates.
 */
export interface ProjectMediaInfo {
  alt: string
  caption: string
  /** What to put in the placeholder, e.g. which screenshot to add. */
  wanted: string
  /** Optional conceptual vector illustration file under public/projects/ */
  conceptSvg?: string
}

export const PROJECT_MEDIA: Record<string, ProjectMediaInfo> = {
  'campus-x-voice': {
    alt: 'Concept visualization of Campus X Voice — student feedback platform',
    caption: 'Concept visualization — project in development',
    wanted: 'a screenshot of the Campus X Voice app',
    conceptSvg: 'campus-x-voice-concept.svg',
  },
  'yolo-people-counter': {
    alt: 'Illustrative visualization of YOLO People Counter — working prototype',
    caption: 'Illustrative visualization — working prototype',
    wanted: 'a screenshot of the Streamlit app detecting people',
    conceptSvg: 'yolo-people-counter-concept.svg',
  },
  'ece-hardware-experiments': {
    alt: 'Photograph or schematic of an ECE hardware experiment',
    caption: 'Real project artifact — KiCad microcontroller & circuit schematic.',
    wanted: 'a photo or schematic of a circuit, microcontroller or PCB experiment',
  },
}

export const PROJECTS: Project[] = [
  {
    id: 'campus-x-voice',
    name: 'Campus X Voice',
    kind: 'project',
    status: 'IN DEVELOPMENT',
    problem: 'A student feedback platform, initially designed for SJCE.',
    implementation: [
      'Google authentication for sign-in.',
      'Student profile functionality.',
      'Single-page web app backed by Supabase.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
    note: 'Not publicly launched and not yet used at scale.',
  },
  {
    id: 'yolo-people-counter',
    name: 'YOLO People Counter',
    kind: 'project',
    status: 'WORKING PROTOTYPE',
    problem: 'Count people entering and leaving a space from a live camera feed.',
    implementation: [
      'Live person detection with YOLO11n on a wireless phone camera stream.',
      'Tracks people entering and leaving.',
      'Stores events in a CSV file.',
      'Developed and run locally on a GPU. No benchmark numbers are claimed.',
    ],
    stack: ['Python', 'Streamlit', 'YOLO11n', 'Phone camera stream', 'CSV'],
    note: 'A prototype, not a finished or deployed product.',
  },
  {
    id: 'ece-hardware-experiments',
    name: 'ECE Hardware Experiments',
    kind: 'experiment',
    status: 'ONGOING EXPERIMENTS',
    problem:
      'Learn how real hardware behaves and how it connects to software.',
    implementation: [
      'Microcontroller and sensor experiments.',
      'Circuit building and debugging.',
      'PCB design experiments.',
      'Hardware-software integration.',
    ],
    stack: ['Microcontrollers', 'Sensors', 'Circuits', 'PCB design'],
    note: 'Experiments for learning, not completed products.',
  },
]
export const LESSONS = [
  {
    title: 'Measure before you guess',
    body: 'When a circuit or a program misbehaves, a measurement beats an assumption. Check power and wiring first.',
  },
  {
    title: 'Small experiments beat big plans',
    body: 'Changing one thing at a time makes failures understandable.',
  },
  {
    title: 'Hardware does not forgive silent mistakes',
    body: 'A swapped pin or missing common ground can cost hours. Double-check the schematic and the datasheet.',
  },
  {
    title: 'Real data is messy',
    body: 'Camera streams, sensors and user input are noisy. Systems must be built for that, not for the ideal case.',
  },
  {
    title: 'Write it down',
    body: 'Notes on what failed and why turn mistakes into reusable knowledge.',
  },
]

export const FUTURE = [
  { area: 'AI', body: 'Going deeper into computer vision and running models on small, practical systems.' },
  { area: 'Electronics', body: 'Building a stronger foundation in analog and digital design through repeated experiments.' },
  { area: 'Hardware', body: 'Combining microcontrollers, sensors and software into complete devices.' },
  { area: 'PCB design', body: 'Moving from breadboards to well-laid-out custom boards.' },
]

// My Story page copy. Kept separate from WHO_ME / JOURNEY, which the terminal commands use.
export const STORY = {
  lead: "I'm Mugesh, a first-year ECE student, and I'm still working out what I'm good at.",
  intro: [
    "I like both sides of engineering: the hardware you can touch and the code that makes it do something. I haven't picked one yet, and right now I'm fine with that.",
    "I learn best by making something and watching it break. Theory makes a lot more sense after I've seen my own project misbehave.",
  ],
  mindsetTitle: 'How I learn',
  points: [
    'I build first and read the theory when I get stuck. It sticks better that way.',
    "I'm not great at hardware yet. Electronics, microcontrollers and PCB design are all things I'm still learning.",
    "AI is new to me too. The people counter was my way of finding out what YOLO can actually do.",
    "I'd rather say 'I don't know yet' than fake it.",
  ],
  pathTitle: 'The learning path',
  path: [
    {
      stage: '01',
      title: 'Starting ECE',
      detail: "First year. Circuits, components and a lot of new vocabulary I'm still getting comfortable with.",
    },
    {
      stage: '02',
      title: 'Campus X Voice',
      detail: 'A feedback platform for students, first designed for SJCE. I used React, TypeScript, Vite, Tailwind and Supabase, and added Google sign-in and student profiles. Still in development.',
    },
    {
      stage: '03',
      title: 'The YOLO people counter',
      detail: 'I wanted to count people walking in and out using my phone as a camera. It works as a prototype with Python, Streamlit and YOLO11n, and it logs events to a CSV file. I run it on my own GPU.',
    },
    {
      stage: '04',
      title: 'Hardware experiments',
      detail: "Small experiments with microcontrollers, sensors and circuits, plus early PCB design attempts. These are for learning, not finished products.",
    },
    {
      stage: '05',
      title: 'What comes next',
      detail: "More electronics, better PCBs, and getting the hardware and software sides to work together. I don't have a full plan, and that's okay.",
    },
  ],
  note: "This isn't a list of achievements. It's just where I am so far.",
}