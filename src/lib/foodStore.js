import { useEffect, useState } from 'react'

// Today's food log and water, kept on this device so it survives a refresh.
// A new day starts empty.
const todayKey = () => {
  const d = new Date()
  return `tekkers.food.${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const read = () => {
  try { const v = JSON.parse(localStorage.getItem(todayKey())); if (v && Array.isArray(v.log)) return v } catch {}
  return { log: [], water: 0 }
}

export function useFoodDay() {
  const [day, setDay] = useState(read)
  useEffect(() => { try { localStorage.setItem(todayKey(), JSON.stringify(day)) } catch {} }, [day])

  const add = (items) => setDay((d) => ({ ...d, log: [...d.log, ...items.map((it, i) => ({ ...it, id: `${Date.now()}-${i}` }))] }))
  const remove = (id) => setDay((d) => ({ ...d, log: d.log.filter((x) => x.id !== id) }))
  const addWater = (ml) => setDay((d) => ({ ...d, water: Math.max(0, d.water + ml) }))

  const sum = (k) => Math.round(day.log.reduce((t, x) => t + (x[k] || 0), 0))
  const eaten = { kcal: sum('kcal'), protein: sum('protein'), carbs: sum('carbs'), fat: sum('fat') }
  return { log: day.log, water: day.water, eaten, add, remove, addWater }
}

export function mealByClock() {
  const h = new Date().getHours()
  return h < 11 ? 'Breakfast' : h < 16 ? 'Lunch' : h < 19 ? 'Snack' : 'Dinner'
}
