import type { ReactNode } from 'react'
import { SECTIONS, hrefFor, type RouteId } from '../route'

export function SiteHeader({ route }: { route: RouteId }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href={hrefFor('home')} aria-label="The Engineer's Terminal, home">
          <span className="brand-mark" aria-hidden="true">E/T</span>
          <span className="brand-name">Mugesh R.</span>
        </a>
        <nav className="site-nav" aria-label="Main">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={hrefFor(s.id)}
              className={route === s.id ? 'active' : undefined}
              aria-current={route === s.id ? 'page' : undefined}
            >
              {s.label.replace('My ', '').replace(' Experiment', '')}
            </a>
          ))}
        </nav>
        <a className="btn btn-terminal" href={hrefFor('terminal')}>
          <span className="mono" aria-hidden="true">&gt;_</span> Terminal
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>The Engineer&rsquo;s Terminal &middot; A Voice-to-Impact Experience</span>
      <a href={hrefFor('terminal')}>Explore my terminal</a>
    </footer>
  )
}

export function PageShell({ route, children }: { route: RouteId; children: ReactNode }) {
  return (
    <div className="site">
      <SiteHeader route={route} />
      {children}
      <SiteFooter />
    </div>
  )
}

/** Previous / next links between the four experiences. */
export function PageNav({ current }: { current: string }) {
  const i = SECTIONS.findIndex((s) => s.id === current)
  const prev = SECTIONS[i - 1]
  const next = SECTIONS[i + 1]
  return (
    <nav className="pager" aria-label="Continue">
      {prev ? (
        <a href={hrefFor(prev.id)}><small>Previous</small>&larr; {prev.label}</a>
      ) : (
        <a href={hrefFor('home')}><small>Back</small>&larr; Home</a>
      )}
      {next ? (
        <a href={hrefFor(next.id)} className="next-link"><small>Next</small>{next.label} &rarr;</a>
      ) : (
        <a href={hrefFor('terminal')} className="next-link"><small>Next</small>Open the terminal &rarr;</a>
      )}
    </nav>
  )
}
