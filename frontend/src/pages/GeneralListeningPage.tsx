import ListeningPracticePage from './ListeningPracticePage'
import type { ListeningLevel } from '../api/client'

const GENERAL_LISTENING_LEVELS: { id: ListeningLevel; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'elementary', label: 'Elementary' },
  { id: 'pre_intermediate', label: 'Pre-Intermediate' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'upper_intermediate', label: 'Upper-Intermediate' },
]

export default function GeneralListeningPage() {
  return (
    <ListeningPracticePage
      title="General Listening"
      subtitle="Listen to everyday dialogues and answer comprehension questions."
      scopeLevels={GENERAL_LISTENING_LEVELS.map(l => l.id)}
      levelPills={GENERAL_LISTENING_LEVELS}
      backHref="/dashboard"
    />
  )
}
