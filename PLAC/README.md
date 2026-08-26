# Peace Love and Art Community — Website

A production-ready React + Tailwind CSS website for the Peace Love and Art Community.

## Tech Stack
- **React 18** + TypeScript
- **Vite** (dev server & build)
- **Tailwind CSS v3** (custom organic theme)
- **Framer Motion** (scroll animations, page transitions)
- **Google Fonts** — Playfair Display + DM Sans

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.tsx        — Sticky nav, mobile-responsive hamburger
    Hero.tsx          — Full-screen hero with animated bowl SVG
    PainSection.tsx   — Problem/pain agitation (3 cards)
    BenefitsSection.tsx — 6 benefits grid + impact banner
    HowItWorks.tsx    — 4-step process + offerings grid
    Testimonials.tsx  — Interactive carousel + grid (6 testimonials)
    About.tsx         — Origin story + team cards
    CTASection.tsx    — Form with submission state
    Footer.tsx        — Multi-column footer
  App.tsx             — Composes all sections
  main.tsx            — React entry point
  index.css           — Tailwind base + globals
```

## Colour Palette

| Token        | Value     | Usage                        |
|--------------|-----------|------------------------------|
| `primary`    | `#2D4A3E` | Deep forest green — headings, navbar, CTAs |
| `secondary`  | `#C4956A` | Warm terracotta gold — accents, CTAs |
| `accent`     | `#F5ECD7` | Soft parchment cream — text on dark |
| `background` | `#FAF7F2` | Warm off-white page background |
| `text`       | `#1A2E26` | Deep earthy dark — body text |
| `muted`      | `#6B7F74` | Subdued sage — secondary text |
| `sage`       | `#7A9E8E` | Mid-tone sage — decorative |
| `cream`      | `#FDF9F3` | Card backgrounds |
| `warm`       | `#E8D5B7` | Warm beige — borders, blobs |

## Customisation

- **Copy/content**: Edit text directly in each component file
- **Colours**: Adjust in `tailwind.config.js` under `theme.extend.colors`
- **Fonts**: Change Google Fonts import in `index.html` and update `tailwind.config.js`
- **Form**: Replace the `handleSubmit` handler in `CTASection.tsx` with your backend/email service (Mailchimp, Resend, Formspree, etc.)