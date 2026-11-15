import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Reveal, Card, Button, Tag, PageHead } from '../components/ui.jsx'
import { body } from '../data/sample.js'

const names = ['Fine', 'Mild', 'Moderate', 'Severe']
const tone = ['bg-mist text-muted', 'bg-amber-400/25 text-amber-800', 'bg-orange-500/25 text-orange-800', 'bg-red-500/20 text-red-700']

export default function Body() {
  const [areas, setAreas] = useState(body.areas)
  const [pain, setPain] = useState(4)
  const cycle = (i) => setAreas(areas.map((a, k) => (k === i ? { ...a, level: (a.level + 1) % 4 } : a)))
  const active = areas.filter((a) => a.level > 0)
  return (
    <>
      <PageHead title="Body" sub="Tell Tekkers what hurts. It keeps exercises away from that area until it settles." />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Card className="h-full">
            <h2 className="text-2xl font-bold">How is each area?</h2>
            <p className="mt-1 text-muted">Tap an area to change it.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {areas.map((a, i) => (
                <button key={a.name} onClick={() => cycle(i)} className={`rounded-2xl px-3 py-4 text-left transition hover:brightness-95 ${tone[a.level]}`}>
                  <span className="block font-semibold text-ink">{a.name}</span>
                  <span className="text-sm">{names[a.level]}</span>
                </button>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center gap-2"><ShieldCheck className="text-pitch" size={22} /><h2 className="text-2xl font-bold">Plan is avoiding</h2></div>
            {active.length ? (
              <ul className="mt-4 space-y-2">
                {active.map((a) => (
                  <li key={a.name} className="flex items-center justify-between">
                    <span className="font-medium">{a.name}</span><Tag tone="amber">{names[a.level]}</Tag>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-4 text-muted">Nothing. Every exercise is available.</p>}
            <p className="mt-5 text-sm text-muted">Mild removes jumps and hard cuts for that area. Moderate and severe remove everything that loads it.</p>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Something hurt?</h2>
            <label className="mt-4 block text-sm font-semibold text-muted">
              Where
              <select className="glass-quiet mt-1.5 block min-h-12 w-full rounded-2xl px-4 text-base font-normal text-ink">
                {areas.map((a) => <option key={a.name}>{a.name}</option>)}
              </select>
            </label>
            <label className="mt-4 block">
              <span className="flex items-baseline justify-between text-[15px] font-medium">How bad<span className="font-display text-2xl font-bold tabular-nums">{pain.toFixed(1)}</span></span>
              <input type="range" min="0" max="10" step="0.1" value={pain} onChange={(e) => setPain(+e.target.value)} />
            </label>
            <Button className="mt-4">Save and adjust my plan</Button>
            {pain >= 7 && <p className="mt-3 text-sm font-medium text-red-700">Pain this strong needs a physio before you load it again.</p>}
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Recent pain</h2>
            <ul className="mt-3">
              {body.log.map((p) => (
                <li key={p.date} className="flex items-center justify-between border-t border-line/80 py-3 first:border-0">
                  <div><p className="font-medium">{p.area}</p><p className="text-sm text-muted">During {p.during.toLowerCase()}</p></div>
                  <p className="text-right tabular-nums"><b>{p.score.toFixed(1)}</b> of 10<br /><span className="text-sm text-muted">{p.date}</span></p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Tekkers cannot diagnose injuries. If pain keeps coming back, see a physio.</p>
          </Card>
        </Reveal>
      </div>
    </>
  )
}
