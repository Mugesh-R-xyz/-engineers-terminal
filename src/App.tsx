import { Landing } from './components/Landing'
import { GrowthPage, StoryPage, ThinkingPage, WorkPage } from './components/Pages'
import { Terminal } from './components/Terminal'
import { navigate, useRoute } from './route'

export default function App() {
  const route = useRoute()
  switch (route) {
    case 'story':
      return <StoryPage />
    case 'work':
      return <WorkPage />
    case 'thinking':
      return <ThinkingPage />
    case 'growth':
      return <GrowthPage />
    case 'terminal':
      return (
        <div className="terminal-page">
          <Terminal onExit={() => navigate('home')} />
        </div>
      )
    default:
      return <Landing />
  }
}
