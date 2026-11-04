import { createContext, useContext } from 'react'

export interface TerminalApi {
  /** Run a command as if the user typed it. */
  run: (command: string) => void
  /** False when a component is rendered outside the terminal (e.g. on the site pages). */
  available: boolean
}

export const TerminalContext = createContext<TerminalApi>({ run: () => {}, available: false })

export const useTerminal = () => useContext(TerminalContext)
