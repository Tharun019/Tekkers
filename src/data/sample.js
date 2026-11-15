// Sample data for the UI pass. Real logic replaces this later.
export const player = { name: 'Tharun', level: 'Academy', position: 'CM: box-to-box', also: ['CAM', 'CDM'] }

export const levels = [
  { name: 'Sunday League', line: 'Play for fun and get fitter.', days: '3 sessions + game', mins: 45, score: 8.1 },
  { name: 'Academy', line: 'Serious amateur, pushing for a first team.', days: '4 sessions + game', mins: 60, score: 7.3 },
  { name: 'Pro', line: 'Train like it is your job.', days: '5 sessions + match', mins: 75, score: 5.9 },
  { name: 'World Class', line: 'The full routine of a top professional.', days: '5 days, 2 doubles + match', mins: 90, score: 4.9 },
]

const ex = (id, name, kind, dose, helps, how) => ({ id, name, kind, dose, helps, how })

export const session = {
  title: 'Speed and position work',
  when: '2 days before your match',
  mins: 60,
  blocks: [
    { name: 'Warm-up', items: [ex('wu', 'Dynamic warm-up', 'Warm-up', '15 min', '', 'Jog, hip openers, side shuffles, squats, lunges, then three build-up runs.')] },
    { name: 'Speed and agility', items: [
      ex('sp_acc', 'Acceleration sprints', 'Speed', '6 x 15 m, 60 s rest', 'CM, CAM', 'Lean forward and drive the first three steps hard. Walk back and rest fully.'),
      ex('ag_505', '5-10-5 shuttle', 'Agility', '5 reps', 'CAM, CDM', 'Start in the middle. Sprint 5 m, touch, 10 m back across, touch, 5 m to finish.'),
      ex('pl_sk', 'Skater hops', 'Jump power', '3 x 8 each side', '', 'Leap sideways from one leg to the other and hold the landing for a second.'),
    ] },
    { name: 'Position work', items: [
      ex('p_tri', 'Pass and move triangle', 'Passing', '4 x 2 min', 'CM, CDM', 'Pass, then sprint to the next cone. Check your shoulder before every pass.'),
      ex('t_turn', 'Receive on the half-turn', 'First touch', '3 x 10 each side', 'CM, CAM', 'Open your body and take the ball across you with the back foot.'),
    ] },
    { name: 'Cool-down', items: [
      ex('st_ham', 'Hamstring stretch', 'Stretch', '40 s each leg', '', 'Hinge at the hips with a flat back until you feel it behind the thigh.'),
      ex('st_quad', 'Quad and hip-flexor stretch', 'Stretch', '40 s each leg', '', 'Half-kneeling, tuck the pelvis and push the hips forward.'),
    ] },
  ],
}

export const week = [
  { d: 'Mon', type: 'Rest', label: 'Rest day', mins: 0, tone: 'rest' },
  { d: 'Tue', type: 'Strength', label: 'Strength and technique', mins: 60, tone: 'hard',
    items: [ex('lo_gob', 'Goblet squat', 'Leg strength', '4 x 8'), ex('po_bridge', 'Single-leg glute bridge', 'Hamstrings and glutes', '3 x 12'), ex('up_push', 'Push-ups', 'Upper body', '3 x 12'), ex('co_plank', 'Front plank', 'Core', '3 x 45 s')] },
  { d: 'Wed', type: 'Rest', label: 'Rest day', mins: 0, tone: 'rest' },
  { d: 'Thu', type: 'Endurance', label: 'Endurance and passing', mins: 60, tone: 'hard',
    items: [ex('p_wall', 'Two-touch wall passes', 'Passing', '3 x 60 s'), ex('en_44', '4 x 3 min intervals', 'Endurance', '3 min jog between'), ex('co_dead', 'Dead bug', 'Core', '3 x 10')] },
  { d: 'Fri', type: 'Speed', label: 'Speed and position work', mins: 60, tone: 'sharp', today: true,
    items: [ex('sp_acc', 'Acceleration sprints', 'Speed', '6 x 15 m'), ex('ag_505', '5-10-5 shuttle', 'Agility', '5 reps'), ex('p_tri', 'Pass and move triangle', 'Passing', '4 x 2 min')] },
  { d: 'Sat', type: 'Activation', label: 'Light activation', mins: 35, tone: 'light',
    items: [ex('sp_react', 'Reaction starts', 'Speed', '6 x 5 m'), ex('t_juggle', 'Juggling ladder', 'First touch', '2 x 2 min'), ex('st_calf', 'Calf stretch', 'Stretch', '40 s each')] },
  { d: 'Sun', type: 'Match', label: 'Match day', mins: 90, tone: 'match' },
]

export const food = {
  target: { kcal: 2680, protein: 126, carbs: 315, fat: 89 },
  eaten: { kcal: 1540, protein: 71, carbs: 188, fat: 49 },
  water: { have: 1.75, goal: 3.1 },
  log: [
    { name: 'Oats cooked in milk, banana', when: 'Breakfast', kcal: 375, protein: 13 },
    { name: '2 chapati, dal, rice, curd', when: 'Lunch', kcal: 700, protein: 26 },
    { name: '2 boiled eggs, peanuts', when: 'Snack', kcal: 326, protein: 20 },
    { name: 'Banana', when: 'Before training', kcal: 105, protein: 1 },
  ],
  ideas: {
    'Before training': ['Banana and peanut butter toast', '2 idli, light on chutney', 'Small bowl of curd rice'],
    'After training': ['Chicken, rice and dal', 'Milk or whey shake with a banana', 'Egg curry with rice'],
    Dinner: ['Grilled chicken or fish, roti and sabzi', 'Khichdi with curd', 'Roti, dal and mixed veg'],
  },
}

export const body = {
  areas: [
    { name: 'Knee', level: 1 }, { name: 'Ankle', level: 0 }, { name: 'Hamstring', level: 0 }, { name: 'Groin', level: 0 },
    { name: 'Lower back', level: 0 }, { name: 'Shoulder', level: 0 }, { name: 'Quad', level: 0 }, { name: 'Calf', level: 0 },
  ],
  log: [
    { area: 'Knee', score: 3.5, during: 'Skater hops', date: '12 Nov' },
    { area: 'Calf', score: 2.0, during: 'Acceleration sprints', date: '6 Nov' },
  ],
}

export const progress = {
  score: 7.3,
  attrs: [
    { name: 'Speed', v: 7.3 }, { name: 'Stamina', v: 7.4 }, { name: 'Strength', v: 7.5 }, { name: 'Agility', v: 6.3 }, { name: 'Technique', v: 5.2 },
  ],
  trend: [6.4, 6.5, 6.5, 6.8, 6.9, 7.0, 7.0, 7.2, 7.3],
  readiness: [6.8, 7.4, 5.9, 8.1, 7.7, 6.2, 7.8],
  week: { sessions: '3 of 4', protein: '5 of 7', sleep: '7.4 h' },
}
