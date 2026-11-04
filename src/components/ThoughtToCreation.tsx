import { useState } from 'react'

export interface DemoStep {
  step: number
  tabLabel: string
  title: string
  subtitle: string
  badge: string
}

const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    tabLabel: '01 · Idea',
    title: 'A Student Has a Hardware Project Idea',
    subtitle: 'Working at the lab bench with an ESP32 microcontroller and a temperature sensor.',
    badge: 'STAGE 1: THE RAW THOUGHT',
  },
  {
    step: 2,
    tabLabel: '02 · Voice',
    title: 'Speaking the Idea Naturally with Wispr Flow',
    subtitle: 'Hands remain on the breadboard while speaking technical requirements out loud.',
    badge: 'STAGE 2: NATURAL VOICE CAPTURE (ILLUSTRATIVE)',
  },
  {
    step: 3,
    tabLabel: '03 · Prompt',
    title: 'Transforming Spoken Speech into a Structured Prompt',
    subtitle: 'Raw conversational speech is organized into crisp parameters and constraints.',
    badge: 'STAGE 3: VOICE-TO-STRUCTURE TRANSFORMATION (SIMULATED)',
  },
  {
    step: 4,
    tabLabel: '04 · AI Code',
    title: 'Feeding the Prompt to an AI Assistant',
    subtitle: 'The structured prompt is passed to an AI coding tool to scaffold the firmware.',
    badge: 'STAGE 4: ASSISTANT IMPLEMENTATION (ILLUSTRATIVE)',
  },
  {
    step: 5,
    tabLabel: '05 · Prototype',
    title: 'Testing the Working Bench Prototype',
    subtitle: 'Firmware uploaded, circuit wired, and live sensor telemetry streaming.',
    badge: 'STAGE 5: PHYSICAL WORKING PROTOTYPE',
  },
]

