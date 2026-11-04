import { OWNER, WHO_ME, JOURNEY, PROJECTS, LESSONS, FUTURE } from '../data/content'
import { ProjectCard } from './ProjectCard'
import { CommandLink, Heading, Line, NextSteps } from './ui'
import type { CommandDef } from '../commands'

export function Welcome() {
  return (
    <div className="welcome">
      <pre className="banner" aria-label={OWNER.title}>
        {`> ${OWNER.title}`}
      </pre>
      <Line>
        <span className="amber">{OWNER.name}</span>
      </Line>
      {OWNER.lines.map((l) => (
        <Line key={l}>
          <span className="ok-mark">[ok]</span> {l}
        </Line>
      ))}
      <p className="intro">{OWNER.intro}</p>
      <div className="next">
        <span className="dim">start here: </span>
        <CommandLink command="help" />
        <CommandLink command="who am I" />
        <CommandLink command="projects" />
        <CommandLink command="decisions" />
      </div>
    </div>
  )
}

export function Help({ commands }: { commands: CommandDef[] }) {
  return (
    <div>
      <Heading>Available commands</Heading>
      <table className="help-table">
        <tbody>
          {commands.map((c) => (
            <tr key={c.name}>
              <td>
                <CommandLink command={c.name} />
              </td>
              <td className="dim">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Line dim>Tips: Tab completes, arrow up/down browses history, commands are case-insensitive.</Line>
    </div>
  )
}

export function WhoMe() {
  return (
    <div>
      <Heading>whoami: {OWNER.name}</Heading>
      {WHO_ME.map((l) => (
        <p key={l} className="line pre">{l}</p>
      ))}
      <NextSteps commands={['journey', 'projects']} />
    </div>
  )
}

export function Journey() {
  return (
    <div>
      <Heading>ECE learning journey</Heading>
      <ol className="timeline">
        {JOURNEY.map((s) => (
          <li key={s.stage}>
            <span className="amber">[{s.stage}]</span> <strong>{s.title}</strong>
            <div className="dim">{s.detail}</div>
          </li>
        ))}
      </ol>
      <Line dim>A learning path, not a list of credentials. The journey is still in progress.</Line>
      <NextSteps commands={['projects', 'lessons']} />
    </div>
  )
}

export function Projects() {
  return (
    <div>
      <Heading>Projects and experiments</Heading>
      <Line dim>Projects and experiments are labelled separately. Experiments are not finished products.</Line>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
      <NextSteps commands={['lessons', 'future']} />
    </div>
  )
}

export function Lessons() {
  return (
    <div>
      <Heading>Lessons from experiments and mistakes</Heading>
      <ul className="plain">
        {LESSONS.map((l) => (
          <li key={l.title}>
            <span className="amber">&gt;</span> <strong>{l.title}</strong>
            <div className="dim">{l.body}</div>
          </li>
        ))}
      </ul>
      <NextSteps commands={['decisions', 'future']} />
    </div>
  )
}

export function Future() {
  return (
    <div>
      <Heading>Future interests</Heading>
      <ul className="plain">
        {FUTURE.map((f) => (
          <li key={f.area}>
            <span className="amber">{f.area}</span>
            <div className="dim">{f.body}</div>
          </li>
        ))}
      </ul>
      <NextSteps commands={['projects', 'decisions']} />
    </div>
  )
}

export function Unknown({ input, suggestion }: { input: string; suggestion?: string }) {
  return (
    <div>
      <p className="line err">command not found: {input}</p>
      {suggestion && (
        <Line>
          Did you mean <CommandLink command={suggestion} />?
        </Line>
      )}
      <Line dim>Type <span className="amber">help</span> to list the available commands.</Line>
    </div>
  )
}
