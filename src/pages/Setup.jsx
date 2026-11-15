import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Wordmark, BallIcon } from '../components/Ball.jsx'
import { Card, Button } from '../components/ui.jsx'
import { Lock } from 'lucide-react'
import { levels } from '../data/sample.js'
import { groups, levelNames } from '../data/positions.js'

const steps = ['About you', 'Your target', 'Positions', 'Fitness', 'Equipment', 'Body']
const equipment = ['Football', 'Cones', 'Wall', 'Goal', 'Training partner', 'Dumbbells', 'Barbell', 'Pull-up bar', 'Bands', 'Skipping rope', 'Foam roller', 'Full gym']
const areas = ['Knee', 'Ankle', 'Hamstring', 'Groin', 'Lower back', 'Shoulder']

function Chips({ options, picked, toggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = picked.includes(o)
        return (
          <button key={o} onClick={() => toggle(o)} aria-pressed={on}
            className={`min-h-11 rounded-full px-4 text-[15px] font-medium transition ${on ? 'bg-ink text-white' : 'glass-quiet text-ink hover:bg-white'}`}>
            {o}
          </button>
        )
      })}
    </div>
  )
}
function Field({ label, ...rest }) {
  return (
    <label className="block text-sm font-semibold text-muted">
      {label}
      <input className="glass-quiet mt-1.5 block min-h-12 w-full rounded-2xl px-4 text-base font-normal text-ink" {...rest} />
    </label>
  )
}
function Slider({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between text-[15px] font-medium">
        {label}<span className="font-display text-xl font-bold tabular-nums">{value.toFixed(1)}</span>
      </span>
      <input type="range" min="0" max="10" step="0.1" value={value} onChange={(e) => onChange(+e.target.value)} />
    </label>
  )
}

