import { motion } from 'motion/react'

// A passing move played on loop: the one animated centrepiece of the landing page.
const P = [ [78, 232], [150, 118], [250, 206], [318, 98] ]
const GOAL = [388, 150]
const stops = [P[0], P[1], P[2], P[3], GOAL, GOAL, P[0]]
const times = [0, 0.18, 0.38, 0.58, 0.74, 0.9, 1]
const loop = { duration: 7, repeat: Infinity, ease: 'easeInOut', times }

export default function TacticsBoard() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label="Animated passing move across a pitch, ending in a goal">
      <defs>
        <linearGradient id="turf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0fa968" stopOpacity=".16" />
          <stop offset="1" stopColor="#2b6bff" stopOpacity=".14" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="388" height="288" rx="22" fill="url(#turf)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={6 + i * 64.6} y="6" width="32.3" height="288" fill="#fff" opacity=".22" />
      ))}
      <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
        <rect x="6" y="6" width="388" height="288" rx="22" />
        <path d="M394 70 H300 V230 H394" />
        <path d="M394 112 H352 V188 H394" />
        <path d="M300 118 A46 46 0 0 0 300 182" />
        <path d="M6 96 A56 56 0 0 1 6 204" />
      </g>
      <circle cx="326" cy="150" r="2.5" fill="#fff" />
      <path d={`M${P[0]} L${P[1]} L${P[2]} L${P[3]} L${GOAL}`} fill="none" stroke="#10261f" strokeOpacity=".28" strokeWidth="1.6" strokeDasharray="5 6" />
      {P.map((p, i) => (
        <motion.g key={i} animate={{ x: [0, i % 2 ? 7 : -6, 0], y: [0, i % 2 ? -5 : 6, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}>
          <circle cx={p[0]} cy={p[1]} r="13" fill="#2b6bff" opacity=".16" />
          <circle cx={p[0]} cy={p[1]} r="8" fill="#2b6bff" stroke="#fff" strokeWidth="2.5" />
        </motion.g>
      ))}
      {[[196, 150], [270, 120], [300, 196]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="7" fill="#fff" stroke="#10261f" strokeOpacity=".45" strokeWidth="2" />
      ))}
      <motion.g
        initial={{ x: P[0][0], y: P[0][1] }}
        animate={{ x: stops.map((s) => s[0]), y: stops.map((s) => s[1]), opacity: [1, 1, 1, 1, 1, 0, 0] }}
        transition={loop}
      >
        <circle r="6.5" fill="#fff" stroke="#10261f" strokeWidth="2" />
        <circle r="2.2" fill="#10261f" />
      </motion.g>
      <motion.circle cx={GOAL[0]} cy={GOAL[1]} r="10" fill="none" stroke="#0fa968" strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 0, 0, 1, 2.6, 0], opacity: [0, 0, 0, 0, 0.9, 0, 0] }} transition={loop} style={{ transformOrigin: `${GOAL[0]}px ${GOAL[1]}px` }} />
    </svg>
  )
}
