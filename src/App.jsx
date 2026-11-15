import { Routes, Route, Navigate } from 'react-router-dom'
import Backdrop from './components/Backdrop.jsx'
import ProximityField from './components/ProximityField.jsx'
import AppShell from './components/AppShell.jsx'
import Landing from './pages/Landing.jsx'
import Setup from './pages/Setup.jsx'
import Today from './pages/Today.jsx'
import Plan from './pages/Plan.jsx'
import Food from './pages/Food.jsx'
import Body from './pages/Body.jsx'
import Progress from './pages/Progress.jsx'

export default function App() {
  return (
    <>
      <Backdrop />
      <ProximityField />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="today" replace />} />
          <Route path="today" element={<Today />} />
          <Route path="plan" element={<Plan />} />
          <Route path="food" element={<Food />} />
          <Route path="body" element={<Body />} />
          <Route path="progress" element={<Progress />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
