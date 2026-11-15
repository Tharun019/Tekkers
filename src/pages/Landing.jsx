import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { Wordmark, BallIcon } from '../components/Ball.jsx'
import TacticsBoard from '../components/TacticsBoard.jsx'
import ExerciseViz from '../components/ExerciseViz.jsx'
import { Reveal, Card, Button, Tag, Meter } from '../components/ui.jsx'
import { levels, week } from '../data/sample.js'

function Nav() {
  return (
    <header className="sticky top-3 z-30 mx-auto max-w-6xl px-4 sm:px-6">
      <div className="glass flex items-center justify-between rounded-full py-2 pl-5 pr-2">
        <Wordmark />
        <nav aria-label="Page sections" className="hidden items-center gap-7 text-[15px] font-medium text-muted sm:flex">
          <a href="#what" className="hover:text-ink">What you get</a>
          <a href="#week" className="hover:text-ink">Your week</a>
          <a href="#levels" className="hover:text-ink">Levels</a>
        </nav>
        <Button as={Link} to="/setup">Start setup</Button>
      </div>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const boardY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const boardR = useTransform(scrollYProgress, [0, 1], [0, -3])
  return (
    <section ref={ref} className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
      <div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.8rem,7vw,5.2rem)] font-extrabold leading-[0.95]">
          Train for the player you want to be.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-lg text-muted">
          Tell Tekkers where you play and how far you want to go. It plans your training, your food and your recovery around that, one day at a time.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to="/setup" className="px-7">Start setup</Button>
          <Button as={Link} to="/app/today" variant="quiet" className="px-7">Look inside the app</Button>
        </motion.div>
      </div>

      <motion.div style={{ y: boardY, rotate: boardR }} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative">
        <div className="glass rounded-[2rem] p-3"><TacticsBoard /></div>
        <motion.div className="glass absolute -left-3 bottom-10 rounded-2xl px-4 py-3 sm:-left-8" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <p className="text-xs text-muted">Readiness today</p>
          <p className="font-display text-2xl font-bold">7.8 <span className="text-sm font-medium text-muted">out of 10</span></p>
        </motion.div>
        <motion.div className="glass absolute -right-2 top-8 rounded-2xl px-4 py-3 sm:-right-6" animate={{ y: [0, 9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <p className="text-xs text-muted">Next session</p>
          <p className="font-semibold">Speed work, 60 min</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function What() {
  return (
    <section id="what" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">Four things, kept simple.</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Card className="h-full">
            <h3 className="text-2xl font-bold">Drills picked for where you play</h3>
            <p className="mt-2 max-w-md text-muted">Pick every position you play. Each drill shows what it trains and which of your roles it helps.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[['p_tri', 'Pass and move'], ['sp_acc', 'Acceleration'], ['lo_sq', 'Leg strength']].map(([id, n]) => (
                <figure key={id}>
                  <ExerciseViz id={id} label={n} className="w-full" />
                  <figcaption className="mt-2 text-sm font-medium">{n}</figcaption>
                </figure>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-2xl font-bold">Food you already eat</h3>
            <p className="mt-2 text-muted">Type your meal the way you would say it. India and USA food lists to start.</p>
            <div className="glass-quiet mt-6 rounded-2xl px-4 py-3 text-[15px]">2 chapati, dal, 1 bowl rice</div>
            <div className="mt-4 space-y-4">
              <Meter label="Energy" value={700} max={2680} unit="kcal" />
              <Meter label="Protein" value={26} max={126} unit="g" />
            </div>
          </Card>
        </Reveal>
        <Reveal className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-2xl font-bold">It works around pain</h3>
            <p className="mt-2 text-muted">Mark a sore knee and the plan swaps out what loads it.</p>
            <div className="mt-6 space-y-3 text-[15px]">
              <div className="flex items-center justify-between"><span className="text-muted line-through">Skater hops</span><Tag tone="amber">Knee, mild</Tag></div>
              <div className="flex items-center justify-between"><span className="font-semibold">Single-leg glute bridge</span><Tag tone="green">Swapped in</Tag></div>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-3">
          <Card className="flex h-full flex-wrap items-center gap-6">
            <div className="min-w-56 flex-1">
              <h3 className="text-2xl font-bold">A score that moves with your target</h3>
              <p className="mt-2 text-muted">The same tests are marked harder as you aim higher, so you always know the gap.</p>
            </div>
            <div className="flex items-end gap-3">
              {levels.map((l, i) => (
                <div key={l.name} className="text-center">
                  <motion.div className="grad-bg mx-auto w-10 rounded-t-xl" initial={{ height: 0 }} whileInView={{ height: l.score * 13 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} style={{ opacity: 1 - i * 0.16 }} />
                  <p className="mt-2 font-display text-lg font-bold tabular-nums">{l.score}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}

function Week() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const left = useTransform(p, [0, 1], ['0%', '100%'])
  const rotate = useTransform(p, [0, 1], [0, 720])
  const tone = { rest: 'bg-mist text-muted', hard: 'bg-ink text-white', sharp: 'bg-sky text-white', light: 'bg-pitch/15 text-pitch', match: 'grad-bg text-white' }
  return (
    <section id="week" ref={ref} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">Your week is built backwards from match day.</h2>
        <p className="mt-4 max-w-xl text-muted">The hardest work sits early in the week. Then it tapers so you arrive fresh.</p>
      </Reveal>
      <Card className="mt-10 overflow-hidden">
        <div className="relative mx-4 mb-8 mt-4 h-10">
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-line" />
          <motion.div className="grad-bg absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded" style={{ width: left }} />
          <motion.div className="absolute top-1/2 -ml-4 -translate-y-1/2" style={{ left, rotate }}><BallIcon size={32} /></motion.div>
        </div>
        <ol className="grid grid-cols-7 gap-1.5 sm:gap-3">
          {week.map((d, i) => (
            <Reveal key={d.d} delay={i * 0.05} y={14}>
              <li className="list-none text-center">
                <p className="mb-2 text-sm font-semibold text-muted">{d.d}</p>
                <div className={`grid min-h-16 place-items-center rounded-2xl px-1 text-xs font-semibold sm:text-sm ${tone[d.tone]}`}>{d.type}</div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Card>
    </section>
  )
}

function Levels() {
  return (
    <section id="levels" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">Pick how far you want to take it.</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {levels.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.07}>
            <Card className="flex h-full flex-col">
              <div className="mb-5 flex gap-1.5" aria-hidden>
                {[0, 1, 2, 3].map((k) => <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? 'grad-bg' : 'bg-line'}`} />)}
              </div>
              <h3 className="text-2xl font-bold">{l.name}</h3>
              <p className="mt-2 flex-1 text-muted">{l.line}</p>
              <p className="mt-5 text-sm font-semibold">{l.days}</p>
              <p className="text-sm text-muted">About {l.mins} min a session</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <What />
        <Week />
        <Levels />
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
          <Reveal>
            <Card className="flex flex-wrap items-center justify-between gap-6 !p-8 sm:!p-12">
              <div>
                <h2 className="text-4xl font-bold sm:text-5xl">Six questions, then your first session.</h2>
                <p className="mt-3 text-muted">Setup takes about two minutes.</p>
              </div>
              <Button as={Link} to="/setup" className="px-8">Start setup</Button>
            </Card>
          </Reveal>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 text-sm text-muted sm:px-6">
        Tekkers is a training aid, not medical advice.
      </footer>
    </>
  )
}
