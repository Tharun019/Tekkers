import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Droplets, Minus, Plus, X } from 'lucide-react'
import { Reveal, Card, Ring, Meter, Button, Segmented, PageHead } from '../components/ui.jsx'
import { food } from '../data/sample.js'
import { parseMeal } from '../lib/foods.js'
import { useFoodDay, mealByClock } from '../lib/foodStore.js'

const meals = ['Breakfast', 'Lunch', 'Snack', 'Dinner']
const inputCls = 'glass-quiet mt-1.5 block min-h-12 w-full rounded-2xl px-4 text-base font-normal text-ink'

export default function Food() {
  const { log, water, eaten, add, remove, addWater } = useFoodDay()
  const [idea, setIdea] = useState('After training')
  const [text, setText] = useState('')
  const [when, setWhen] = useState(mealByClock)
  const [result, setResult] = useState(null) // { added, kcal, missed: [] }
  const [manual, setManual] = useState({ name: '', kcal: '', protein: '' })
  const t = food.target
  const left = t.kcal - eaten.kcal
  const goalMl = food.water.goal * 1000

  const estimate = () => {
    if (!text.trim()) { setResult({ empty: true }); return }
    const parsed = parseMeal(text)
    const hits = parsed.filter((p) => !p.miss)
    const missed = parsed.filter((p) => p.miss).map((p) => p.raw)
    if (hits.length) add(hits.map(({ name, serving, kcal, protein, carbs, fat }) => ({ name, serving, when, kcal, protein, carbs, fat })))
    setResult({ added: hits.length, kcal: hits.reduce((s, h) => s + h.kcal, 0), missed })
    setManual({ name: missed[0] || '', kcal: '', protein: '' })
    setText('')
  }
  const addManual = () => {
    const kcal = parseFloat(manual.kcal)
    if (!manual.name.trim() || !(kcal >= 0)) return
    add([{ name: manual.name.trim(), when, kcal: Math.round(kcal), protein: parseFloat(manual.protein) || 0, carbs: 0, fat: 0 }])
    const rest = (result?.missed || []).filter((m) => m !== manual.name)
    setResult(rest.length ? { ...result, missed: rest } : null)
    setManual({ name: rest[0] || '', kcal: '', protein: '' })
  }

  return (
    <>
      <PageHead title="Food" sub="Hit your protein, eat more carbs around training, and keep it food you actually like." />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <Card className="flex h-full flex-col items-center text-center">
            <Ring value={eaten.kcal} max={t.kcal} size={190} stroke={14} id="kcal">
              <div>
                <p className="font-display text-5xl font-bold tabular-nums">{eaten.kcal}</p>
                <p className="text-sm text-muted">of {t.kcal} kcal</p>
              </div>
            </Ring>
            <p className="mt-4 text-[15px] text-muted">{left >= 0 ? `${left} kcal left for today` : `${-left} kcal over your target`}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-5">
            <Meter label="Protein" value={eaten.protein} max={t.protein} unit="g" />
            <Meter label="Carbs" value={eaten.carbs} max={t.carbs} unit="g" />
            <Meter label="Fat" value={eaten.fat} max={t.fat} unit="g" />
            <div className="border-t border-line/80 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[15px]"><Droplets size={18} className="text-sky" /> <b className="tabular-nums">{(water / 1000).toFixed(2)}</b> of {food.water.goal} L water</p>
                <div className="flex gap-2">
                  <Button variant="quiet" onClick={() => addWater(-250)} disabled={water === 0} aria-label="Remove 250 ml of water" className="disabled:opacity-40"><Minus size={16} /> 250 ml</Button>
                  <Button variant="quiet" onClick={() => addWater(250)} aria-label="Add 250 ml of water"><Plus size={16} /> 250 ml</Button>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
                <motion.div className="h-full rounded-full bg-sky" animate={{ width: `${Math.min(100, (water / goalMl) * 100)}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-5">
        <Card>
          <h2 className="text-2xl font-bold">What did you eat?</h2>
          <div className="mt-4"><Segmented label="Meal" options={meals} value={when} onChange={setWhen} /></div>
          <label className="mt-3 block">
            <span className="sr-only">Describe your meal</span>
            <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); estimate() } }}
              placeholder="2 chapati, dal, 1 bowl rice, 2 eggs" className="glass-quiet block w-full resize-none rounded-2xl px-4 py-3 text-base" />
          </label>
          <Button className="mt-3" onClick={estimate}>Estimate and add</Button>

          <AnimatePresence initial={false}>
            {result && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden" aria-live="polite">
                <div className="pt-4 text-[15px]">
                  {result.empty && <p className="text-muted">Type what you ate first, for example "2 chapati, dal, 1 bowl rice".</p>}
                  {result.added > 0 && <p><b>Added {result.added} {result.added === 1 ? 'item' : 'items'}</b>, about {result.kcal} kcal, to {when.toLowerCase()}.</p>}
                  {result.missed?.length > 0 && (
                    <div className="glass-quiet mt-3 rounded-2xl p-4">
                      <p>Not in the food list yet: <b>{result.missed.join(', ')}</b>. Add it with your own numbers.</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
                        <label className="text-sm font-semibold text-muted">Food<input className={inputCls} value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} /></label>
                        <label className="text-sm font-semibold text-muted">kcal<input className={inputCls} type="number" inputMode="decimal" value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} /></label>
                        <label className="text-sm font-semibold text-muted">Protein (g)<input className={inputCls} type="number" inputMode="decimal" value={manual.protein} onChange={(e) => setManual({ ...manual, protein: e.target.value })} /></label>
                        <Button variant="quiet" onClick={addManual}>Add</Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-4 text-sm text-muted">Estimates use typical servings, so treat them as a guide. Amounts work too: "150g chicken", "half bowl rice".</p>
        </Card>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Today's log</h2>
            {log.length === 0 ? (
              <p className="mt-3 text-muted">Nothing logged yet today. Add your first meal in the box.</p>
            ) : (
              <ul className="mt-3">
                <AnimatePresence initial={false}>
                  {log.map((f) => (
                    <motion.li key={f.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-line/80 first:border-0">
                      <div className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0"><p className="font-medium">{f.name}</p><p className="text-sm text-muted">{f.when}{f.serving ? `, ${f.serving} each` : ''}</p></div>
                        <div className="flex shrink-0 items-center gap-2">
                          <p className="text-right tabular-nums"><b>{f.kcal}</b> kcal<br /><span className="text-sm text-muted">{f.protein} g protein</span></p>
                          <button onClick={() => remove(f.id)} aria-label={`Remove ${f.name}`} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-mist hover:text-ink"><X size={16} /></button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <h2 className="text-2xl font-bold">Ideas for you</h2>
            <div className="mt-4"><Segmented label="Idea for" options={Object.keys(food.ideas)} value={idea} onChange={setIdea} /></div>
            <ul className="mt-4 space-y-2">
              {food.ideas[idea].map((i) => (
                <li key={i}>
                  <button onClick={() => setText(i)} className="glass-quiet w-full rounded-2xl px-4 py-3 text-left text-[15px] hover:bg-white">{i}</button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">Tap an idea to put it in the box, then edit the amounts.</p>
          </Card>
        </Reveal>
      </div>
    </>
  )
}
