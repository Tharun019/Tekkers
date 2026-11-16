import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import ExerciseViz from '../components/ExerciseViz.jsx'
import { Reveal, Card, Tag, Ring, Meter, Button, PageHead } from '../components/ui.jsx'
import { player, session, food } from '../data/sample.js'
import { useFoodDay } from '../lib/foodStore.js'

const kindTone = (k) => (['Passing', 'First touch'].includes(k) ? 'green' : ['Speed', 'Agility', 'Jump power'].includes(k) ? 'blue' : 'plain')

function Exercise({ item, done, toggle }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-t border-line/80 py-4 first:border-0 first:pt-0 last:pb-0">
      <div className="flex items-center gap-4">
        <ExerciseViz id={item.id} label={item.name} className="w-24 shrink-0 sm:w-28" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className={`font-semibold ${done ? 'text-muted line-through' : ''}`}>{item.name}</p>
            <Tag tone={kindTone(item.kind)}>{item.kind}</Tag>
          </div>
          <p className="mt-0.5 text-[15px]">{item.dose}</p>
          {item.helps && <p className="text-sm text-muted">Helps you as {item.helps}</p>}
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-sky">
            How to do it <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <button onClick={toggle} aria-pressed={done} aria-label={`Mark ${item.name} as done`}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition ${done ? 'grad-bg border-transparent text-white' : 'border-line bg-white/60 text-transparent hover:border-pitch'}`}>
          <Check size={20} strokeWidth={3} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-[15px] text-muted">
            <span className="block pt-3 sm:pl-32">{item.how}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Today() {
  const all = session.blocks.flatMap((b) => b.items)
  const [done, setDone] = useState(['wu'])
  const [checkin, setCheckin] = useState({ sleep: 7.5, sore: 3.2, energy: 7.4 })
  const [showCheckin, setShowCheckin] = useState(false)
  const { eaten, water } = useFoodDay()
  const toggle = (id) => setDone(done.includes(id) ? done.filter((x) => x !== id) : [...done, id])
  const readiness = Math.round((3.5 * Math.min(1, checkin.sleep / 8) + 3.5 * (1 - checkin.sore / 10) + 3 * (checkin.energy / 10)) * 10) / 10

  return (
    <>
      <PageHead title={`Good to see you, ${player.name}`} sub={`${session.title}. ${session.when}.`} />
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <Card className="flex h-full flex-col items-center text-center">
            <Ring value={readiness} id="ready">
              <div>
                <p className="font-display text-5xl font-bold tabular-nums">{readiness.toFixed(1)}</p>
                <p className="text-xs text-muted">readiness</p>
              </div>
            </Ring>
            <p className="mt-4 text-[15px] text-muted">{readiness >= 6 ? 'You are good for the full session.' : 'Take it lighter today.'}</p>
            <Button variant="quiet" className="mt-4" onClick={() => setShowCheckin(!showCheckin)} aria-expanded={showCheckin}>
              {showCheckin ? 'Close check-in' : 'Update check-in'}
            </Button>
            <AnimatePresence initial={false}>
              {showCheckin && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full overflow-hidden text-left">
                  <div className="space-y-4 pt-5">
                    {[['sleep', 'Sleep (hours)', 12], ['sore', 'Soreness', 10], ['energy', 'Energy', 10]].map(([k, label, max]) => (
                      <label key={k} className="block text-sm font-medium">
                        <span className="flex justify-between">{label}<b className="tabular-nums">{checkin[k].toFixed(1)}</b></span>
                        <input type="range" min="0" max={max} step="0.1" value={checkin[k]} onChange={(e) => setCheckin({ ...checkin, [k]: +e.target.value })} />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-2">
          <Card className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted">Fuel today</p>
                <p className="font-display text-4xl font-bold tabular-nums">{eaten.kcal} <span className="text-lg font-medium text-muted">of {food.target.kcal} kcal</span></p>
              </div>
              <Button as={Link} to="/app/food" variant="quiet">Log food</Button>
            </div>
            <div className="glass-quiet rounded-2xl px-4 py-3">
              <p className="text-sm text-muted">Before training, 1 to 3 hours ahead</p>
              <p className="font-medium">Banana and peanut butter toast</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Meter label="Protein" value={eaten.protein} max={food.target.protein} unit="g" />
              <Meter label="Water" value={Math.round(water / 10) / 100} max={food.water.goal} unit="L" />
            </div>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-5">
        <Card>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-bold">Today's session</h2>
            <p className="text-[15px] text-muted"><b className="text-ink">{done.length}</b> of {all.length} done, about {session.mins} min</p>
          </div>
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-mist">
            <motion.div className="grad-bg h-full rounded-full" animate={{ width: `${(done.length / all.length) * 100}%` }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} />
          </div>
          {session.blocks.map((b) => (
            <section key={b.name} className="mt-7 first:mt-0">
              <h3 className="mb-3 text-xl font-bold">{b.name}</h3>
              <ul>{b.items.map((it) => <Exercise key={it.id} item={it} done={done.includes(it.id)} toggle={() => toggle(it.id)} />)}</ul>
            </section>
          ))}
        </Card>
      </Reveal>
    </>
  )
}
