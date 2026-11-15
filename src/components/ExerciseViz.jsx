import { useEffect, useRef } from 'react'
import { vizInner, period } from '../lib/viz.js'

// Animated drawing of one exercise or drill. Only animates while on screen.
export default function ExerciseViz({ id, label, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    svg.innerHTML = vizInner(id, 0, true)
    if (still) return
    let raf = 0, last = 0, visible = false
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(svg)
    const tick = (now) => {
      if (visible && now - last > 40) {
        last = now
        const per = period(id)
        svg.innerHTML = vizInner(id, (now % per) / per, false)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [id])
  return <svg ref={ref} viewBox="0 0 120 96" role="img" aria-label={label ? `How to do: ${label}` : 'Exercise drawing'} className={`rounded-2xl bg-white/70 ring-1 ring-ink/5 ${className}`} />
}
