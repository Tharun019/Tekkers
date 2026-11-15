// Every position and the roles inside it.
// `from` is the lowest level that can pick the role: 1 Academy, 2 Pro, 3 World Class.
// Sunday League (0) picks positions only, so every role shows as locked there.
const wideBack = [
  { name: 'Defensive full-back', from: 1, what: 'Stays home, wins 1v1s, covers the centre-back.' },
  { name: 'Attacking full-back', from: 1, what: 'Overlaps and crosses, then recovers.' },
  { name: 'Wing-back', from: 2, what: 'Covers the whole flank in a back three or five.' },
  { name: 'Inverted full-back', from: 3, what: 'Steps into midfield when the team has the ball.' },
]
const wideMid = [
  { name: 'Wide midfielder', from: 1, what: 'Up and down the line, helps the full-back.' },
  { name: 'Wide playmaker', from: 2, what: 'Starts wide, drifts inside to create.' },
  { name: 'Defensive winger', from: 3, what: 'Presses high and tracks the opposing full-back.' },
]
const winger = [
  { name: 'Classic winger', from: 1, what: 'Hugs the line, beats the full-back, crosses.' },
  { name: 'Inside forward', from: 1, what: 'Cuts in on the stronger foot to shoot.' },
  { name: 'Inverted winger', from: 2, what: 'Drifts inside to link play and free the overlap.' },
  { name: 'Raumdeuter', from: 3, what: 'Ignores the ball, hunts for space in the box.' },
]

export const groups = [
  { name: 'Goalkeeper', positions: [
    { id: 'GK', name: 'Goalkeeper', roles: [
      { name: 'Shot-stopper', from: 1, what: 'Stays on the line, commands the box.' },
      { name: 'Sweeper keeper', from: 1, what: 'Comes out to clear balls played in behind.' },
      { name: 'Ball-playing keeper', from: 2, what: 'Starts attacks with short and long passing.' },
    ] },
  ] },
  { name: 'Defence', positions: [
    { id: 'RB', name: 'Right-back', roles: wideBack },
    { id: 'CB', name: 'Centre-back', roles: [
      { name: 'Stopper', from: 1, what: 'Steps out to win the ball early.' },
      { name: 'Cover defender', from: 1, what: 'Drops off and sweeps up behind.' },
      { name: 'Ball-playing defender', from: 2, what: 'Breaks lines with passes from the back.' },
      { name: 'Wide centre-back', from: 3, what: 'Outside defender in a back three who pushes on.' },
      { name: 'Libero', from: 3, what: 'Steps into midfield with the ball.' },
    ] },
    { id: 'LB', name: 'Left-back', roles: wideBack },
  ] },
  { name: 'Midfield', positions: [
    { id: 'CDM', name: 'Defensive mid', roles: [
      { name: 'Ball-winner', from: 1, what: 'Hunts the ball and breaks up play.' },
      { name: 'Holding midfielder', from: 1, what: 'Screens the defence and keeps it simple.' },
      { name: 'Deep-lying playmaker', from: 2, what: 'Runs the game with passing from deep.' },
      { name: 'Regista', from: 3, what: 'Free creator from deep, the team plays through you.' },
      { name: 'Half-back', from: 3, what: 'Drops between the centre-backs to build.' },
    ] },
    { id: 'CM', name: 'Central mid', roles: [
      { name: 'Box-to-box', from: 1, what: 'Defends one box, arrives in the other.' },
      { name: 'Playmaker', from: 1, what: 'Sets the tempo and finds the pass.' },
      { name: 'Mezzala', from: 2, what: 'Drifts into the half-space and attacks from there.' },
      { name: 'Carrilero', from: 3, what: 'Shuttles side to side, covers the flanks.' },
    ] },
    { id: 'CAM', name: 'Attacking mid', roles: [
      { name: 'Number 10', from: 1, what: 'Plays between the lines, final pass.' },
      { name: 'Shadow striker', from: 2, what: 'Runs beyond the striker to score.' },
      { name: 'Trequartista', from: 3, what: 'Total freedom to roam and create.' },
    ] },
    { id: 'RM', name: 'Right mid', roles: wideMid },
    { id: 'LM', name: 'Left mid', roles: wideMid },
  ] },
  { name: 'Attack', positions: [
    { id: 'RW', name: 'Right wing', roles: winger },
    { id: 'ST', name: 'Striker', roles: [
      { name: 'Target man', from: 1, what: 'Holds the ball up and wins headers.' },
      { name: 'Poacher', from: 1, what: 'Lives on the last defender, finishes chances.' },
      { name: 'Advanced forward', from: 2, what: 'Runs the channels and stretches the defence.' },
      { name: 'Pressing forward', from: 2, what: 'First defender, harries the back line.' },
      { name: 'False nine', from: 2, what: 'Drops into midfield to pull defenders out.' },
      { name: 'Second striker', from: 3, what: 'Plays off a partner, links and scores.' },
      { name: 'Complete forward', from: 3, what: 'Does all of it: holds, creates and finishes.' },
    ] },
    { id: 'LW', name: 'Left wing', roles: winger },
  ] },
]
export const levelNames = ['Sunday League', 'Academy', 'Pro', 'World Class']
