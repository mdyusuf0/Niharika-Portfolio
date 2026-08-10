# Niharika · Creative Portfolio 🎬

A premium, cinematic portfolio website built for **Niharika — Video Editor, Motion Designer & Graphic Artist**.

This website features custom particle interactions, smooth page transitions, software-themed visual indicators, a custom bento-grid video showcase with a responsive media player modal, and an interactive creative timeline showing her production process.

---

## ✨ Features
1. **Interactive Canvas Overlay**: Cursor follow particle trailer and ambient glowing background spotlight.
2. **Bento Grid Video Showcase**: Renders 11 high-retention video case study that autoplay muted on hover and open in an unmuted fullscreen custom player.
3. **Pulsing Availability Badge**: Attracts client inquiries dynamically in the Hero section.
4. **Software Progress Bars**: Styled custom badges with official Adobe software icons.
5. **Creative Workflow Path**: Custom drawn scroll path animation guiding visitors through her production steps: Discover, Storyboard, Edit, Motion, and Deliver.
6. **Downloadable PDF Resume**: Dynamic download integration directly from the UI.
7. **Social & CTA Links**: Direct link integration for Instagram Let's Talk CTA.

---

## 🛠️ Stack & Technologies
* **Framework**: React.js + Vite (for lightning-fast production bundles)
* **Styling**: TailwindCSS & Vanilla CSS
* **Animations**: Framer Motion & AOS (Animate On Scroll)
* **Icons**: Inline Custom SVGs

---

## 📁 Folder Structure
```bash
├── public/                 # Static assets
│   ├── videos/             # Client showcase mp4 files (11 videos)
│   ├── Niharika_Resume.pdf # Compiled client resume
│   └── favicon.svg         # Monogram logo N
├── src/
│   ├── assets/             # Raw media assets (Avatar, Hero video)
│   ├── components/         # Modular layout sections
│   ├── data/
│   │   └── portfolioData.js # Centralized client config
│   ├── App.jsx             # Main router & layout builder
│   └── main.jsx            # Entrypoint
```

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build Production Bundle
```bash
npm run build
```
The compiled static website will be generated in the `/dist` directory, ready to be hosted on Vercel, Netlify, or GitHub Pages.

---

## ⚙️ Configuration & Customization
To update client details, bio text, or project listings in the future, simply edit:
👉 `src/data/portfolioData.js`

All links, titles, descriptions, taglists, and emails will automatically update across the entire codebase!
