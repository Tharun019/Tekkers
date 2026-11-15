import { motion } from 'motion/react'

export function BallIcon({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#10261f" strokeWidth="2.5" />
      <path d="M24 14l9 6.5-3.4 10.6H18.4L15 20.5z" fill="#10261f" />
      <path d="M24 14V3M33 20.5l10-4M29.6 31.1l6.6 9M18.4 31.1l-6.6 9M15 20.5l-10-4" stroke="#10261f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function SpinningBall({ size = 28 }) {
  return (
    <motion.span className="inline-block" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
      <BallIcon size={size} />
    </motion.span>
  )
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
      <SpinningBall size={26} />
      Tekkers
    </span>
  )
}
