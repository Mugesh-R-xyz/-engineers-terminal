import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { COMMANDS, completions, findCommand, normalize, suggest } from '../commands'
import { TerminalContext } from '../context'
import { Unknown, Welcome } from './Sections'

interface Entry {
  id: number
  command: string | null
  node: ReactNode
}

let nextId = 0
const welcomeEntry = (): Entry => ({ id: nextId++, command: null, node: <Welcome /> })

export function Terminal({ onExit }: { onExit?: () => void }) {
  const [entries, setEntries] = useState<Entry[]>(() => [welcomeEntry()])
  const [value, setValue] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const shouldScroll = useRef(false)

  const run = useCallback((raw: string) => {
    const input = raw.trim()
    if (!input) return
    setPast((p) => [...p, input])
    setCursor(null)
    setValue('')
    shouldScroll.current = true
    const cmd = findCommand(input)
    if (cmd?.name === 'clear') {
      setEntries([])
      return
    }
    const node = cmd ? cmd.render() : <Unknown input={input} suggestion={suggest(input)} />
    setEntries((e) => [...e, { id: nextId++, command: input, node }])
  }, [])

  const reset = useCallback(() => {
    setEntries([welcomeEntry()])
    setPast([])
    setCursor(null)
    setValue('')
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (shouldScroll.current) {
      endRef.current?.scrollIntoView({ block: 'end' })
      shouldScroll.current = false
    }
  }, [entries])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!past.length) return
      const i = cursor === null ? past.length - 1 : Math.max(0, cursor - 1)
      setCursor(i)
      setValue(past[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === null) return
      const i = cursor + 1
      if (i >= past.length) {
        setCursor(null)
        setValue('')
      } else {
        setCursor(i)
        setValue(past[i])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const m = completions(value)
      if (m.length >= 1) setValue(m[0])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    }
  }

  const api = useMemo(() => ({ run, available: true }), [run])
  const hint = completions(value)[0]
  const ghost = hint && normalize(value) !== hint ? hint.slice(normalize(value).length) : ''

  return (
    <TerminalContext.Provider value={api}>
      <div className="window">
        <header className="titlebar">
          {onExit && (
            <a className="back" href="#/" onClick={(e) => { e.preventDefault(); onExit() }}>
              &larr; Main page
            </a>
          )}
          <span className="dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="title">mugesh@engineers-terminal: ~</span>
          <button type="button" className="reset" onClick={reset} title="Clear history and show the welcome screen">
            reset
          </button>
        </header>

        <main className="screen" onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
        }}>
          {entries.map((e) => (
            <div key={e.id} className="entry">
              {e.command !== null && (
                <div className="echo">
                  <span className="prompt">$</span> {e.command}
                </div>
              )}
              <div className="output">{e.node}</div>
            </div>
          ))}

          <div className="input-row">
            <label htmlFor="cmd" className="prompt">$</label>
            <div className="input-wrap">
              <span className="mirror" aria-hidden="true">
                {value}
                <span className="ghost">{ghost}</span>
                <span className="cursor" />
              </span>
              <input
                id="cmd"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-label="Terminal command input"
              />
            </div>
          </div>
          <div ref={endRef} />
        </main>

        <nav className="chips" aria-label="Suggested commands">
          {COMMANDS.map((c) => (
            <button key={c.name} type="button" onClick={() => run(c.name)}>
              {c.name}
            </button>
          ))}
        </nav>
      </div>
    </TerminalContext.Provider>
  )
}
