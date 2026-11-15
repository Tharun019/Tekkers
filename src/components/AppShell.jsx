import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Flame, HeartPulse, LineChart, Sun } from 'lucide-react'
import { Wordmark } from './Ball.jsx'
import { player } from '../data/sample.js'

const tabs = [
  { to: 'today', label: 'Today', icon: Sun },
  { to: 'plan', label: 'Plan', icon: CalendarDays },
  { to: 'food', label: 'Food', icon: Flame },
  { to: 'body', label: 'Body', icon: HeartPulse },
  { to: 'progress', label: 'Progress', icon: LineChart },
]

function Tab({ to, label, icon: Icon, compact }) {
  return (
    <NavLink to={to} data-prox className="group relative block">
      {({ isActive }) => (
        <span className={`relative flex items-center ${compact ? 'flex-col gap-1 px-2 py-2 text-[11px]' : 'gap-3 px-4 py-3 text-[15px]'} rounded-2xl font-semibold transition ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}>
          {isActive && <motion.span layoutId={compact ? 'tab-m' : 'tab-d'} className="absolute inset-0 rounded-2xl bg-white shadow-[0_6px_20px_-8px_rgba(16,38,31,.25)]" transition={{ type: 'spring', duration: 0.5, bounce: 0.18 }} />}
          <Icon size={compact ? 20 : 19} className={`relative ${isActive ? 'text-pitch' : ''}`} />
          <span className="relative">{label}</span>
        </span>
      )}
    </NavLink>
  )
}

export default function AppShell() {
  const { pathname } = useLocation()
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 pb-28 pt-5 sm:px-6 md:pb-10 md:pt-8">
      <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col md:flex">
        <Link to="/" className="mb-8 px-2"><Wordmark /></Link>
        <nav aria-label="App sections" className="glass flex flex-col gap-1 rounded-3xl p-2">
          {tabs.map((t) => <Tab key={t.to} {...t} />)}
        </nav>
        <Link to="/setup" className="glass mt-auto flex items-center gap-3 rounded-3xl p-3">
          <span className="grad-bg grid h-10 w-10 place-items-center rounded-full font-display text-lg font-bold text-white">{player.name[0]}</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{player.name}</span>
            <span className="block text-xs text-muted">{player.level}</span>
          </span>
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="mb-6 flex items-center justify-between md:hidden">
          <Link to="/"><Wordmark /></Link>
          <Link to="/setup" aria-label="Your setup" className="grad-bg grid h-10 w-10 place-items-center rounded-full font-display text-lg font-bold text-white">{player.name[0]}</Link>
        </header>
        <AnimatePresence mode="wait">
          <motion.main key={pathname} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>

      <nav aria-label="App sections" className="glass fixed inset-x-3 bottom-3 z-20 grid grid-cols-5 rounded-3xl p-1.5 md:hidden">
        {tabs.map((t) => <Tab key={t.to} {...t} compact />)}
      </nav>
    </div>
  )
}
