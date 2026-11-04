import type { ReactNode } from 'react'
import { FUTURE, LESSONS, PROJECTS, STORY } from '../data/content'
import { SECTIONS, type RouteId } from '../route'
import { DecisionSim } from './DecisionSim'
import { GrowthExperiment } from './GrowthExperiment'
import { ThoughtToCreation } from './ThoughtToCreation'
import { PageNav, PageShell } from './SiteShell'
import { ProjectCard } from './ProjectCard'

function Page({ id, intro, children }: { id: RouteId & string; intro: string; children: ReactNode }) {
  const meta = SECTIONS.find((s) => s.id === id)!
  return (
    <PageShell route={id}>
      <main id="main" className="page">
        <header className={`page-head tone-${meta.tone}`}>
          <p className="kicker">{meta.number} / 04</p>
          <h1>{meta.label}</h1>
          <p className="page-intro">{intro}</p>
        </header>
        <div className="page-body">{children}</div>
        <PageNav current={id} />
      </main>
    </PageShell>
  )
}

export function StoryPage() {
  return (
    <Page id="story" intro="A first-year ECE student, figuring it out by building.">
      <section className="prose">
        <p className="lead">{STORY.lead}</p>
        {STORY.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h2>{STORY.mindsetTitle}</h2>
        <ul className="points">
          {STORY.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="block-title">{STORY.pathTitle}</h2>
        <ol className="path">
          {STORY.path.map((s) => (
            <li key={s.stage}>
              <span className="path-num">{s.stage}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="muted">{STORY.note}</p>
      </section>
    </Page>
  )
}

export function WorkPage() {
  return (
    <Page id="work" intro="Projects and experiments, labelled for what they are.">
      <p className="muted">
        Projects are things I have built to varying stages. Experiments are for learning and are not
        finished products.
      </p>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} showMedia />
      ))}
    </Page>
  )
}

export function ThinkingPage() {
  return (
    <Page id="thinking" intro="How I reason about problems, and a small simulation to try it yourself.">
      <section>
        <h2 className="block-title">What experiments and mistakes taught me</h2>
        <ul className="lessons">
          {LESSONS.map((l) => (
            <li key={l.title}>
              <strong>{l.title}</strong>
              <p>{l.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="block-title">Try it: an engineering decision</h2>
        <DecisionSim />
      </section>
    </Page>
  )
}

export function GrowthPage() {
  const hardware = PROJECTS.find((p) => p.kind === 'experiment')
  return (
    <Page id="growth" intro="A proposed campaign to introduce Wispr Flow to engineering students across India: Think It. Speak It. Build It.">
      {/* Standout Interactive Campaign Demonstration */}
      <ThoughtToCreation />

      {/* The 5-stage interactive growth experiment */}
      <GrowthExperiment />

      {/* Engineering growth context and ongoing hardware experiments */}
      <section className="growth-context-section">
        <h2 className="block-title">Where I want to go</h2>
        <ul className="growth">
          {FUTURE.map((f) => (
            <li key={f.area}>
              <strong>{f.area}</strong>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
        <p className="muted">These are directions I am exploring, not results I have achieved.</p>
      </section>

      {hardware && (
        <section>
          <h2 className="block-title">The experiment in progress</h2>
          <ProjectCard project={hardware} index={PROJECTS.indexOf(hardware)} />
        </section>
      )}
    </Page>
  )
}
