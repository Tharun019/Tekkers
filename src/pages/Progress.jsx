import { motion } from 'motion/react'
import { Reveal, Card, Button, PageHead } from '../components/ui.jsx'
import { progress, levels, player } from '../data/sample.js'

function Radar({ attrs }) {
  const C = 130, R = 92, n = attrs.length
  const pt = (i, r) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [C + Math.cos(a) * r, C + Math.sin(a) * r] }
  const ring = (f) => attrs.map((_, i) => pt(i, R * f).join(',')).join(' ')
  const shape = attrs.map((a, i) => pt(i, (R * a.v) / 10).join(',')).join(' ')
  return (
    <svg viewBox="0 0 260 260" className="mx-auto h-auto w-full max-w-xs" role="img" aria-label={'Fitness shape: ' + attrs.map((a) => `${a.name} ${a.v}`).join(', ')}>
      <defs><linearGradient id="rg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#0fa968" /><stop offset="1" stopColor="#2b6bff" /></linearGradient></defs>
      {[0.25, 0.5, 0.75, 1].map((f) => <polygon key={f} points={ring(f)} fill="none" stroke="#dfe8e4" strokeWidth="1.2" />)}
      {attrs.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="#dfe8e4" strokeWidth="1.2" /> })}
      <motion.polygon points={shape} fill="url(#rg)" fillOpacity=".28" stroke="url(#rg)" strokeWidth="2.5" strokeLinejoin="round"
        initial={{ scale: 0.2, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: '130px 130px' }} />
      {attrs.map((a, i) => { const [x, y] = pt(i, R + 22); return (
        <text key={a.name} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="#5c6f68">{a.name}</text>
      ) })}
    </svg>
  )
}

function Trend({ data, min = 5, max = 9 }) {
  const W = 520, H = 170, p = 14
  const x = (i) => p + (i / (data.length - 1)) * (W - 2 * p)
  const y = (v) => H - p - ((v - min) / (max - min)) * (H - 2 * p)
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const last = data.length - 1
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Score rising from ${data[0]} to ${data[last]}`}>
      <defs>
        <linearGradient id="tl" x1="0" x2="1"><stop offset="0" stopColor="#0fa968" /><stop offset="1" stopColor="#2b6bff" /></linearGradient>
        <linearGradient id="ta" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2b6bff" stopOpacity=".18" /><stop offset="1" stopColor="#2b6bff" stopOpacity="0" /></linearGradient>
      </defs>
      {[0, 1, 2].map((i) => <line key={i} x1={p} x2={W - p} y1={p + (i * (H - 2 * p)) / 2} y2={p + (i * (H - 2 * p)) / 2} stroke="#e6eeea" />)}
      <motion.path d={`${line} L${x(last)} ${H - p} L${x(0)} ${H - p} Z`} fill="url(#ta)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} />
      <motion.path d={line} fill="none" stroke="url(#tl)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      <motion.circle cx={x(last)} cy={y(data[last])} r="6" fill="#fff" stroke="#2b6bff" strokeWidth="3.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} />
    </svg>
  )
}

export default function Progress() {
  const weakest = [...progress.attrs].sort((a, b) => a.v - b.v)[0]
  return (
    <>
      <PageHead title="Progress" sub={`Marked against the ${player.level} standard for a ${player.position}.`} right={<Button>Log a retest</Button>} />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <Card className="h-full">
            <p className="text-sm text-muted">Fitness score</p>
            <p className="font-display text-8xl font-extrabold leading-none tabular-nums"><span className="grad-text">{progress.score.toFixed(1)}</span><span className="text-2xl font-medium text-muted"> of 10</span></p>
            <p className="mt-5 text-[15px] text-muted">Weakest area is <b className="text-ink">{weakest.name.toLowerCase()}</b>. Your plan adds extra work for it.</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line/80 pt-5">
              {[['Sessions', progress.week.sessions], ['Protein days', progress.week.protein], ['Avg sleep', progress.week.sleep]].map(([k, v]) => (
                <div key={k}><p className="font-display text-xl font-bold">{v}</p><p className="text-xs text-muted">{k}</p></div>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-3">
          <Card className="h-full"><h2 className="text-2xl font-bold">Your shape as a player</h2><Radar attrs={progress.attrs} /></Card>
        </Reveal>
      </div>

      <Reveal className="mt-5">
        <Card>
          <h2 className="text-2xl font-bold">Score over the last nine weeks</h2>
          <div className="mt-4"><Trend data={progress.trend} /></div>
        </Card>
      </Reveal>

      <Reveal className="mt-5">
        <Card>
          <h2 className="text-2xl font-bold">Same you, four standards</h2>
          <p className="mt-1 text-muted">The score drops as the target rises. That gap is what you train to close.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {levels.map((l) => (
              <div key={l.name} className={`rounded-2xl p-4 ${l.name === player.level ? 'bg-ink text-white' : 'glass-quiet'}`}>
                <p className="font-display text-4xl font-bold tabular-nums">{l.score.toFixed(1)}</p>
                <p className={`text-sm ${l.name === player.level ? 'text-white/75' : 'text-muted'}`}>{l.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </>
  )
}
