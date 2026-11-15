import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ExerciseViz from '../components/ExerciseViz.jsx'
import { Reveal, Card, Tag, Segmented, PageHead } from '../components/ui.jsx'
import { week, levels } from '../data/sample.js'

const dot = { rest: 'bg-line', hard: 'bg-ink', sharp: 'bg-sky', light: 'bg-pitch/50', match: 'grad-bg' }

export default function Plan() {
  const [sel, setSel] = useState(week.findIndex((d) => d.today))
  const [level, setLevel] = useState('Academy')
  const day = week[sel]
  const L = levels.find((l) => l.name === level)
  return (
    <>
      <PageHead title="This week" sub="Built backwards from match day. Hardest early, lighter as the game gets close." />
      <Reveal>
        <Card className="!p-3">
          <div role="tablist" aria-label="Days of the week" className="grid grid-cols-7 gap-1">
            {week.map((d, i) => (
              <button key={d.d} role="tab" aria-selected={sel === i} onClick={() => setSel(i)}
                className={`relative rounded-2xl px-1 py-3 text-center transition ${sel === i ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                {sel === i && <motion.span layoutId="day" className="absolute inset-0 rounded-2xl bg-white shadow-[0_6px_20px_-8px_rgba(16,38,31,.25)]" transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }} />}
                <span className="relative block text-sm font-semibold">{d.d}</span>
                <span className={`relative mx-auto mt-2 block h-2 w-2 rounded-full ${dot[d.tone]}`} />
                <span className="relative mt-2 hidden text-xs sm:block">{d.type}</span>
              </button>
            ))}
          </div>
        </Card>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-5">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-3xl font-bold">{day.label}</h2>
              <div className="flex gap-2">
                {day.today && <Tag tone="blue">Today</Tag>}
                {day.mins > 0 && <Tag>{day.mins} min</Tag>}
              </div>
            </div>
            {day.items ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {day.items.map((it) => (
                  <li key={it.id} className="flex items-center gap-4">
                    <ExerciseViz id={it.id} label={it.name} className="w-24 shrink-0" />
                    <div>
                      <p className="font-semibold">{it.name}</p>
                      <p className="text-[15px] text-muted">{it.kind}, {it.dose}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 max-w-lg text-muted">
                {day.tone === 'match'
                  ? 'Eat your main meal 3 to 4 hours before kick-off, do the full warm-up, and refuel straight after.'
                  : 'No training. Sleep well, eat to your targets and take an easy walk if you feel stiff.'}
              </p>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <Reveal className="mt-5">
        <Card>
          <h2 className="text-2xl font-bold">Your target</h2>
          <p className="mb-4 mt-1 text-muted">Change it and the week, session length and food targets follow.</p>
          <Segmented label="Target level" options={levels.map((l) => l.name)} value={level} onChange={setLevel} />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div><p className="font-display text-3xl font-bold">{L.days.split(' ')[0]}</p><p className="text-sm text-muted">training days a week</p></div>
            <div><p className="font-display text-3xl font-bold">{L.mins} min</p><p className="text-sm text-muted">a session</p></div>
            <div><p className="font-display text-3xl font-bold tabular-nums">{L.score.toFixed(1)}</p><p className="text-sm text-muted">your score at this level</p></div>
          </div>
        </Card>
      </Reveal>
    </>
  )
}
