import { SECTIONS, hrefFor } from '../route'
import { PageShell } from './SiteShell'

const APPROACH = [
  { step: 'Listen', body: 'Start from a real problem someone has.' },
  { step: 'Build', body: 'Prototype it with code, circuits or both.' },
  { step: 'Learn', body: 'Test it, note what broke, and adjust.' },
]

export function Landing() {
  return (
    <PageShell route="home">
      <main id="main">
        <section className="hero">
          <p className="kicker">The Engineer&rsquo;s Terminal &mdash; A Voice-to-Impact Experience</p>
          <h1 className="hero-title">
            I don&rsquo;t just learn technology. <span>I build with it.</span>
          </h1>
          <p className="hero-sub">
            I&rsquo;m an ECE student exploring the intersection of hardware, software and
            real-world problems.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={hrefFor('terminal')}>
              <span className="mono" aria-hidden="true">&gt;_</span> Explore my terminal
            </a>
            <a className="btn btn-ghost" href={hrefFor('story')}>Start with my story</a>
          </div>
          <p className="hero-meta">
            Mugesh R. &middot; ECE &middot; Mindset: Experimental &middot; Status: Building something new
          </p>
        </section>

        <section aria-labelledby="explore-h" className="explore">
          <h2 id="explore-h" className="section-label">Choose where to begin</h2>
          <div className="tiles">
            {SECTIONS.map((s) => (
              <a key={s.id} href={hrefFor(s.id)} className={`tile tile-${s.tone}`}>
                <span className="tile-num">{s.number}</span>
                <span className="tile-title">{s.label}</span>
                <span className="tile-text">{s.tagline}</span>
                <span className="tile-go" aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-h" className="approach">
          <h2 id="how-h" className="section-label">How I work</h2>
          <ol>
            {APPROACH.map((a, i) => (
              <li key={a.step}>
                <span className="approach-num">{i + 1}</span>
                <strong>{a.step}</strong>
                <span>{a.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="terminal-cta" aria-labelledby="term-h">
          <div>
            <h2 id="term-h">Prefer a command line?</h2>
            <p>
              The original interactive terminal is still here. Type commands such as{' '}
              <code>help</code> or <code>projects</code>, or just click the suggestions.
            </p>
          </div>
          <a className="btn btn-primary" href={hrefFor('terminal')}>
            <span className="mono" aria-hidden="true">&gt;_</span> Explore my terminal
          </a>
        </section>
      </main>
    </PageShell>
  )
}
