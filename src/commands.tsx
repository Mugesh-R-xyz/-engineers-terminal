import type { ReactNode } from 'react'
import { DecisionSim } from './components/DecisionSim'
import { Future, Help, Journey, Lessons, Projects, WhoMe } from './components/Sections'

export interface CommandDef {
  name: string
  description: string
  /** Extra accepted spellings. */
  aliases?: string[]
  render: () => ReactNode
}

export const COMMANDS: CommandDef[] = [
  { name: 'help', description: 'List available commands', render: () => <Help commands={COMMANDS} /> },
  { name: 'who am I', description: 'My engineering interests and learning mindset', aliases: ['who me', 'who am me', 'whoami', 'who'], render: () => <WhoMe /> },
  { name: 'journey', description: 'My ECE learning journey', render: () => <Journey /> },
  { name: 'projects', description: 'Explore my projects and experiments', render: () => <Projects /> },
  { name: 'decisions', description: 'Interactive motor-failure investigation (simulation)', render: () => <DecisionSim /> },
  { name: 'lessons', description: 'What experiments and mistakes taught me', render: () => <Lessons /> },
  { name: 'future', description: 'Where I want to go: AI, electronics, hardware, PCB', render: () => <Future /> },
  // "clear" is handled by the terminal itself because it mutates history.
  { name: 'clear', description: 'Clear the terminal history', aliases: ['cls'], render: () => null },
]

export const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')

export function findCommand(input: string): CommandDef | undefined {
  const n = normalize(input)
  return COMMANDS.find((c) => c.name.toLowerCase() === n || c.aliases?.includes(n))
}

function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
  return dp[a.length][b.length]
}

export function suggest(input: string): string | undefined {
  const n = normalize(input)
  let best: { name: string; d: number } | undefined
  for (const c of COMMANDS) {
    for (const name of [c.name.toLowerCase(), ...(c.aliases ?? [])]) {
      const d = name.startsWith(n) || n.startsWith(name) ? 1 : distance(n, name)
      if (!best || d < best.d) best = { name: c.name, d }
    }
  }
  return best && best.d <= 3 ? best.name : undefined
}

export const completions = (prefix: string) => {
  const n = normalize(prefix)
  return n ? COMMANDS.filter((c) => c.name.toLowerCase().startsWith(n)).map((c) => c.name) : []
}
