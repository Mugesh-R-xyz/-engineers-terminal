import { useState } from 'react'
import {
  AUDIENCE_PERSONAS,
  CAMPAIGN_CONCEPTS,
  DISTRIBUTION_CHANNELS,
  MEASUREMENT_TIERS,
  PROBLEM_COMPARISON,
} from '../data/growth'

const STAGES = [
  { id: 'audience', label: '1. Audience', tag: 'Who we reach' },
  { id: 'problem', label: '2. The Problem', tag: 'Friction point' },
  { id: 'campaign', label: '3. Campaign Ideas', tag: '3 Concepts' },
  { id: 'distribution', label: '4. Distribution', tag: 'Campus flywheel' },
  { id: 'measurement', label: '5. Measurement', tag: 'Hypothetical dashboard' },
]

export function GrowthExperiment() {
  const [activeStage, setActiveStage] = useState(0)
  const [selectedPersona, setSelectedPersona] = useState(0)
  const [wordCount, setWordCount] = useState(400)
  const [selectedConcept, setSelectedConcept] = useState(0)
  const [selectedTier, setSelectedTier] = useState(0)

  // Calculations for Stage 2 Simulator
  const typingMins = (wordCount / 45).toFixed(1)
  const speakingMins = (wordCount / 175).toFixed(1)
  const timeSavedMins = (parseFloat(typingMins) - parseFloat(speakingMins)).toFixed(1)
  const percentSaved = Math.round((1 - parseFloat(speakingMins) / parseFloat(typingMins)) * 100)

  const currentTier = MEASUREMENT_TIERS[selectedTier]

  return (
    <div className="growth-exp" aria-label="The Growth Experiment campaign proposal">
      {/* Header Banner */}
      <div className="growth-header">
        <div className="growth-badge">PROPOSED GROWTH CAMPAIGN</div>
        <h2 className="growth-title">THINK IT. SPEAK IT. BUILD IT.</h2>
        <p className="growth-subtitle">
          A proposed campaign to introduce <strong>Wispr Flow</strong> to engineering students across India.
        </p>

        <div className="growth-disclaimer" role="note">
          <strong>PROPOSAL &amp; LEARNING EXPERIMENT:</strong> This is a personal growth strategy proposal designed by Mugesh R. It is not an official Wispr Flow campaign, partnership, endorsement, or certified metric.
        </div>
      </div>

      {/* Stage Stepper Tabs */}
      <nav className="stage-nav" aria-label="Campaign stages">
        {STAGES.map((s, idx) => {
          const isActive = idx === activeStage
          const isPast = idx < activeStage
          return (
            <button
              key={s.id}
              type="button"
              className={`stage-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => setActiveStage(idx)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="stage-num">0{idx + 1}</span>
              <span className="stage-label">{s.label.replace(/^\d+\.\s*/, '')}</span>
              <span className="stage-tag">{s.tag}</span>
            </button>
          )
        })}
      </nav>

      {/* Stage 1: Audience */}
      {activeStage === 0 && (
        <section className="stage-panel" aria-labelledby="stage-1-h">
          <div className="panel-lead">
            <span className="kicker">Stage 01 &mdash; Target Demographics</span>
            <h3 id="stage-1-h">Engineering Students Across India</h3>
            <p>
              Undergraduates in Computer Science, ECE, Mechanical, and allied engineering branches who spend their days toggling between writing code, preparing lab observations, drafting seminar reports, and collaborating in team chats.
            </p>
          </div>

          <div className="persona-section">
            <div className="persona-tabs" role="tablist" aria-label="Student personas">
              {AUDIENCE_PERSONAS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === selectedPersona}
                  className={`persona-tab ${idx === selectedPersona ? 'active' : ''}`}
                  onClick={() => setSelectedPersona(idx)}
                >
                  <span className="persona-idx">{idx + 1}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>

            <div className="persona-card" role="tabpanel">
              <div className="persona-header">
                <div>
                  <span className="persona-tag">Target Persona</span>
                  <h4>{AUDIENCE_PERSONAS[selectedPersona].title}</h4>
                </div>
                <div className="persona-volume">
                  <span className="dim">Daily Text Volume:</span>
                  <strong>{AUDIENCE_PERSONAS[selectedPersona].dailyWords}</strong>
                </div>
              </div>

              <div className="persona-grid">
                <div className="persona-col">
                  <h5>Daily Workflow Context</h5>
                  <p>{AUDIENCE_PERSONAS[selectedPersona].context}</p>
                </div>
                <div className="persona-col pain">
                  <h5>The Friction Point</h5>
                  <p>{AUDIENCE_PERSONAS[selectedPersona].painPoint}</p>
                </div>
                <div className="persona-col gain">
                  <h5>Wispr Flow Advantage</h5>
                  <p>{AUDIENCE_PERSONAS[selectedPersona].voiceBenefit}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stage-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveStage(1)}
            >
              Next: The Problem &rarr;
            </button>
          </div>
        </section>
      )}

      {/* Stage 2: The Problem */}
      {activeStage === 1 && (
        <section className="stage-panel" aria-labelledby="stage-2-h">
          <div className="panel-lead">
            <span className="kicker">Stage 02 &mdash; The Core Bottleneck</span>
            <h3 id="stage-2-h">{PROBLEM_COMPARISON.headline}</h3>
            <p>{PROBLEM_COMPARISON.sub}</p>
          </div>

          {/* Speed Comparison Visualizer */}
          <div className="speed-visualizer">
            <div className="speed-card speech">
              <span className="speed-badge">Thinking &amp; Natural Speech</span>
              <div className="speed-num">{PROBLEM_COMPARISON.thinkingSpeed.wpm} <small>WPM</small></div>
              <p>{PROBLEM_COMPARISON.thinkingSpeed.detail}</p>
              <div className="speed-bar"><div className="fill speech-fill" style={{ width: '100%' }} /></div>
            </div>

            <div className="speed-card typing">
              <span className="speed-badge">Manual Laptop Typing</span>
              <div className="speed-num">{PROBLEM_COMPARISON.typingSpeed.wpm} <small>WPM</small></div>
              <p>{PROBLEM_COMPARISON.typingSpeed.detail}</p>
              <div className="speed-bar"><div className="fill typing-fill" style={{ width: '28%' }} /></div>
            </div>
          </div>

          {/* Interactive Latency Slider */}
          <div className="calc-box">
            <div className="calc-header">
              <div>
                <h4>Interactive Latency Calculator</h4>
                <p className="dim">Drag the slider to test time saved across various engineering writing tasks.</p>
              </div>
              <div className="calc-words">
                <span className="words-val">{wordCount}</span> words
              </div>
            </div>

            <div className="calc-slider-wrap">
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                className="calc-range"
                aria-label="Document word count"
              />
              <div className="slider-labels">
                <span>100 words (Code comments)</span>
                <span>400 words (Lab record)</span>
                <span>800 words (Project report)</span>
                <span>1200 words (Thesis draft)</span>
              </div>
            </div>

            <div className="calc-results">
              <div className="calc-result-card">
                <span className="dim">Manual Typing (~45 WPM)</span>
                <strong className="time-val typing">{typingMins} min</strong>
              </div>
              <div className="calc-result-card highlight">
                <span className="dim">Wispr Flow (~175 WPM)</span>
                <strong className="time-val speaking">{speakingMins} min</strong>
              </div>
              <div className="calc-result-card save">
                <span className="dim">Time Saved</span>
                <strong className="time-val diff">~{timeSavedMins} min ({percentSaved}% faster)</strong>
              </div>
            </div>
          </div>

          {/* Friction Point Cards */}
          <div className="friction-list">
            <h4>Three Student Writing Roadblocks</h4>
            <div className="friction-grid">
              {PROBLEM_COMPARISON.frictionPoints.map((f, i) => (
                <div key={f.title} className="friction-card">
                  <span className="f-num">0{i + 1}</span>
                  <h5>{f.title}</h5>
                  <p>{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stage-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setActiveStage(0)}
            >
              &larr; Back: Audience
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveStage(2)}
            >
              Next: Campaign Ideas &rarr;
            </button>
          </div>
        </section>
      )}

      {/* Stage 3: Campaign Ideas */}
      {activeStage === 2 && (
        <section className="stage-panel" aria-labelledby="stage-3-h">
          <div className="panel-lead">
            <span className="kicker">Stage 03 &mdash; Creative Strategy</span>
            <h3 id="stage-3-h">Three High-Impact Campaign Concepts</h3>
            <p>
              Designed specifically for engineering students: immediate practical utility, zero marketing fluff, and clear peer-to-peer demonstration.
            </p>
          </div>

          {/* Concept Selector */}
          <div className="concept-picker" role="tablist" aria-label="Campaign concepts">
            {CAMPAIGN_CONCEPTS.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={idx === selectedConcept}
                className={`concept-tab ${idx === selectedConcept ? 'active' : ''}`}
                onClick={() => setSelectedConcept(idx)}
              >
                <span className="concept-badge">{c.badge}</span>
                <span className="concept-name">{c.title.split(':')[0]}</span>
              </button>
            ))}
          </div>

          {/* Concept Detail View */}
          <div className="concept-card" role="tabpanel">
            <div className="concept-header">
              <span className="concept-format">{CAMPAIGN_CONCEPTS[selectedConcept].format}</span>
              <h4>{CAMPAIGN_CONCEPTS[selectedConcept].title}</h4>
              <div className="concept-hook">
                <strong>Core Hook:</strong> {CAMPAIGN_CONCEPTS[selectedConcept].hook}
              </div>
            </div>

            <div className="storyboard">
              <h5>Storyboard &amp; Execution Breakdown</h5>
              <div className="storyboard-timeline">
                {CAMPAIGN_CONCEPTS[selectedConcept].storyboard.map((step, idx) => (
                  <div key={idx} className="storyboard-step">
                    <span className="step-num">{idx + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="concept-cta-box">
              <span className="dim">Call to Action:</span>
              <strong>{CAMPAIGN_CONCEPTS[selectedConcept].cta}</strong>
            </div>
          </div>

          <div className="stage-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setActiveStage(1)}
            >
              &larr; Back: Problem
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveStage(3)}
            >
              Next: Distribution &rarr;
            </button>
          </div>
        </section>
      )}

      {/* Stage 4: Distribution */}
      {activeStage === 3 && (
        <section className="stage-panel" aria-labelledby="stage-4-h">
          <div className="panel-lead">
            <span className="kicker">Stage 04 &mdash; Go-To-Campus Execution</span>
            <h3 id="stage-4-h">Grassroots Distribution Engine</h3>
            <p>
              How to spread the campaign without heavy ad spending by anchoring in existing campus tech hubs, hackathons, and engineering clubs.
            </p>
          </div>

          <div className="dist-grid">
            {DISTRIBUTION_CHANNELS.map((ch, idx) => (
              <div key={ch.channel} className="dist-card">
                <div className="dist-num">0{idx + 1}</div>
                <h4>{ch.channel}</h4>
                <div className="dist-reach">
                  <span className="dim">Primary Strategy:</span> {ch.reachMethod}
                </div>
                <div className="dist-tactics">
                  <span className="dim">Key Actions:</span>
                  <ul>
                    {ch.tactics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Flywheel */}
          <div className="flywheel-box">
            <h4>The Student Growth Flywheel</h4>
            <div className="flywheel-steps">
              <div className="fw-step">
                <span className="fw-idx">1. Trigger</span>
                <strong>Assignment / Hackathon deadline pressure</strong>
              </div>
              <div className="fw-arrow" aria-hidden="true">&rarr;</div>
              <div className="fw-step">
                <span className="fw-idx">2. Discovery</span>
                <strong>Club demo or peer challenge video</strong>
              </div>
              <div className="fw-arrow" aria-hidden="true">&rarr;</div>
              <div className="fw-step">
                <span className="fw-idx">3. First Win</span>
                <strong>Speaking a 300-word lab record in 90 seconds</strong>
              </div>
              <div className="fw-arrow" aria-hidden="true">&rarr;</div>
              <div className="fw-step">
                <span className="fw-idx">4. Habit</span>
                <strong>Daily voice-first coding comments &amp; note-taking</strong>
              </div>
            </div>
          </div>

          <div className="stage-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setActiveStage(2)}
            >
              &larr; Back: Campaign Ideas
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveStage(4)}
            >
              Next: Measurement Dashboard &rarr;
            </button>
          </div>
        </section>
      )}

      {/* Stage 5: Measurement Dashboard */}
      {activeStage === 4 && (
        <section className="stage-panel" aria-labelledby="stage-5-h">
          <div className="panel-lead">
            <span className="kicker">Stage 05 &mdash; Impact Simulation</span>
            <h3 id="stage-5-h">Sample Campaign Measurement Dashboard</h3>
            <p>
              A projected metrics model to track awareness, conversion, and habituation.
            </p>
          </div>

          <div className="sim-notice">
            <span className="sim-badge">HYPOTHETICAL MODEL</span>
            <span>
              All numbers below represent illustrative engineering campaign benchmarks, not actual historical results.
            </span>
          </div>

          {/* Scale Selector */}
          <div className="tier-selector" role="tablist" aria-label="Campaign scale projection">
            {MEASUREMENT_TIERS.map((tier, idx) => (
              <button
                key={tier.id}
                type="button"
                role="tab"
                aria-selected={idx === selectedTier}
                className={`tier-tab ${idx === selectedTier ? 'active' : ''}`}
                onClick={() => setSelectedTier(idx)}
              >
                <strong>{tier.label}</strong>
                <span className="tier-scope">{tier.scope}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-label">Projected Reach</span>
              <strong className="metric-value">{currentTier.reach}</strong>
              <span className="metric-sub">Impressions across reels, posters &amp; clubs</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Estimated Engagement</span>
              <strong className="metric-value">{currentTier.engagement}</strong>
              <span className="metric-sub">Challenge participants, shares &amp; saves</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Landing Page Clicks</span>
              <strong className="metric-value">{currentTier.clicks}</strong>
              <span className="metric-sub">Direct visits via QR codes &amp; creator links</span>
            </div>

            <div className="metric-box highlight">
              <span className="metric-label">Student Sign-Ups</span>
              <strong className="metric-value">{currentTier.signups}</strong>
              <span className="metric-sub">New student tier activations</span>
            </div>

            <div className="metric-box active-box">
              <span className="metric-label">Weekly Active Users (W1)</span>
              <strong className="metric-value">{currentTier.activeUsers}</strong>
              <span className="metric-sub">Dictating &gt;3 sessions / week</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Est. Cost Per Signup</span>
              <strong className="metric-value">{currentTier.costPerSignupHypothetical}</strong>
              <span className="metric-sub">Hypothetical model projection</span>
            </div>
          </div>

          {/* Conversion Funnel Visualization */}
          <div className="funnel-container">
            <h4>Campaign Conversion Funnel (Target Projections)</h4>
            <div className="funnel-bars">
              <div className="funnel-row">
                <span className="funnel-label">Reach</span>
                <div className="funnel-bar-track">
                  <div className="funnel-bar-fill f-1" style={{ width: '100%' }} />
                </div>
                <span className="funnel-stat">100% (Awareness)</span>
              </div>
              <div className="funnel-row">
                <span className="funnel-label">Engagements</span>
                <div className="funnel-bar-track">
                  <div className="funnel-bar-fill f-2" style={{ width: '45%' }} />
                </div>
                <span className="funnel-stat">~8.5% (High interest)</span>
              </div>
              <div className="funnel-row">
                <span className="funnel-label">Clicks</span>
                <div className="funnel-bar-track">
                  <div className="funnel-bar-fill f-3" style={{ width: '28%' }} />
                </div>
                <span className="funnel-stat">~6.0% (Action taken)</span>
              </div>
              <div className="funnel-row">
                <span className="funnel-label">Sign-Ups</span>
                <div className="funnel-bar-track">
                  <div className="funnel-bar-fill f-4" style={{ width: '16%' }} />
                </div>
                <span className="funnel-stat">~2.2% (App installed)</span>
              </div>
              <div className="funnel-row">
                <span className="funnel-label">Active Users</span>
                <div className="funnel-bar-track">
                  <div className="funnel-bar-fill f-5" style={{ width: '9%' }} />
                </div>
                <span className="funnel-stat">~1.0% (Regular habit)</span>
              </div>
            </div>
          </div>

          <div className="stage-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setActiveStage(3)}
            >
              &larr; Back: Distribution
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveStage(0)}
            >
              &#x21ba; Restart Experience
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
