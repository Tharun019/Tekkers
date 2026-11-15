import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Card({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`glass rounded-3xl p-5 sm:p-6 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Tag({ children, tone = 'plain' }) {
  const tones = {
    plain: 'bg-mist text-muted',
    green: 'bg-pitch/12 text-pitch',
    blue: 'bg-sky/12 text-sky',
    amber: 'bg-amber-500/15 text-amber-700',
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

export function Button({ children, variant = 'primary', className = '', as: Comp = 'button', ...rest }) {
  const styles = {
    primary: 'grad-bg text-white shadow-[0_10px_30px_-10px_rgba(43,107,255,.6)] hover:brightness-105',
    quiet: 'glass-quiet text-ink hover:bg-white/80',
  }
  return (
    <Comp data-prox className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Comp>
  )
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="glass-quiet inline-flex flex-wrap rounded-full p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={`relative min-h-9 rounded-full px-3.5 text-sm font-semibold transition ${value === o ? 'text-white' : 'text-muted hover:text-ink'}`}
        >
          {value === o && <motion.span layoutId={`seg-${label}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }} />}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  )
}

export function Ring({ value, max = 10, size = 148, stroke = 12, children, id = 'ring' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const frac = Math.min(1, value / max)
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#0fa968" />
            <stop offset="1" stopColor="#2b6bff" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e6eeea" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - frac) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}

export function Meter({ label, value, max, unit }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted"><b className="text-ink">{value}</b> of {max} {unit}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-mist">
        <motion.div className="grad-bg h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease }} />
      </div>
    </div>
  )
}

export function PageHead({ title, sub, right }) {
  return (
    <Reveal y={16} className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {sub && <p className="mt-2 max-w-xl text-muted">{sub}</p>}
      </div>
      {right}
    </Reveal>
  )
}