function Positions({ level, picks, setPicks }) {
  const [open, setOpen] = useState(picks[0]?.id ?? null)
  const find = (id) => picks.find((p) => p.id === id)
  const tapPosition = (id) => {
    if (!find(id)) { setPicks([...picks, { id, role: null }]); setOpen(id) }
    else if (open !== id) setOpen(id)
    else { setPicks(picks.filter((p) => p.id !== id)); setOpen(null) }
  }
  const setRole = (id, role) => setPicks(picks.map((p) => (p.id === id ? { ...p, role: p.role === role ? null : role } : p)))
  return (
    <div>
      <p className="mb-5 text-muted">
        Pick every position you play. The first one counts as your main position.
        {level === 0 ? ' Roles inside a position open from Academy upwards.' : ' Tap a picked position to choose your role in it.'}
      </p>
      <div className="space-y-5">
        {groups.map((g) => {
          const shown = g.positions.find((p) => p.id === open && find(p.id))
          return (
            <section key={g.name}>
              <h2 className="mb-2 font-sans text-sm font-semibold tracking-normal text-muted">{g.name}</h2>
              <div className="flex flex-wrap gap-2">
                {g.positions.map((p) => {
                  const pick = find(p.id)
                  const main = picks[0]?.id === p.id
                  return (
                    <button key={p.id} onClick={() => tapPosition(p.id)} aria-pressed={!!pick} aria-expanded={open === p.id && !!pick}
                      className={`min-h-12 rounded-2xl px-4 text-left ${pick ? 'bg-ink text-white' : 'glass-quiet text-ink hover:bg-white'} ${open === p.id && pick ? 'ring-2 ring-sky ring-offset-2 ring-offset-white' : ''}`}>
                      <span className="flex items-center gap-2 text-[15px] font-semibold">
                        {p.id}
                        <span className={`font-normal ${pick ? 'text-white/70' : 'text-muted'}`}>{p.name}</span>
                        {main && <span className="grad-bg rounded-full px-2 py-0.5 text-[11px] font-semibold text-white">Main</span>}
                      </span>
                      {pick?.role && level >= p.roles.find((r) => r.name === pick.role).from && <span className="block text-xs text-white/70">{pick.role}</span>}
                    </button>
                  )
                })}
              </div>
              <AnimatePresence initial={false}>
                {shown && (
                  <motion.div key={shown.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="glass-quiet mt-3 rounded-3xl p-4">
                      <p className="mb-3 text-sm font-semibold">Roles for {shown.name.toLowerCase()}</p>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {shown.roles.map((r) => {
                          const locked = level < r.from
                          const on = !locked && find(shown.id).role === r.name
                          return (
                            <li key={r.name}>
                              <button disabled={locked} onClick={() => setRole(shown.id, r.name)} aria-pressed={on}
                                className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left ${on ? 'bg-sky text-white' : locked ? 'cursor-not-allowed bg-mist/60 text-muted' : 'bg-white/80 hover:bg-white'}`}>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[15px] font-semibold">{r.name}</span>
                                  <span className={`block text-sm ${on ? 'text-white/80' : 'text-muted'}`}>{r.what}</span>
                                </span>
                                {locked && (
                                  <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-muted">
                                    <Lock size={12} /> {levelNames[r.from]}
                                  </span>
                                )}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default function Setup() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState(1)
  const [pos, setPos] = useState([{ id: 'CM', role: 'Box-to-box' }, { id: 'CAM', role: null }])
  const [eq, setEq] = useState(['Football', 'Cones', 'Wall'])
  const [sore, setSore] = useState(['Knee'])
  const [fit, setFit] = useState({ stamina: 6, speed: 6.5, touch: 7 })
  const tog = (list, set) => (v) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])
  const pct = (step / (steps.length - 1)) * 100

  const body = [
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" defaultValue="Tharun" />
      <Field label="Age" type="number" defaultValue="21" />
      <Field label="Height (cm)" type="number" defaultValue="176" />
      <Field label="Weight (kg)" type="number" defaultValue="70" />
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-semibold text-muted">Where you eat</p>
        <Chips options={['India', 'USA']} picked={['India']} toggle={() => {}} />
      </div>
    </div>,
    <div className="grid gap-3 sm:grid-cols-2">
      {levels.map((l, i) => (
        <button key={l.name} onClick={() => setLevel(i)} aria-pressed={level === i}
          className={`rounded-3xl p-5 text-left transition ${level === i ? 'bg-ink text-white' : 'glass-quiet hover:bg-white'}`}>
          <span className="font-display text-2xl font-bold">{l.name}</span>
          <span className={`mt-1 block text-[15px] ${level === i ? 'text-white/75' : 'text-muted'}`}>{l.line}</span>
          <span className="mt-3 block text-sm font-semibold">{l.days}</span>
        </button>
      ))}
    </div>,
    <Positions level={level} picks={pos} setPicks={setPos} />,
    <div className="space-y-6">
      <Slider label="How long can you play flat out before fading?" value={fit.stamina} onChange={(v) => setFit({ ...fit, stamina: v })} />
      <Slider label="Speed compared with players around you" value={fit.speed} onChange={(v) => setFit({ ...fit, speed: v })} />
      <Slider label="First touch" value={fit.touch} onChange={(v) => setFit({ ...fit, touch: v })} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Max push-ups" type="number" defaultValue="28" />
        <Field label="Max pull-ups" type="number" defaultValue="6" />
        <Field label="30 m sprint (s)" type="number" defaultValue="4.7" />
      </div>
    </div>,
    <div>
      <p className="mb-4 text-muted">Sessions only use what you pick. No equipment still works.</p>
      <Chips options={equipment} picked={eq} toggle={tog(eq, setEq)} />
    </div>,
    <div>
      <p className="mb-4 text-muted">Tap anything that hurts or has been injured. Exercises that load it get swapped out.</p>
      <Chips options={areas} picked={sore} toggle={tog(sore, setSore)} />
      <p className="mt-5 text-sm text-muted">Tekkers cannot diagnose injuries. Pain that is severe or keeps coming back needs a physio.</p>
    </div>,
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-6 sm:px-6">
      <header className="mb-8 flex items-center justify-between">
        <Link to="/"><Wordmark /></Link>
        <span className="text-sm font-medium text-muted">Step {step + 1} of {steps.length}</span>
      </header>
      <div className="relative mx-4 mb-8 h-8" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-line" />
        <motion.div className="grad-bg absolute left-0 top-1/2 h-0.5 -translate-y-1/2" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} />
        <motion.div className="absolute top-1/2 -ml-3.5 -translate-y-1/2" animate={{ left: `${pct}%`, rotate: step * 180 }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}>
          <BallIcon size={28} />
        </motion.div>
      </div>
      <Card className="!p-6 sm:!p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
            <h1 className="mb-6 text-4xl font-bold">{steps[step]}</h1>
            {body[step]}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between">
          <Button variant="quiet" onClick={() => (step ? setStep(step - 1) : nav('/'))}>Back</Button>
          <Button onClick={() => (step < steps.length - 1 ? setStep(step + 1) : nav('/app/today'))} className="px-7">
            {step < steps.length - 1 ? 'Next' : 'Build my plan'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
