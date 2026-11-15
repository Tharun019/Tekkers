import { useState } from 'react'
import { Droplets, Plus } from 'lucide-react'
import { Reveal, Card, Ring, Meter, Button, Segmented, PageHead } from '../components/ui.jsx'
import { food } from '../data/sample.js'

export default function Food() {
  const [meal, setMeal] = useState('After training')
  const [water, setWater] = useState(food.water.have)
  const { target: t, eaten: e } = food
  return (
    <>
      <PageHead title="Food" sub="Hit your protein, eat more carbs around training, and keep it food you actually like." />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <Card className="flex h-full flex-col items-center text-center">
            <Ring value={e.kcal} max={t.kcal} size={190} stroke={14} id="kcal">
              <div>
                <p className="font-display text-5xl font-bold tabular-nums">{e.kcal}</p>
                <p className="text-sm text-muted">of {t.kcal} kcal</p>
              </div>
            </Ring>
            <p className="mt-4 text-[15px] text-muted">{t.kcal - e.kcal} kcal left for today</p>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-5">
            <Meter label="Protein" value={e.protein} max={t.protein} unit="g" />
            <Meter label="Carbs" value={e.carbs} max={t.carbs} unit="g" />
            <Meter label="Fat" value={e.fat} max={t.fat} unit="g" />
            <div className="flex items-center justify-between gap-3 border-t border-line/80 pt-4">
              <p className="flex items-center gap-2 text-[15px]"><Droplets size={18} className="text-sky" /> <b className="tabular-nums">{water.toFixed(2)}</b> of {food.water.goal} L water</p>
              <Button variant="quiet" onClick={() => setWater(water + 0.25)}><Plus size={16} /> 250 ml</Button>
            </div>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-5">
        <Card>
          <h2 className="text-2xl font-bold">What did you eat?</h2>
          <label className="mt-4 block">
            <span className="sr-only">Describe your meal</span>
            <textarea rows={2} placeholder="2 chapati, dal, 1 bowl rice, 2 eggs" className="glass-quiet block w-full resize-none rounded-2xl px-4 py-3 text-base" />
          </label>
          <Button className="mt-3">Estimate and add</Button>
        </Card>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Today's log</h2>
            <ul className="mt-3">
              {food.log.map((f) => (
                <li key={f.name} className="flex items-center justify-between gap-4 border-t border-line/80 py-3 first:border-0">
                  <div><p className="font-medium">{f.name}</p><p className="text-sm text-muted">{f.when}</p></div>
                  <p className="shrink-0 text-right tabular-nums"><b>{f.kcal}</b> kcal<br /><span className="text-sm text-muted">{f.protein} g protein</span></p>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Ideas for you</h2>
            <div className="mt-4"><Segmented label="Meal" options={Object.keys(food.ideas)} value={meal} onChange={setMeal} /></div>
            <ul className="mt-4 space-y-2">
              {food.ideas[meal].map((i) => <li key={i} className="glass-quiet rounded-2xl px-4 py-3 text-[15px]">{i}</li>)}
            </ul>
          </Card>
        </Reveal>
      </div>
    </>
  )
}
