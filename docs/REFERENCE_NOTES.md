# Reference Website Inspection & Architectural Notes
**Reference Source**: [https://www.redoyanulhaque.me/](https://www.redoyanulhaque.me/)
**Target Portfolio**: Sarthak Raju Solanke (Computer Science Undergraduate, B.Tech CSE expected 2027)

---

## 1. Visual & Theme Design System

### Color Palette
- **Background**: `#050508` (Deep void black with subtle purple undertone)
- **Secondary Dark**: `#0c0a14` / `#120f24` (Glass card backgrounds, elevated surfaces)
- **Primary Accent**: `#8b5cf6` / `#a855f7` / `#c084fc` (Neon violet/purple glow)
- **Secondary Accent**: `#38bdf8` / `#60a5fa` (Cyan/blue highlights for interactive nodes)
- **Primary Text**: `#ffffff` (High contrast pure white for headlines)
- **Secondary Text**: `#cbd5e1` / `#94a3b8` (Muted silver/lavender for descriptions)
- **Border / Accents**: `rgba(168, 85, 247, 0.25)` with bracket decorations `[ ]`

### Typography
- **Headings**: Modern sans-serif (e.g., *Outfit* / *Inter* / *Syne*), uppercase tracking (`letter-spacing: 0.05em` to `0.15em`), weights 700–900.
- **Body / Subtitles**: Clean sans-serif (*Inter* / *Space Grotesk*), weight 400–500.
- **Code / Badges / Logo**: Monospace (*JetBrains Mono* / *Fira Code*), e.g. `SS />`.

---

## 2. Page Hierarchy & Section Breakdown

1. **Preloader Screen**:
   - Clean dark backdrop with neon violet percentage counter (`0%` to `100%`).
   - Smooth GSAP fade-out transition upon canvas and asset initialization.

2. **Fixed Elements**:
   - **Header / Navigation**:
     - Left: Logo `SS />` (links to top).
     - Center: Mail link `sarthaksolanke71@gmail.com`.
     - Right: Smooth anchor links `ABOUT`, `CAREER`, `WORK`, `SKILLS`, `CHESS`, `CONTACT`.
   - **Fixed Social Dock (Left)**:
     - Vertical icons: GitHub, LinkedIn, Instagram, Email.
   - **Fixed Resume Tab (Right)**:
     - Vertical tab button `RESUME ↗` opening or downloading Sarthak's resume PDF.
   - **Interactive Custom Cursor**:
     - Glowing violet trailing dot with smooth lerp physics.

3. **Hero Section (Interactive 3D Avatar Scene)**:
   - Split hero headline:
     - Left: `"Hello! I'm SARTHAK SOLANKE"`
     - Right: `"FULL-STACK DEVELOPER & AI BUILDER"`
   - Interactive 3D Model in React Three Fiber (R3F):
     - Stylized 3D developer avatar bust.
     - Smooth head & eye cursor tracking with dampening.
     - Soft ambient + point lighting + vibrant purple rim light.

4. **About & "What I Do" (Pose / Scroll Transitions)**:
   - Bio extracted strictly from Sarthak's resume:
     - B.Tech CSE (expected 2027) at Sanjivani College of Engineering (SCOE), CGPA 7.8/10.
     - VP of Cyber Security Club (18+ members, 150+ students CTF/workshops).
   - "What I Do" futuristic bracket cards `[ ]`:
     - **Full-Stack & MERN**: Scalable web apps, React, Node.js, Express, MongoDB, Supabase, REST APIs.
     - **AI & Intelligent Systems**: Google Gemini API, LLM integrations, prompt engineering, ML workflows.
     - **IoT & Embedded Systems**: ESP32, ESP8266, Raspberry Pi 4, sensors, smart automation.

5. **Career & Experience Timeline**:
   - 3-column vertical timeline with neon purple glowing center axis:
     - **Persevex**: AI/ML Engineer Intern (3 Months). ML model optimization, AI capabilities integration.
     - **Unprof.Ai**: AI Intern (1 Month). LLM evaluation, prompt engineering workflows.
     - **Deloitte**: Data Analytics Virtual Experience (Forage). Raw dataset extraction, business visualization.
     - **JPMorgan Chase & Co.**: Quantitative Research Virtual Experience (Forage). Mathematical modeling, quantitative trading strategies.

6. **Works / Featured Projects**:
   - Interactive project showcase cards with live/repo modal placeholders:
     1. **Nexus AI**: MERN Stack + Google Gemini API (Text prompts to visual architectures).
     2. **Medi-4-U**: Medicine Redistribution Platform (HTML/CSS/JS, Supabase, 100+ medicine listings, role-based auth).
     3. **AquaGuard**: Hostel Wastewater Management System (IoT, ESP8266, YF-S201 flow sensor).
     4. **Smart Walking Stick for the Visually Impaired**: Assistive navigation (Raspberry Pi 4, ESP32, YOLOv8 Nano, OCR, Voice alerts).
     5. **Dental Clinic Website**: Centre For Advance Dentistry client website (appointments, patient stories).

7. **Tech Stack & Skills Matrix (with Rapier 3D Physics)**:
   - Grouped strictly by resume categories:
     - Programming Languages: C, C++, Java, Python, SQL
     - Web Development: HTML, CSS, JavaScript, React.js, Node.js, Express.js, REST APIs, MERN Stack
     - Databases: MongoDB, MySQL, Supabase
     - IoT & Embedded: ESP32, ESP8266, Raspberry Pi, Sensor Integration
     - AI & Data: Google Gemini API, Microsoft Power BI, Microsoft Excel, Data Visualization
     - Core Concepts: DSA, OOP, DBMS, OS, Computer Networks, Cybersecurity (CTF), Agile Development
     - Tools & Platforms: Git, GitHub, Google Workspace
   - Interactive 3D bouncy/draggable physics ball simulation (Rapier physics) + fast-marquee pill strips.

8. **Leadership, Education & Achievements**:
   - Education cards: SCOE B.Tech (CGPA 7.8), Rajiv Gandhi Senior College HSC (74%), Padmashri Shankar Bapu Apengaokar SSC (85%).
   - Leadership: Vice President CSC, Lead Anchor SARC & EDC.
   - Achievements: 8th Rank HackIndia Spark-12 (National Top 10), 1st Prize Brains & Bots, HackerRank 5-Star (SQL, Java, Python, C++, Problem Solving), Certifications.

9. **Interactive Chess Arena (Stockfish.js Worker + Chess.js)**:
   - Interactive 3D/2D board, AI bot with selectable difficulty (Easy, Medium, Hard / Grandmaster), move highlights, sound feedback, game state evaluation.

10. **AI Chatbot Assistant (Sarthak Solanke AI Assistant)**:
    - Floating bottom-right chat bubble with glowing badge.
    - Modal chat window with animated message bubbles and suggested prompts.
    - Powered by `/api/chat.ts` (Google Gemini API via serverless function, strictly grounded on Sarthak's resume).

11. **Contact & Footer**:
    - Action CTAs: `Play Chess With Me ♟️` and `Get In Touch ✉️`.
    - Direct contact items: `sarthaksolanke71@gmail.com`, `+91 93591 08321`, Kopargaon, Maharashtra, India.
    - Social links with diagonal arrows: LinkedIn ↗, GitHub ↗, Instagram ↗.
    - Copyright: `"Designed & Developed for Sarthak Raju Solanke © 2026"`.

12. **Mobile Adaptation (390px Viewport)**:
    - Automatic fallback for 3D canvas on mobile/low-power devices to maintain 60fps and fast loading.
    - Responsive stacked column layouts.
    - Touch-optimized chess board and chat widget drawer.
