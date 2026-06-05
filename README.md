# tta — Paper Typewriter

A premium dark-mode paper typewriter built with **Next.js 14**, **TypeScript**, and pure CSS.

---

## ✦ Features

- **8 paper styles** — Cream, A4 White, Brown Kraft, Antique, Carton, Oil Paper, Note Book, Dots
- **Functional on-screen keyboard** — click any key to type on the paper
- **Physical keyboard support** — type naturally; the on-screen key lights up in sync
- **Paper picker dropdown** — click the colour chip in the toolbar to switch papers
- **Per-paper typography** — each paper has its own font, colour, and line style

---

## ✦ Project Structure

```
tta-typewriter/
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout, fonts, metadata
│   │   ├── page.tsx          ← Root page, wires components together
│   │   └── globals.css       ← ALL styles (heavily commented, 15 sections)
│   │
│   ├── components/
│   │   ├── Topbar.tsx        ← Header bar (brand + toolbar + dropdown anchor)
│   │   ├── PapersPanel.tsx   ← Paper picker dropdown (white card, 3-col grid)
│   │   ├── PaperCanvas.tsx   ← Large writing surface behind the keyboard
│   │   ├── Keyboard.tsx      ← Full keyboard (6 rows)
│   │   └── Key.tsx           ← Single key component
│   │
│   ├── hooks/
│   │   └── useTypewriter.ts  ← Central state hook (paper, shift, capslock, etc.)
│   │
│   ├── data/
│   │   ├── papers.ts         ← Paper options array (id, label, swatch, thumbClass)
│   │   └── keyboard.ts       ← All key row definitions (char, fn, special types)
│   │
│   └── types/
│       └── index.ts          ← Shared TypeScript types
│
├── public/                   ← Static assets (empty — add favicons here)
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## ✦ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## ✦ Deploy to Vercel

The easiest way is the Vercel CLI:

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).  
Vercel auto-detects Next.js — no configuration needed.

---

## ✦ How to Customise

### Add a new paper style

1. **`src/types/index.ts`** — Add the new id to the `PaperType` union:
   ```ts
   export type PaperType = "cream" | "a4white" | ... | "your-new-paper";
   ```

2. **`src/data/papers.ts`** — Add an entry to the `PAPERS` array:
   ```ts
   {
     id: "your-new-paper",
     label: "Your Paper",
     swatchColor: "#hexcolor",
     thumbClass: "pt-your-paper",
   }
   ```

3. **`src/app/globals.css`** — Add two CSS blocks:
   - Under **§6 PAPER THUMBNAILS** — thumbnail texture class `.pt-your-paper { ... }`
   - Under **§8 PAPER BACKGROUNDS** — full panel `.paper-panel--your-paper { ... }`
   - Under **§9 PAPER TYPOGRAPHY** — textarea style `.paper-panel--your-paper .paper-textarea { ... }`

### Change fonts

Edit `src/app/layout.tsx` — swap out the `next/font/google` imports and update the CSS variable names.  
Then reference them in `globals.css` under **§9 PAPER TYPOGRAPHY**.

### Change key colours / depth

All key visual tokens are CSS variables at the top of `globals.css` under **§1 CSS VARIABLES**:
```css
--key-top:  #303238;   /* top face gradient stop */
--key-mid:  #282a30;
--key-bot:  #24262b;   /* bottom face gradient stop */
```

---

## ✦ Tech Stack

| Layer       | Choice                  |
|-------------|-------------------------|
| Framework   | Next.js 14 (App Router) |
| Language    | TypeScript              |
| Styling     | Plain CSS (no Tailwind) |
| Fonts       | next/font/google        |
| Deployment  | Vercel (zero-config)    |
