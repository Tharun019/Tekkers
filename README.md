# Tekkers

A football training app: position-based training, level-based fitness, food and body tracking.

This is the UI pass. Every screen runs on sample data in `src/data/sample.js`; the real logic comes next.

## Run it

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Where things are

- `src/pages` one file per screen (Landing, Setup, Today, Plan, Food, Body, Progress)
- `src/components` shared pieces (glass cards, app shell, football animations)
- `src/lib/viz.js` the drawn exercise figures and drill diagrams
- `src/index.css` colours, fonts and the glass effect
