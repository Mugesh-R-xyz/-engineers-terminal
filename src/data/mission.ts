// THE SILENT PUMP: Three-Phase Agricultural Motor Failure Simulation
// DISCLAIMER: Fictional educational simulation for engineering students.
// Fictional numbers & diagnostic scenarios for pedagogical learning only.
// Not a commercial protection system, safety manual, or field diagnostic device.

export type CauseId = 'unbalance' | 'single-phasing' | 'overload' | 'mechanical-jam'

export interface Cause {
  id: CauseId
  label: string
  verdictTitle: string
  explain: string
  fitEvidence: boolean
  whyRuledOut?: string
}

export const CAUSES: Cause[] = [
  {
    id: 'single-phasing',
    label: 'Single phasing',
    verdictTitle: 'Primary Root Cause: Confirmed',
    explain:
      'One phase is completely lost downstream (L3 current is 0.0 A, terminal voltages L2-L3 & L3-L1 read 0 V, and Starter Fuse L3 is blown). The motor was running when the phase dropped; the remaining two phase windings drew ~160% rated current (~11.8 A vs 7.5 A rated) to sustain the mechanical torque, producing severe negative-sequence heating and magnetic hum.',
    fitEvidence: true,
  },
  {
    id: 'unbalance',
    label: 'Voltage unbalance',
    verdictTitle: 'Plausible Precursor, but Incomplete Explanation',
    explain:
      'Rural agricultural feeders frequently suffer from voltage unbalance (3-5%). However, in pure voltage unbalance, current flows through all three phases (unequally, but non-zero). Here, Phase L3 is completely disconnected (0.0 A) and the terminal voltage is 0 V, which is an open phase (single phasing), not simple unbalance.',
    fitEvidence: false,
    whyRuledOut: 'Phase L3 current is zero and terminal voltage to L3 is 0 V, indicating a total phase disconnect rather than voltage asymmetry.',
  },
  {
    id: 'overload',
    label: 'Overload',
    verdictTitle: 'Ruled Out: Does Not Fit Multi-Phase Evidence',
    explain:
      'Mechanical pump overloading (e.g. deeper water table or restricted pipe) causes symmetric high currents across all three lines. In this case, currents are not balanced at all: two lines are overloaded (11.8 A) and one is dead (0.0 A). Moreover, manual inspection confirmed the pump shaft rotates freely without binding.',
    fitEvidence: false,
    whyRuledOut: 'The mechanical shaft spins freely and the overcurrent is confined to two phases with zero current on the third.',
  },
  {
    id: 'mechanical-jam',
    label: 'Mechanical pump jam / bearing seizure',
    verdictTitle: 'Ruled Out by Physical Inspection',
    explain:
      'A locked rotor or silt-jammed impeller would draw 5x–6x starting current across all three phases simultaneously and prevent any shaft rotation. The physical lockout test showed the shaft rotates freely by hand, ruling out bearing seizure.',
    fitEvidence: false,
    whyRuledOut: 'Locked rotor test showed free manual rotation with zero mechanical binding.',
  },
]

export interface DiagnosticCheck {
  id: string
  category: 'Voltage' | 'Current' | 'Starter & Fuses' | 'Mechanical' | 'Operating Environment'
  label: string
  tool: string
  result: string[]
  technicalInterpretation: string
  hints: string
  clueStrength: 'low' | 'medium' | 'high'
}

