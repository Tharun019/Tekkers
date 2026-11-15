import { useEffect } from 'react'

// Buttons swell as the pointer gets close, and the ones around lean in towards it,
// like the surface pulling in around something you press. On phones the same thing
// happens around your finger while it is down.
const REACH = 120
const SELECTOR = 'button:not([disabled]), [data-prox]'

export default function ProximityField() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let point = null
    let release = 0

    const apply = () => {
      raf = 0
      document.querySelectorAll(SELECTOR).forEach((el) => {
        const w = el.offsetWidth, h = el.offsetHeight
        if (!w) return
        const box = el.getBoundingClientRect()
        const cx = box.left + box.width / 2 - (el._tx || 0)
        const cy = box.top + box.height / 2 - (el._ty || 0)
        let f = 0, tx = 0, ty = 0
        if (point) {
          const dx = point.x - cx, dy = point.y - cy
          const gap = Math.hypot(Math.max(Math.abs(dx) - w / 2, 0), Math.max(Math.abs(dy) - h / 2, 0))
          f = Math.max(0, 1 - gap / REACH) ** 2
          const len = Math.hypot(dx, dy) || 1
          const lean = 8 * f * Math.min(1, gap / 20)
          tx = (dx / len) * lean
          ty = (dy / len) * lean
        }
        if (f < 0.004) {
          if (el._on) { el.style.transform = ''; el.style.zIndex = ''; el._on = false; el._tx = el._ty = 0 }
          return
        }
        const grow = Math.min(0.1, 11 / Math.max(w, h)) * f
        el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${(1 + grow).toFixed(3)})`
        el.style.zIndex = f > 0.6 ? '2' : ''
        el._on = true; el._tx = tx; el._ty = ty
      })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const set = (e) => { clearTimeout(release); point = { x: e.clientX, y: e.clientY }; schedule() }
    const clear = () => { point = null; schedule() }

    const move = (e) => { if (e.pointerType !== 'touch' || e.buttons || e.pressure > 0) set(e) }
    const down = (e) => { if (e.pointerType === 'touch') set(e) }
    const up = (e) => { if (e.pointerType === 'touch') { clearTimeout(release); release = setTimeout(clear, 160) } }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    window.addEventListener('pointercancel', up, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    document.addEventListener('mouseleave', clear)
    window.addEventListener('blur', clear)
    return () => {
      cancelAnimationFrame(raf); clearTimeout(release)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('scroll', schedule)
      document.removeEventListener('mouseleave', clear)
      window.removeEventListener('blur', clear)
    }
  }, [])
  return null
}
