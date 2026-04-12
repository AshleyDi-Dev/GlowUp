import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './components/ProtectedLayout'
import PublicOnlyRoute from './components/PublicOnlyRoute'

import Welcome      from './pages/Welcome'
import Login        from './pages/Login'
import Signup       from './pages/Signup'
import Onboarding   from './pages/Onboarding'
import Home         from './pages/Home'
import AnalyzeHub   from './pages/AnalyzeHub'
import BodyQuiz     from './pages/BodyQuiz'
import FaceQuiz     from './pages/FaceQuiz'
import HairQuiz     from './pages/HairQuiz'
import ColorQuiz    from './pages/ColorQuiz'
import Profile      from './pages/Profile'
import Style        from './pages/Style'
import OutfitBuilder from './pages/OutfitBuilder'
import Saved        from './pages/Saved'
import ChoosePath   from './pages/ChoosePath'
import Measurements      from './pages/Measurements'
import Recommendations   from './pages/Recommendations'
import Tokens            from './pages/Tokens'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Welcome />} />
          <Route path="/tokens" element={<Tokens />} />

          {/* Public only — redirect to /home if already logged in */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login"  element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected — redirect to /login if not authenticated */}
          <Route element={<ProtectedLayout />}>
            <Route path="/onboarding"          element={<Onboarding />} />
            <Route path="/choose-path"         element={<ChoosePath />} />
            <Route path="/home"                element={<Home />} />
            <Route path="/analyze"             element={<AnalyzeHub />} />
            <Route path="/analyze/body"        element={<BodyQuiz />} />
            <Route path="/analyze/face"        element={<FaceQuiz />} />
            <Route path="/analyze/hair"        element={<HairQuiz />} />
            <Route path="/analyze/color"       element={<ColorQuiz />} />
            <Route path="/profile"             element={<Profile />} />
            <Route path="/style"               element={<Style />} />
            <Route path="/style/outfit-builder" element={<OutfitBuilder />} />
            <Route path="/saved"               element={<Saved />} />
            <Route path="/measurements"        element={<Measurements />} />
            <Route path="/recommendations"    element={<Recommendations />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
