import { useState } from 'react'
import {
  ANSWER,
  CAUSES,
  CHECKS,
  ENGINEERING_LESSONS,
  SCENARIO,
  type CauseId,
  type DiagnosticCheck,
} from '../data/mission'
import { Heading, Line, NextSteps } from './ui'

type SimWorkflowStage = 'all' | 'briefing' | 'investigation' | 'diagnosis' | 'report'

export function DecisionSim() {
  const [done, setDone] = useState<string[]>([])
  const [guess, setGuess] = useState<CauseId | null>(null)
  const [activeStage, setActiveStage] = useState<SimWorkflowStage>('all')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const toggleCheck = (id: string) => {
    setDone((d) => (d.includes(id) ? d : [...d, id]))
  }

  const reset = () => {
    setDone([])
    setGuess(null)
    setActiveStage('all')
    setActiveCategory('All')
  }

  const solved = guess === ANSWER
  const selectedCause = CAUSES.find((c) => c.id === guess)

  const categories = ['All', 'Voltage', 'Current', 'Starter & Fuses', 'Mechanical', 'Operating Environment']
  const filteredChecks = activeCategory === 'All'
    ? CHECKS
    : CHECKS.filter((c) => c.category === activeCategory)

  const showBriefing = activeStage === 'all' || activeStage === 'briefing'
  const showInvestigation = activeStage === 'all' || activeStage === 'investigation'
  const showDiagnosis = activeStage === 'all' || activeStage === 'diagnosis'
  const showReport = activeStage === 'report'

  return (
    <section className="sim" aria-label="Agricultural motor failure decision simulation">
      {/* Simulation Masthead */}
      <div className="sim-masthead">
        <div className="sim-kicker-row">
          <span className="sim-kicker">ENGINEERING DIAGNOSTIC MISSION</span>
          <span className="sim-tag">FAULT SIMULATION</span>
        </div>
        <Heading>{SCENARIO.title}</Heading>
        <p className="sim-sub-title">{SCENARIO.subtitle}</p>
        <div className="sim-specs-strip">
          <span className="spec-item"><strong>Equipment:</strong> {SCENARIO.equipment}</span>
        </div>
        <p className="warn">{SCENARIO.disclaimer}</p>
      </div>

      {/* Guided Workflow Stepper Tabs */}
      <nav className="sim-stepper" aria-label="Investigation workflow navigation">
        <button
          type="button"
          className={`sim-step-tab ${activeStage === 'all' ? 'active' : ''}`}
          onClick={() => setActiveStage('all')}
        >
          <span className="sim-step-num">&#x25A3;</span>
          <span className="sim-step-name">Full Dossier</span>
        </button>
        <button
          type="button"
          className={`sim-step-tab ${activeStage === 'briefing' ? 'active' : ''}`}
          onClick={() => setActiveStage('briefing')}
        >
          <span className="sim-step-num">01</span>
          <span className="sim-step-name">Briefing</span>
        </button>
        <button
          type="button"
          className={`sim-step-tab ${activeStage === 'investigation' ? 'active' : ''}`}
          onClick={() => setActiveStage('investigation')}
        >
          <span className="sim-step-num">02</span>
          <span className="sim-step-name">Investigation ({done.length}/{CHECKS.length})</span>
        </button>
        <button
          type="button"
          className={`sim-step-tab ${activeStage === 'diagnosis' ? 'active' : ''}`}
          onClick={() => setActiveStage('diagnosis')}
        >
          <span className="sim-step-num">03</span>
          <span className="sim-step-name">Diagnosis</span>
        </button>
        <button
          type="button"
          className={`sim-step-tab ${activeStage === 'report' ? 'active' : ''}`}
          onClick={() => setActiveStage('report')}
        >
          <span className="sim-step-num">04</span>
          <span className="sim-step-name">Report &amp; Learning</span>
        </button>
      </nav>

      {/* STAGE 1: MISSION BRIEFING */}
      {showBriefing && (
        <div className="sim-section-box">
          <h3 className="sub">1. Mission Briefing &amp; Initial Symptoms</h3>
          {SCENARIO.intro.map((l) => (
            <Line key={l}>{l}</Line>
          ))}

          <div className="briefing-symptoms">
            <h4>Reported Field Symptoms:</h4>
            <div className="symptom-grid">
              <div className="symptom-card">
                <span className="sym-icon">&#x26A0;</span>
                <div>
                  <strong>Audible Electromagnetic Hum</strong>
                  <p className="dim">100 Hz magnetic hum when starter engages; motor fails to accelerate.</p>
                </div>
              </div>
              <div className="symptom-card">
                <span className="sym-icon">&#x1F525;</span>
                <div>
                  <strong>Rapid Thermal Rise</strong>
                  <p className="dim">Stator casing temperature spikes within 30 seconds; faint varnish odor.</p>
                </div>
              </div>
              <div className="symptom-card">
                <span className="sym-icon">&#x1F4A7;</span>
                <div>
                  <strong>Zero Hydraulic Discharge</strong>
                  <p className="dim">Discharge delivery pipe produces no water volume.</p>
                </div>
              </div>
              <div className="symptom-card">
                <span className="sym-icon">&#x1F50C;</span>
                <div>
                  <strong>Overload Relay Tripping</strong>
                  <p className="dim">Bimetallic thermal overload trips the main contactor after 20–25s.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: INVESTIGATION & EVIDENCE */}
      {showInvestigation && (
        <div className="sim-section-box">
          <div className="investigation-head">
            <h3 className="sub">2. Diagnostic Checks &amp; Evidence ({done.length}/{CHECKS.length} Conducted)</h3>
            <p className="dim">
              Execute measurements across electrical, mechanical, and operating conditions. Clues must be cross-referenced to prove root cause.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="sim-cat-bar" role="tablist" aria-label="Diagnostic categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`sim-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List of Diagnostic Checks */}
          <ul className="checks" aria-label="Diagnostic checks list">
            {filteredChecks.map((c: DiagnosticCheck) => {
              const open = done.includes(c.id)
              return (
                <li key={c.id} className={`check-card ${open ? 'revealed' : ''}`}>
                  <button
                    type="button"
                    className={open ? 'choice used' : 'choice'}
                    onClick={() => toggleCheck(c.id)}
                    aria-expanded={open}
                  >
                    <span className="check-box-icon">{open ? '[x]' : '[ ]'}</span>
                    <span className="check-title">{c.label}</span>
                    <span className="check-cat-badge">{c.category}</span>
                  </button>

                  {open && (
                    <div className="evidence">
                      <div className="evidence-tool">
                        <span className="dim">Instrument:</span> {c.tool}
                      </div>

                      <div className="evidence-readout" role="region" aria-label="Instrument readout">
                        <div className="readout-label">MEASUREMENT READINGS:</div>
                        {c.result.map((r) => (
                          <div key={r} className="readout-line">
                            &gt; {r}
                          </div>
                        ))}
                      </div>

                      <div className="evidence-eval">
                        <strong>Technical Evaluation:</strong> {c.technicalInterpretation}
                      </div>

                      <div className="hint">
                        <strong>Clue analysis:</strong> {c.hints}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* STAGE 3: DIAGNOSIS EVALUATION */}
      {showDiagnosis && (
        <div className="sim-section-box">
          <h3 className="sub">3. Evaluate Root Cause Hypotheses</h3>
          <p className="dim">
            Compare all accumulated test readings against candidate failure modes:
          </p>

          <div className="causes">
            {CAUSES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={guess === c.id ? 'choice selected' : 'choice'}
                onClick={() => setGuess(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {guess && (
            <div className={solved ? 'verdict ok' : 'verdict bad'} role="status">
              <div className="verdict-header">
                <strong>
                  {solved ? 'Likely cause: correct.' : 'Not quite. Re-check the evidence.'}
                </strong>
                <span className="verdict-badge">{selectedCause?.verdictTitle}</span>
              </div>

              <div className="verdict-explain">{selectedCause?.explain}</div>

              {solved ? (
                <div className="lesson">
                  <strong>Engineering Conclusion:</strong> A clamp meter plus a voltage check at the motor terminals
                  separates single phasing from unbalance and overload. Never restart the motor before the open phase is fixed.
                  Real protection relays exist for this, and this simulation is not one.
                </div>
              ) : (
                <div className="verdict-hint">
                  {done.length < CHECKS.length && (
                    <div className="dim">
                      Hint: You have tested {done.length} of {CHECKS.length} checkpoints. Cross-check your evidence before deciding.
                    </div>
                  )}
                  {selectedCause?.whyRuledOut && (
                    <div className="ruled-out">
                      <strong>Why ruled out:</strong> {selectedCause.whyRuledOut}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* STAGE 4: ENGINEERING REPORT & SYSTEMATIC LEARNING */}
      {showReport && (
        <div className="sim-section-box">
          <div className="report-container">
            <div className="report-badge">FINAL TECHNICAL REPORT</div>
            <h3 className="report-title">Field Investigation Report: Agricultural Motor Failure</h3>
            <p className="report-meta">
              Equipment: {SCENARIO.equipment} &middot; Scenario: {SCENARIO.title}
            </p>

            {/* Selected Measurements Table */}
            <div className="report-section">
              <h4>1. Summary of Completed Field Measurements ({done.length} of {CHECKS.length} Conducted)</h4>
              {done.length === 0 ? (
                <p className="dim italic">No diagnostic checks were run yet. Click tests in Stage 2 to log instrument data.</p>
              ) : (
                <div className="report-table-wrap">
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Checkpoint</th>
                        <th>Category</th>
                        <th>Readings Obtained</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHECKS.filter((c) => done.includes(c.id)).map((c) => (
                        <tr key={c.id}>
                          <td><strong>{c.label}</strong></td>
                          <td><span className="table-badge">{c.category}</span></td>
                          <td>
                            {c.result.map((r) => (
                              <div key={r} className="mono-sub">&gt; {r}</div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Root Cause Analysis */}
            <div className="report-section">
              <h4>2. Root Cause Analysis</h4>
              <div className="report-cause-box">
                <span className="dim">Primary Root Cause:</span>
                <h5>Single-Phasing (Open Phase on L3 downstream of Panel)</h5>
                <p>
                  Phase L3 experienced a complete disconnect due to a blown HRC starter fuse and contactor oxidation. When energized, the motor operated across only two active phase lines (L1 and L2), drawing ~160% rated current (~11.8 A) to sustain magnetizing flux. This induced severe negative-sequence currents, leading to excessive $I^2R$ rotor heating, high acoustic hum, and repeated thermal trips.
                </p>
              </div>
            </div>

            {/* Alternative Hypotheses Ruled Out */}
            <div className="report-section">
              <h4>3. Alternative Hypotheses Evaluated &amp; Ruled Out</h4>
              <div className="hypo-grid">
                <div className="hypo-card">
                  <strong>Voltage Unbalance:</strong>
                  <p>Ruled out because Phase L3 current was zero rather than asymmetrical. Terminal voltage to L3 was 0 V.</p>
                </div>
                <div className="hypo-card">
                  <strong>Mechanical Overload:</strong>
                  <p>Ruled out because overload causes symmetric high currents on all three lines. In this case, two lines pulled overcurrent while one was dead.</p>
                </div>
                <div className="hypo-card">
                  <strong>Pump Jam / Seized Rotor:</strong>
                  <p>Ruled out by manual lockout test; the pump shaft spins freely with zero mechanical resistance or bearing roughness.</p>
                </div>
              </div>
            </div>

            {/* Recommended Next Actions */}
            <div className="report-section">
              <h4>4. Recommended Engineering Resolution &amp; Next Investigations</h4>
              <ol className="report-actions">
                <li>
                  <strong>Replace Phase L3 Starter Fuse &amp; Re-seat Contactor:</strong> Replace all three HRC fuses with correctly rated, matched characteristic cartridges. Clean or replace pitted starter contactor contacts.
                </li>
                <li>
                  <strong>Re-install and Calibrate Single-Phase Preventer Relay:</strong> Never allow motor operation with the protection relay bypassed. Install a voltage- and current-sensing negative-sequence preventer that trips in &lt;3 seconds upon phase loss.
                </li>
                <li>
                  <strong>Measure Stator Insulation Resistance (Megger Test):</strong> Before re-energizing, test winding-to-ground insulation with a 500V DC megger (&gt;5 MΩ required) to ensure overheated varnish has not compromised dielectric integrity.
                </li>
                <li>
                  <strong>Monitor Agricultural Feeder Stability:</strong> Coordinate with rural distribution substation to balance phase loads on the 11 kV line to reduce upstream breaker trips.
                </li>
              </ol>
            </div>

            {/* Systematic Learning Section */}
            <div className="report-section learning-section">
              <h4>5. Core Engineering Principle: Why Systematic Measurements Matter</h4>
              <p className="dim">
                Why systematic measurements matter before selecting a protection solution:
              </p>
              <div className="lessons-grid">
                {ENGINEERING_LESSONS.map((l, i) => (
                  <div key={l.title} className="lesson-card">
                    <span className="lesson-idx">0{i + 1}</span>
                    <div>
                      <strong>{l.title}</strong>
                      <p>{l.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset & Footer Navigation */}
      <div className="sim-footer-controls">
        <button type="button" className="cmd-link" onClick={reset}>
          restart mission
        </button>
      </div>
      <NextSteps commands={['lessons', 'help']} />
    </section>
  )
}
