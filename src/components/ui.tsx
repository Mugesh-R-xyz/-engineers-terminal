import type { ReactNode } from 'react'
import { useTerminal } from '../context'

export function CommandLink({ command, label }: { command: string; label?: string }) {
  const { run, available } = useTerminal()
  if (!available) return null
  return (
    <button type="button" className="cmd-link" onClick={() => run(command)}>
      {label ?? command}
    </button>
  )
}

export function Heading({ children }: { children: ReactNode }) {
  return <h2 className="heading">{children}</h2>
}

export function Line({ children, dim }: { children?: ReactNode; dim?: boolean }) {
  return <p className={dim ? 'line dim' : 'line'}>{children}</p>
}

export function Badge({ kind }: { kind: 'project' | 'experiment' }) {
  return (
    <span className={`badge badge-${kind}`}>
      {kind === 'project' ? 'PROJECT' : 'EXPERIMENT'}
    </span>
  )
}

export function NextSteps({ commands }: { commands: string[] }) {
  const { available } = useTerminal()
  if (!available) return null
  return (
    <div className="next">
      <span className="dim">try: </span>
      {commands.map((c) => (
        <CommandLink key={c} command={c} />
      ))}
    </div>
  )
}
