import { useEffect, useSyncExternalStore } from 'react'

export type RouteId = 'home' | 'story' | 'work' | 'thinking' | 'growth' | 'terminal'

export interface SectionMeta {
  id: Exclude<RouteId, 'home' | 'terminal'>
  number: string
  label: string
  tagline: string
  tone: 'sand' | 'ocean' | 'rust' | 'charcoal'
}

export const SECTIONS: SectionMeta[] = [
  { id: 'story', number: '01', label: 'My Story', tagline: 'Who I am, how I learn, and the path so far.', tone: 'sand' },
  { id: 'work', number: '02', label: 'My Work', tagline: 'Projects and experiments, honestly labelled.', tone: 'ocean' },
  { id: 'thinking', number: '03', label: 'My Thinking', tagline: 'How I reason through a problem. Try the investigation.', tone: 'rust' },
  { id: 'growth', number: '04', label: 'My Growth Experiment', tagline: 'Think It. Speak It. Build It. — A proposed campaign for Wispr Flow.', tone: 'charcoal' },
]

const ROUTES: RouteId[] = ['home', 'story', 'work', 'thinking', 'growth', 'terminal']

function parse(hash: string): RouteId {
  const id = hash.replace(/^#\/?/, '') as RouteId
  return ROUTES.includes(id) ? id : 'home'
}

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export const hrefFor = (id: RouteId) => (id === 'home' ? '#/' : `#/${id}`)

export function useRoute(): RouteId {
  const route = useSyncExternalStore(subscribe, () => parse(window.location.hash), () => 'home' as RouteId)
  useEffect(() => {
    window.scrollTo(0, 0)
    const label = SECTIONS.find((s) => s.id === route)?.label
    document.title =
      route === 'terminal'
        ? "Terminal | The Engineer's Terminal"
        : label
          ? `${label} | The Engineer's Terminal`
          : "The Engineer's Terminal | Mugesh R."
  }, [route])
  return route
}

export const navigate = (id: RouteId) => {
  window.location.hash = hrefFor(id)
}
