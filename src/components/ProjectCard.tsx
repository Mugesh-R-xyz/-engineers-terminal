import { Badge } from './ui'
import { ProjectMedia } from './ProjectMedia'
import type { Project } from '../data/content'

export function ProjectCard({ project: p, index, showMedia = false }: { project: Project; index: number; showMedia?: boolean }) {
  return (
    <article className="card">
      <header className="card-head">
        <span className="amber">{index + 1}.</span>
        <strong className="card-title">{p.name}</strong>
        <Badge kind={p.kind} />
        <span className="status">{p.status}</span>
      </header>
      {showMedia && <ProjectMedia id={p.id} />}
      <dl className="facts">
        <dt>Problem</dt>
        <dd>{p.problem}</dd>
        <dt>Built</dt>
        <dd>
          <ul className="impl">
            {p.implementation.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </dd>
        <dt>Tech</dt>
        <dd className="tags">
          {p.stack.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </dd>
      </dl>
      {p.note && <div className="dim card-note">{p.note}</div>}
    </article>
  )
}
