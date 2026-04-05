import { useNavigate } from 'react-router-dom'
import QuizEngine from '../components/QuizEngine'

const QUESTIONS = [
  {
    id: 'q1',
    title: 'How would you describe your overall frame?',
    tip: null,
    guide: null,
    options: [
      { value: 'petite',   label: 'Petite',   icon: null, imageSrc: null },
      { value: 'average',  label: 'Average',  icon: null, imageSrc: null },
      { value: 'tall',     label: 'Tall',     icon: null, imageSrc: null },
    ],
  },
  {
    id: 'q2',
    title: 'Where do you tend to carry most of your weight?',
    tip: 'Answer based on your natural body, not your goal shape.',
    guide: null,
    options: [
      { value: 'upper',   label: 'Upper body',          icon: null, imageSrc: null },
      { value: 'middle',  label: 'Evenly distributed',  icon: null, imageSrc: null },
      { value: 'lower',   label: 'Lower body',          icon: null, imageSrc: null },
    ],
  },
]

export default function BodyQuiz() {
  const navigate = useNavigate()

  function handleComplete(answers) {
    // Placeholder — will save to Supabase and navigate to results
    console.log('Body quiz answers:', answers)
    navigate('/home')
  }

  return (
    <QuizEngine
      questions={QUESTIONS}
      onComplete={handleComplete}
    />
  )
}
