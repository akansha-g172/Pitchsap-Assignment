import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute"

const Landing = lazy(() => import("./pages/Landing/Landing"))
const Auth = lazy(() => import("./pages/Auth/Auth"))
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))
const Ideas = lazy(() => import("./pages/Ideas/Ideas"))
const IdeaValidation = lazy(() => import("./pages/IdeaValidation/IdeaValidation"))
const Opportunities = lazy(() => import("./pages/Opportunities/Opportunities"))
const Profile = lazy(() => import("./pages/Profile/Profile"))
const Chat = lazy(() => import("./pages/Chat/Chat"))

function PageFallback() {
  return (
    <div className="min-h-screen bg-pitchsap-dark flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-pitchsap-purple border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/ideas" element={<ProtectedRoute><Ideas /></ProtectedRoute>} />
        <Route path="/dashboard/idea/:id" element={<ProtectedRoute><IdeaValidation /></ProtectedRoute>} />
        <Route path="/dashboard/opportunities" element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  )
}

export default App