export const CHECKS: DiagnosticCheck[] = [
  {
    id: 'supply',
    category: 'Voltage',
    label: 'Measure all three phase-to-phase voltages at main panel',
    tool: 'True-RMS Digital Multimeter (CAT III 600V)',
    result: [
      'L1 - L2: 412 V AC (Nominal 415V)',
      'L2 - L3: 415 V AC',
      'L3 - L1: 413 V AC',
    ],
    hints: 'The supply is healthy and balanced at the main panel, so look downstream.',
    technicalInterpretation:
      'Incoming grid supply at the main agricultural control box is well-balanced (<1% voltage asymmetry). The failure is not an upstream utility transformer outage.',
    clueStrength: 'medium',
  },
  {
    id: 'terminals',
    category: 'Voltage',
    label: 'Measure voltage at the motor terminals',
    tool: 'True-RMS Multimeter at junction box after starter contactor',
    result: [
      'L1-L2: 411 V',
      'L2-L3: 0 V',
      'L3-L1: 0 V',
    ],
    hints: 'Phase L3 never reaches the motor, so something between the panel and the motor is open.',
    technicalInterpretation:
      'Phase L3 voltage never reaches the motor windings! Voltage between L1 and L2 is normal, but both line pairs connected to L3 show zero potential. There is a complete open circuit between the starter panel and the motor terminals on Phase L3.',
    clueStrength: 'high',
  },
  {
    id: 'current',
    category: 'Current',
    label: 'Clamp-meter the phase currents (rated: 7.5 A)',
    tool: 'AC Clamp Meter (Motor running state attempt)',
    result: [
      'Phase L1: 11.8 A (157% of rated)',
      'Phase L2: 11.9 A (159% of rated)',
      'Phase L3: 0.0 A (Zero current)',
    ],
    hints: 'Two phases are well above rating (~11.8 A) and one is zero. This is an open phase, not a uniform overload.',
    technicalInterpretation:
      'Classic single-phasing current pattern: Phase L3 is completely open. The remaining two lines draw excessive current (~11.8 A) to maintain torque. Severe negative-sequence magnetic field causes rapid overheating and acoustic hum.',
    clueStrength: 'high',
  },
  {
    id: 'fuses',
    category: 'Starter & Fuses',
    label: 'Inspect the fuses in the starter',
    tool: 'Visual & Continuity Tester (Power OFF, LOTO)',
    result: [
      'HRC Fuse L1: Intact (0.1 Ω)',
      'HRC Fuse L2: Intact (0.1 Ω)',
      'HRC Fuse L3: BLOWN (Open loop / Inf Ω)',
      'Starter Contactor: Pitting on contact L3.',
    ],
    hints: 'A blown fuse on L3 explains the missing phase downstream.',
    technicalInterpretation:
      'Definitive physical failure point: Fuse L3 blew open during operation. The contactor contact for L3 also shows thermal oxidation, likely creating a high-resistance contact that accelerated fuse fatigue.',
    clueStrength: 'high',
  },
  {
    id: 'load',
    category: 'Mechanical',
    label: 'Turn the pump shaft by hand (power OFF, locked out)',
    tool: 'Mechanical torque & shaft inspection',
    result: [
      'Shaft rotates freely by hand.',
      'No axial play or grinding noise from bearings.',
      'Impeller clear of sand or silt obstruction.',
    ],
    hints: 'The mechanical load looks normal; the pump is not seized or silt-bound.',
    technicalInterpretation:
      'Rules out mechanical binding, sand lock, and seized bearings. The failure origin is purely electrical, not mechanical pump overload.',
    clueStrength: 'medium',
  },
  {
    id: 'winding',
    category: 'Operating Environment',
    label: 'Check the motor casing temperature',
    tool: 'Infrared Thermal Thermometer',
    result: [
      'Stator casing: 86.4 °C (Ambient 33.0 °C)',
      'Faint smell of overheated winding varnish.',
      'Thermal overload bimetallic strip was in tripped state.',
    ],
    hints: 'Overheating is a symptom shared by several causes, so it does not decide on its own.',
    technicalInterpretation:
      'Severe thermal stress. Operating on two phases generated rapid I^2*R heating in the active phase coils. If thermal protection had not tripped, winding insulation would have charred within 60–90 seconds.',
    clueStrength: 'medium',
  },
  {
    id: 'conditions',
    category: 'Operating Environment',
    label: 'Review operating conditions and rural grid history',
    tool: 'Operator log & rural distribution feeder records',
    result: [
      'Agricultural 11 kV feeder experiences frequent single-phase breaker trips during peak hours.',
      'Motor is a 5.0 HP (3.7 kW) squirrel-cage induction motor in continuous irrigation duty.',
      'Previous motor burned out 10 months ago; farmer had bypassed the single-phase preventer relay.',
    ],
    hints: 'The feeder has a history of phase drops and the safety relay had been bypassed.',
    technicalInterpretation:
      'Crucial operational context: The agricultural line has a history of phase drops, and the safety relay had been bypassed previously. Without single-phase protection, the motor was vulnerable to repeated failure.',
    clueStrength: 'high',
  },
]

export const ANSWER: CauseId = 'single-phasing'

export const SCENARIO = {
  title: 'MISSION 01: The Silent Pump',
  subtitle: 'Three-Phase Agricultural Borewell Motor Failure Investigation',
  equipment: '5.0 HP (3.7 kW), 415 V, 3-Phase, 50 Hz, 7.5 A Submersible Induction Motor',
  intro: [
    'A farmer reports that their 5 HP three-phase agricultural borewell pump stopped delivering water.',
    'When energized at the starter panel, the motor emits a loud 100 Hz magnetic hum, vibrates, runs hot, and trips the thermal overload relay after 25 seconds.',
    'Last irrigation season a replacement motor burned out in two months.',
    'Your objective: Follow systematic engineering diagnostics to identify the true root cause, distinguish primary failures from symptoms, and generate a technical resolution report.',
  ],
  disclaimer:
    'LEARNING SIMULATION: values are fictional. This is not a real commercial protection system and must not be used for real safety decisions.',
}

export const ENGINEERING_LESSONS = [
  {
    title: 'Symptoms Are Not Root Causes',
    detail:
      'High current and a tripped thermal relay look like an "overload" on the surface. Blindly increasing breaker ratings or resetting the trip would destroy the stator windings.',
  },
  {
    title: 'Measure Systematically: Source to Terminals',
    detail:
      'Checking voltage at the panel proved utility supply was balanced (412-415 V). Only downstream testing at the motor terminals revealed the missing Phase L3.',
  },
  {
    title: 'Clamp Meters Reveal Negative-Sequence Current',
    detail:
      'A clamp meter is the quickest test for single phasing: two phases drawing ~160% rated current while the third reads exactly 0.0 A.',
  },
  {
    title: 'Never Bypass Single-Phase Protection',
    detail:
      'Thermal overloads respond slowly under partial load. A dedicated negative-sequence voltage/current monitoring relay (Single Phase Preventer) is vital for rural three-phase motors.',
  },
]
