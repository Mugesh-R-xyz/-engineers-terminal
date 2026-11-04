import { useState } from 'react'
import { PROJECT_MEDIA } from '../data/content'

// Common extensions to check for raster / vector project artifacts
const EXTENSIONS = ['png', 'jpg', 'webp', 'svg']

export function ProjectMedia({ id }: { id: string }) {
  const info = PROJECT_MEDIA[id]
  const [loadError, setLoadError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  if (!info) return null

  const base = import.meta.env.BASE_URL

  // Priority 1: If info.conceptSvg is specified and hasn't failed to load
  if (info.conceptSvg && !loadError) {
    return (
      <figure className="media media-concept">
        <div className="media-frame">
          <img
            src={`${base}projects/${info.conceptSvg}`}
            alt={info.alt}
            loading="lazy"
            decoding="async"
            onError={() => setLoadError(true)}
          />
        </div>
        <figcaption>{info.caption}</figcaption>
      </figure>
    )
  }

  // Priority 2: For Campus X Voice, if conceptual illustration fails or is missing,
  // show the polished fallback with the exact required text
  if (id === 'campus-x-voice' && (loadError || !info.conceptSvg)) {
    return (
      <figure className="media media-concept-fallback-wrapper">
        <div className="media-frame">
          <div
            className="media-concept-fallback"
            role="img"
            aria-label="Campus X Voice — Concept visualization"
          >
            <span className="concept-fallback-tag">Concept visualization — project in development</span>
            <strong className="concept-fallback-title">CAMPUS X VOICE</strong>
            <span className="concept-fallback-sub">Student feedback platform</span>
          </div>
        </div>
        <figcaption>{info.caption}</figcaption>
      </figure>
    )
  }

  // Priority 3: Standard project image loader with multi-extension fallback
  const missing = attempt >= EXTENSIONS.length

  return (
    <figure className={missing ? 'media media-empty' : 'media'}>
      <div className="media-frame">
        {missing ? (
          <div className="media-placeholder" role="img" aria-label="Placeholder: image not added yet">
            <strong>Image not added yet</strong>
            <span>
              Add {info.wanted} as <code>public/projects/{id}.png</code> (or .jpg / .webp).
            </span>
          </div>
        ) : (
          <img
            key={attempt}
            src={`${base}projects/${id}.${EXTENSIONS[attempt]}`}
            alt={info.alt}
            loading="lazy"
            decoding="async"
            onError={() => setAttempt((a) => a + 1)}
          />
        )}
      </div>
      <figcaption>
        {missing ? 'Placeholder. The real image will replace this.' : info.caption}
      </figcaption>
    </figure>
  )
}