export function ThoughtToCreation() {
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => setCurrentStep((s) => Math.min(DEMO_STEPS.length - 1, s + 1))
  const prev = () => setCurrentStep((s) => Math.max(0, s - 1))
  const replay = () => setCurrentStep(0)

  const step = DEMO_STEPS[currentStep]

  return (
    <section className="ttc-card" aria-label="From Thought to Creation interactive campaign demonstration">
      {/* Top Banner */}
      <div className="ttc-head">
        <div className="ttc-kicker-row">
          <span className="ttc-kicker">FEATURED CAMPAIGN DEMONSTRATION</span>
          <span className="ttc-sim-pill">ILLUSTRATIVE SIMULATION</span>
        </div>
        <h3 className="ttc-title">FROM THOUGHT TO CREATION</h3>
        <p className="ttc-subtitle">
          How voice-first workflows help an engineering student jump from a workbench idea to working prototype code.
        </p>
        <p className="ttc-notice">
          <strong>Campaign Note:</strong> Simulated workflow demonstration designed by Mugesh R. for this campaign proposal. Voice transcription and AI code generation are illustrated for educational demonstration, not actual recorded product audio.
        </p>
      </div>

      {/* Stepper Navigation */}
      <nav className="ttc-stepper" aria-label="Demonstration steps">
        {DEMO_STEPS.map((s, idx) => {
          const isActive = idx === currentStep
          const isDone = idx < currentStep
          return (
            <button
              key={s.step}
              type="button"
              className={`ttc-step-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => setCurrentStep(idx)}
              aria-label={s.tabLabel}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="ttc-btn-num">{s.tabLabel.split(' · ')[0]}</span>
              <span className="ttc-btn-label">{s.tabLabel.split(' · ')[1]}</span>
            </button>
          )
        })}
      </nav>

      {/* Step Content Card */}
      <div className="ttc-stage-body">
        <div className="ttc-stage-header">
          <span className="ttc-stage-badge">{step.badge}</span>
          <h4>{step.title}</h4>
          <p className="ttc-stage-sub">{step.subtitle}</p>
        </div>

        {/* STAGE 1: THE RAW IDEA */}
        {currentStep === 0 && (
          <div className="ttc-pane fade-in">
            <div className="ttc-idea-grid">
              <div className="ttc-idea-box">
                <span className="ttc-box-label">The Problem at the Bench</span>
                <p>
                  You are sitting at your lab desk. You have an <strong>ESP32</strong>, a <strong>BMP280</strong> sensor, and an <strong>LED</strong>.
                  Both hands are holding jumper wires and a multimeter probe.
                </p>
                <p>
                  You want to scaffold a test sketch to verify I2C communication and sound an alarm if temperature exceeds 32°C.
                </p>
                <div className="ttc-friction-tag">
                  Friction: Stopping to type out a 150-word engineering prompt breaks your hands-on flow.
                </div>
              </div>

              <div className="ttc-circuit-preview">
                <span className="ttc-box-label">Target Hardware Setup</span>
                <div className="ttc-diagram">
                  <div className="diag-chip esp">[ESP32 Microcontroller]</div>
                  <div className="diag-wire">&darr; I2C Bus (GPIO 21: SDA | GPIO 22: SCL)</div>
                  <div className="diag-chip sensor">[BMP280 Temperature Sensor (0x76)]</div>
                  <div className="diag-wire">&darr; GPIO 2 (Alert Output)</div>
                  <div className="diag-chip led">[Status Indicator LED]</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: VOICE CAPTURE */}
        {currentStep === 1 && (
          <div className="ttc-pane fade-in">
            <div className="ttc-voice-card">
              <div className="ttc-voice-header">
                <div className="ttc-mic-icon" aria-hidden="true">
                  <span className="pulsing-circle" />
                  <span className="mic-symbol">&#x1F3A4;</span>
                </div>
                <div>
                  <strong>Spoken into Wispr Flow:</strong>
                  <span className="ttc-dim-sub"> Hands-free spoken dictation at 170 words per minute</span>
                </div>
              </div>

              <div className="waveform-bar" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>

              <div className="ttc-spoken-quote">
                &ldquo;Hey, I&rsquo;m hooking up an ESP32 to a BMP280 sensor over I2C on pins 21 and 22. Build me a clean Arduino sketch that polls the temperature every three seconds, prints the reading formatted on the serial monitor, and if it goes above 32 degrees Celsius, flashes an alert LED on GPIO 2. Keep the code non-blocking with millis.&rdquo;
              </div>

              <div className="ttc-stat-row">
                <div className="ttc-stat">
                  <span className="dim">Spoken Time:</span>
                  <strong>8.5 seconds</strong>
                </div>
                <div className="ttc-stat">
                  <span className="dim">Equivalent Typing Time:</span>
                  <strong>~45 seconds</strong>
                </div>
                <div className="ttc-stat highlight">
                  <span className="dim">Efficiency:</span>
                  <strong>~80% faster</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: STRUCTURED PROMPT TRANSFORMATION */}
        {currentStep === 2 && (
          <div className="ttc-pane fade-in">
            <div className="ttc-transform-box">
              <div className="ttc-transform-head">
                <span className="ttc-box-label">Structured Output Generated from Voice</span>
                <span className="ttc-badge-pill">Formatted for AI Coding Assistants</span>
              </div>

              <pre className="ttc-prompt-code" tabIndex={0} aria-label="Structured prompt">
{`# Target System: ESP32 + BMP280 Sensor
- Board: ESP32 Dev Module (Arduino framework)
- Bus: I2C (SDA = GPIO 21, SCL = GPIO 22, Address = 0x76)
- Actuator: Alert LED on GPIO 2 (Active HIGH)
- Telemetry Interval: 3000 ms (non-blocking millis loop)

## Requirements:
1. Initialize Wire on GPIO 21/22 and verify BMP280 sensor detection.
2. Read temperature in Celsius.
3. Stream formatted serial telemetry at 115200 baud.
4. If temperature > 32.0°C, blink GPIO 2 LED.
5. Provide clear comments for student bench debugging.`}
              </pre>

              <div className="ttc-note-box">
                <strong>Why this matters:</strong> Wispr Flow eliminates conversational filler words (&ldquo;um&rdquo;, &ldquo;hey&rdquo;) and organizes casual speech into a structured engineering spec that AI models understand with high precision.
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: AI CODE GENERATION */}
        {currentStep === 3 && (
          <div className="ttc-pane fade-in">
            <div className="ttc-code-card">
              <div className="ttc-code-head">
                <span className="ttc-box-label">AI Coding Assistant Generation</span>
                <span className="ttc-badge-pill">ESP32 Firmware Scaffold (C++)</span>
              </div>

              <pre className="ttc-generated-code" tabIndex={0} aria-label="Generated C++ sketch">
{`#include <Wire.h>
#include <Adafruit_BMP280.h>

#define LED_PIN 2
#define TEMP_THRESHOLD 32.0
#define INTERVAL_MS 3000

Adafruit_BMP280 bmp;
unsigned long lastReadTime = 0;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Wire.begin(21, 22); // I2C SDA=21, SCL=22

  if (!bmp.begin(0x76)) {
    Serial.println("[ERR] BMP280 not found! Check I2C wiring.");
  } else {
    Serial.println("[OK] BMP280 sensor initialized.");
  }
}

void loop() {
  if (millis() - lastReadTime >= INTERVAL_MS) {
    lastReadTime = millis();
    float tempC = bmp.readTemperature();
    Serial.printf("[TELEMETRY] Temp: %.2f °C\n", tempC);

    // Alert LED trigger
    digitalWrite(LED_PIN, (tempC > TEMP_THRESHOLD) ? HIGH : LOW);
  }
}`}
              </pre>

              <div className="ttc-assistant-meta">
                <span className="mono">&gt; Ready for upload via Arduino IDE / PlatformIO</span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: WORKING PROTOTYPE */}
        {currentStep === 4 && (
          <div className="ttc-pane fade-in">
            <div className="ttc-proto-grid">
              <div className="ttc-proto-card">
                <span className="ttc-box-label">Serial Monitor Telemetry (Live Verification)</span>
                <pre className="ttc-terminal-stream" tabIndex={0} aria-label="Serial output stream">
{`[BOOT] ESP32 system initialized @ 115200 baud
[I2C] Scanning bus on pins 21/22... device found at 0x76
[OK] BMP280 sensor online. Non-blocking timer started.

[TELEMETRY] Temp: 28.4 °C | Status: NORMAL | LED: OFF
[TELEMETRY] Temp: 29.1 °C | Status: NORMAL | LED: OFF
[TELEMETRY] Temp: 32.8 °C | Status: OVER_THRESHOLD | LED: ACTIVE (HIGH)
[TELEMETRY] Temp: 31.5 °C | Status: NORMAL | LED: OFF`}
                </pre>
              </div>

              <div className="ttc-proto-summary">
                <h5>From Thought to Physical Reality</h5>
                <p>
                  In under 3 minutes, an ECE student turned an idea into a tested physical prototype on their workbench:
                </p>
                <ol className="ttc-summary-list">
                  <li><strong>Thought:</strong> Conceived the test scenario at the lab bench.</li>
                  <li><strong>Voice:</strong> Spoke natural instructions hands-free in 8 seconds.</li>
                  <li><strong>Prompt:</strong> Formatted into a structured engineering spec.</li>
                  <li><strong>Code:</strong> Generated and verified in an AI coding assistant.</li>
                  <li><strong>Prototype:</strong> Flashed to hardware with live serial telemetry.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Footer Controls */}
      <footer className="ttc-footer">
        <div className="ttc-footer-left">
          {currentStep > 0 && (
            <button type="button" className="btn btn-ghost" onClick={prev}>
              &larr; Previous Stage
            </button>
          )}
        </div>
        <div className="ttc-footer-right">
          {currentStep < DEMO_STEPS.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Next Stage &rarr;
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={replay}>
              &#x21ba; Replay Demonstration
            </button>
          )}
        </div>
      </footer>
    </section>
  )
}
