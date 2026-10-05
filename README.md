# Sarthak Raju Solanke — 3D Developer Portfolio

An interactive 3D developer portfolio for **Sarthak Raju Solanke** (Computer Science undergraduate, B.Tech CSE expected 2027 at SCOE). Features dynamic React Three Fiber 3D scenes, physics simulations, an interactive chess engine bot, and an AI chat assistant strictly grounded on Sarthak's resume.

---

## 🚀 Tech Stack

- **Framework**: React 18 (TypeScript) + Vite
- **3D & Canvas**: Three.js, React Three Fiber (R3F v8), React Three Drei, Rapier 3D Physics
- **Animations**: GSAP (ScrollTrigger), Lenis Smooth Scrolling, React Fast Marquee
- **Interactive Chess Bot**: `chess.js` + minimax evaluation bot
- **AI Chat Assistant**: Google Gemini API via Vercel Serverless Function (`/api/chat.ts`)
- **Styling**: Vanilla CSS design system with CSS custom properties & glassmorphism
- **Hosting & Analytics**: Vercel Serverless Functions + Vercel Analytics & Speed Insights

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 2. Installation
```bash
git clone https://github.com/ssolanke22562/portfolio.git
cd portfolio
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create a `.env` file in the project root (see `.env.example`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🏗️ Production Build & Verification

```bash
# Type check and build bundle
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

---

## ☁️ Vercel Deployment

1. Push your code to GitHub.
2. Import the repository into **Vercel**.
3. Under **Settings > Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: `<Your Google Gemini API Key>`
4. Deploy! The `/api/chat` serverless function will automatically be provisioned, and client routing is handled via `vercel.json`.

---

## 📄 License & Attribution

- **Resume & Content**: © 2026 Sarthak Raju Solanke. All rights reserved.
- **Source Code**: MIT License.
- **Visual Design Reference**: Layout and interaction architecture inspired by `redoyanulhaque.me`.
