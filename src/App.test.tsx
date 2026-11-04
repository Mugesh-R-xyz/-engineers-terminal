// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import App from './App'

Element.prototype.scrollIntoView = () => {} // not implemented in jsdom
window.scrollTo = () => {}
beforeEach(() => {
  window.location.hash = '#/terminal' // the terminal is its own route
})
afterEach(cleanup)

const type = (cmd: string) => {
  const input = screen.getByLabelText('Terminal command input')
  fireEvent.change(input, { target: { value: cmd } })
  fireEvent.keyDown(input, { key: 'Enter' })
}

describe('terminal', () => {
  it('shows the welcome screen', () => {
    render(<App />)
    expect(screen.getByText(/Mugesh R\./)).toBeTruthy()
    expect(screen.getByText(/Status: Building something new/)).toBeTruthy()
    expect(screen.getByText(/This is not a traditional portfolio/)).toBeTruthy()
  })

  it.each([
    ['help', /Available commands/],
    ['Who me', /whoami/],
    ['who am I', /whoami/],
    ['who am me', /whoami/],
    ['WHO AM I', /whoami/],
    ['journey', /learning journey/],
    ['projects', /Campus X Voice/],
    ['lessons', /Lessons from experiments/],
    ['future', /Future interests/],
    ['decisions', /MISSION 01/],
  ])('runs %s', (cmd, expected) => {
    render(<App />)
    type(cmd)
    expect(screen.getAllByText(expected).length).toBeGreaterThan(0)
  })

  it('suggests on unknown commands', () => {
    render(<App />)
    type('projcts')
    expect(screen.getByText(/command not found: projcts/)).toBeTruthy()
  })

  it('clears history', () => {
    render(<App />)
    type('help')
    type('clear')
    expect(screen.queryByText(/Available commands/)).toBeNull()
    expect(screen.queryByText(/Mugesh R\./)).toBeNull()
  })

  it('runs the simulation to the right answer', () => {
    render(<App />)
    type('decisions')
    fireEvent.click(screen.getByText(/Measure voltage at the motor terminals/))
    expect(screen.getByText(/L2-L3: 0 V/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Overload' }))
    expect(screen.getByText(/Not quite/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Single phasing' }))
    expect(screen.getByText(/correct/)).toBeTruthy()
  })

  it('runs commands via clickable chips and reset restores welcome', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('navigation').querySelector('button')!)
    expect(screen.getAllByText(/Available commands/).length).toBe(1)
    type('clear')
    fireEvent.click(screen.getByText('reset'))
    expect(screen.getByText(/Mugesh R\./)).toBeTruthy()
  })
})

describe('site navigation', () => {
  it('shows the landing page with the headline and terminal action', () => {
    window.location.hash = '#/'
    render(<App />)
    expect(screen.getByText(/I build with it\./)).toBeTruthy()
    expect(screen.getByText(/exploring the intersection of hardware, software and/)).toBeTruthy()
    expect(screen.getAllByText(/Explore my terminal/).length).toBeGreaterThan(0)
    for (const name of ['My Story', 'My Work', 'My Thinking', 'My Growth Experiment'])
      expect(screen.getByRole('link', { name: new RegExp(name) })).toBeTruthy()
  })

  it.each([
    ['#/story', /The learning path/],
    ['#/work', /Campus X Voice/],
    ['#/thinking', /MISSION 01/],
    ['#/growth', /THINK IT\. SPEAK IT\. BUILD IT\./],
  ])('renders %s', (hash, expected) => {
    window.location.hash = hash
    render(<App />)
    expect(screen.getAllByText(expected).length).toBeGreaterThan(0)
  })

  it('opens the terminal from the landing page and returns', () => {
    window.location.hash = '#/'
    render(<App />)
    const cta = screen.getAllByRole('link', { name: /Explore my terminal/ })[0]
    expect(cta.getAttribute('href')).toBe('#/terminal')
    cleanup()
    window.location.hash = '#/terminal'
    render(<App />)
    expect(screen.getByLabelText('Terminal command input')).toBeTruthy()
    fireEvent.click(screen.getByText(/Main page/))
    expect(window.location.hash).toBe('#/')
  })

  it('renders an image slot per project on My Work only', () => {
    window.location.hash = '#/work'
    render(<App />)
    expect(screen.getAllByAltText(/Campus X Voice|YOLO People Counter|ECE hardware experiment/).length).toBe(3)
  })

  it('renders polished fallback for Campus X Voice when image fails to load', () => {
    window.location.hash = '#/work'
    render(<App />)
    const img = screen.getByAltText(/Campus X Voice/)
    fireEvent.error(img)
    expect(screen.getByText('CAMPUS X VOICE')).toBeTruthy()
    expect(screen.getByText('Student feedback platform')).toBeTruthy()
    expect(screen.getAllByText('Concept visualization — project in development').length).toBeGreaterThan(0)
  })
})

describe('the growth experiment (Wispr Flow campaign)', () => {
  beforeEach(() => {
    window.location.hash = '#/growth'
  })

  it('renders the 5 stages and clear disclaimer', () => {
    render(<App />)
    expect(screen.getByText('THINK IT. SPEAK IT. BUILD IT.')).toBeTruthy()
    expect(screen.getAllByText(/Wispr Flow/).length).toBeGreaterThan(0)
    expect(screen.getByText(/PROPOSAL & LEARNING EXPERIMENT:/)).toBeTruthy()
    expect(screen.getByText(/Stage 01 — Target Demographics/)).toBeTruthy()
  })

  it('allows switching student personas in Stage 1', () => {
    render(<App />)
    // Click the ECE hardware persona tab
    fireEvent.click(screen.getByText('The ECE & Hardware Experimenter'))
    expect(screen.getByText(/Hands-free voice note-taking while probing live circuit pins/)).toBeTruthy()
  })

  it('progresses to Stage 2: The Problem and calculates transcription latency', () => {
    render(<App />)
    fireEvent.click(screen.getByText(/Next: The Problem/))
    expect(screen.getByText(/Transcription Latency: The Brain vs. The Keyboard/)).toBeTruthy()
    expect(screen.getByText(/150 – 200/)).toBeTruthy()

    // Test slider change
    const slider = screen.getByLabelText('Document word count')
    fireEvent.change(slider, { target: { value: '800' } })
    expect(screen.getByText('800')).toBeTruthy()
  })

  it('progresses through Stage 3, 4 and 5', () => {
    render(<App />)
    // Jump directly to Campaign Ideas via stage nav tab
    fireEvent.click(screen.getByText('Campaign Ideas'))
    expect(screen.getByText(/The 2:00 AM README/)).toBeTruthy()

    // Switch to Concept 02: Campus challenge
    fireEvent.click(screen.getByText('Concept 02'))
    expect(screen.getByText(/The 60-Second Spec Sprint/)).toBeTruthy()

    // Jump to Stage 4: Distribution
    fireEvent.click(screen.getByText('Distribution'))
    expect(screen.getByText('Grassroots Distribution Engine')).toBeTruthy()
    expect(screen.getByText('The Student Growth Flywheel')).toBeTruthy()

    // Jump to Stage 5: Measurement Dashboard
    fireEvent.click(screen.getByText('Measurement'))
    expect(screen.getByText('Sample Campaign Measurement Dashboard')).toBeTruthy()
    expect(screen.getByText(/HYPOTHETICAL MODEL/)).toBeTruthy()

    // Switch measurement tier
    fireEvent.click(screen.getByText('Regional 5-Campus Cluster'))
    expect(screen.getByText('68,000 impressions')).toBeTruthy()
    expect(screen.getByText('1,420 student trials')).toBeTruthy()
  })
})


describe('from thought to creation campaign demonstration', () => {
  beforeEach(() => {
    window.location.hash = '#/growth'
  })

  it('renders the showcase header and stage 1 by default', () => {
    render(<App />)
    expect(screen.getByText('FROM THOUGHT TO CREATION')).toBeTruthy()
    expect(screen.getByText('ILLUSTRATIVE SIMULATION')).toBeTruthy()
    expect(screen.getByText(/A Student Has a Hardware Project Idea/)).toBeTruthy()
    expect(screen.getByText(/Target Hardware Setup/)).toBeTruthy()
  })

  it('navigates through all 5 stages using Next Stage and tests Replay', () => {
    render(<App />)
    // Stage 1 -> Stage 2
    fireEvent.click(screen.getByRole('button', { name: 'Next Stage →' }))
    expect(screen.getByText(/Speaking the Idea Naturally with Wispr Flow/)).toBeTruthy()
    expect(screen.getByText(/Spoken into Wispr Flow:/)).toBeTruthy()

    // Stage 2 -> Stage 3
    fireEvent.click(screen.getByRole('button', { name: 'Next Stage →' }))
    expect(screen.getByText(/Transforming Spoken Speech into a Structured Prompt/)).toBeTruthy()
    expect(screen.getByText(/Target System: ESP32 \+ BMP280 Sensor/)).toBeTruthy()

    // Stage 3 -> Stage 4
    fireEvent.click(screen.getByRole('button', { name: 'Next Stage →' }))
    expect(screen.getByText(/Feeding the Prompt to an AI Assistant/)).toBeTruthy()
    expect(screen.getByText(/Adafruit_BMP280 bmp;/)).toBeTruthy()

    // Stage 4 -> Stage 5
    fireEvent.click(screen.getByRole('button', { name: 'Next Stage →' }))
    expect(screen.getByText(/Testing the Working Bench Prototype/)).toBeTruthy()
    expect(screen.getByText(/Serial Monitor Telemetry/)).toBeTruthy()

    // Test Replay button
    fireEvent.click(screen.getByRole('button', { name: /Replay Demonstration/ }))
    expect(screen.getByText(/A Student Has a Hardware Project Idea/)).toBeTruthy()
  })

  it('allows direct stage selection via stepper buttons', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '03 · Prompt' }))
    expect(screen.getByText(/Voice-to-Structure Transformation/i)).toBeTruthy()
  })
})


describe('silent pump engineering simulation', () => {
  beforeEach(() => {
    window.location.hash = '#/thinking'
  })

  it('renders mission briefing with equipment specifications and reported symptoms', () => {
    render(<App />)
    expect(screen.getByText('ENGINEERING DIAGNOSTIC MISSION')).toBeTruthy()
    expect(screen.getByText(/5\.0 HP \(3\.7 kW\), 415 V, 3-Phase/)).toBeTruthy()
    expect(screen.getByText(/Audible Electromagnetic Hum/)).toBeTruthy()
    expect(screen.getByText(/LEARNING SIMULATION: values are fictional/)).toBeTruthy()
  })

  it('executes multiple diagnostic checks across categories', () => {
    render(<App />)
    // Run voltage check at panel
    fireEvent.click(screen.getByText(/Measure all three phase-to-phase voltages at main panel/))
    expect(screen.getByText(/L1 - L2: 412 V AC/)).toBeTruthy()

    // Run clamp meter check
    fireEvent.click(screen.getByText(/Clamp-meter the phase currents/))
    expect(screen.getByText(/Phase L1: 11\.8 A/)).toBeTruthy()
    expect(screen.getByText(/Phase L3: 0\.0 A/)).toBeTruthy()

    // Run mechanical pump shaft test
    fireEvent.click(screen.getByText(/Turn the pump shaft by hand/))
    expect(screen.getByText(/Shaft rotates freely by hand/)).toBeTruthy()

    // Run starter fuses check
    fireEvent.click(screen.getByText(/Inspect the fuses in the starter/))
    expect(screen.getByText(/HRC Fuse L3: BLOWN/)).toBeTruthy()
  })

  it('evaluates hypotheses and unlocks final engineering report and learning', () => {
    render(<App />)
    // Click candidate hypotheses
    fireEvent.click(screen.getByRole('button', { name: 'Voltage unbalance' }))
    expect(screen.getByText(/Plausible Precursor, but Incomplete Explanation/)).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Mechanical pump jam / bearing seizure' }))
    expect(screen.getByText(/Ruled Out by Physical Inspection/)).toBeTruthy()

    // Confirm single phasing
    fireEvent.click(screen.getByRole('button', { name: 'Single phasing' }))
    expect(screen.getByText(/Primary Root Cause: Confirmed/)).toBeTruthy()

    // Open Report & Learning tab
    fireEvent.click(screen.getByRole('button', { name: /Report & Learning/ }))
    expect(screen.getByText(/Field Investigation Report: Agricultural Motor Failure/)).toBeTruthy()
    expect(screen.getByText(/Primary Root Cause:/)).toBeTruthy()
    expect(screen.getByText(/Recommended Engineering Resolution & Next Investigations/)).toBeTruthy()
    expect(screen.getByText(/Core Engineering Principle: Why Systematic Measurements Matter/)).toBeTruthy()
  })
})
