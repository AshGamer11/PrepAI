# PrepAI — AI Mock Interview & Feedback Assistant
**Bennett University | B.Tech 5th Semester | Prompt Engineering Mini-Project**  
**Problem Pool ID:** C10 (Mock interview question and feedback tool)  
**Total Assessment Marks:** 30 Marks  
**Current Assessment:** Milestone 2 (12 Marks) — Completed

---

## 🚀 Overview
PrepAI is a full-stack, applied AI mock interview platform that simulates realistic technical and behavioral hiring committee interviews. Powered by Gemini 1.5 prompt chains and custom anti-leniency rubrics, PrepAI provides real-time scoring, STAR framework adherence checking, diagnostic feedback, and 100-point benchmark answers.

---

## 🛠️ Project Structure & Architecture
```
PrepAI/
├── docs/                                  # Milestone 2 Assessed Documents
│   ├── MILESTONE_2_TECHNICAL_REPORT.md    # Technical Synopsis & Business Model Canvas (BMC)
│   ├── PROMPT_EXPERIMENTATION_LOG.md      # A/B Prompt Experiments & Leniency Analysis
│   ├── PILOT_RUN_TEST_CASES.md            # Live Demonstration Matrix & Test Logs
│   └── VIDEO_DEMO_SCRIPT.md               # 90–150s Reel Walkthrough Script & Storyboard
├── server/                                # Node.js Express Backend
│   ├── prompts.js                         # Production Prompt Architectures & Rubrics
│   └── server.js                          # REST API Endpoints & Gemini Inference Orchestrator
├── src/                                   # React 19 Frontend (Vite + Tailwind CSS)
│   ├── components/
│   │   └── Sidebar.jsx                    # Navigation Sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx                  # Interactive Dashboard & Session Configurator
│   │   ├── Interview.jsx                  # Live Split-Screen Interview Console
│   │   └── Feedback.jsx                   # Cumulative Performance & Rubric Report
│   ├── App.jsx                            # React Router Configuration
│   └── index.css                          # Custom Dark Neon Theme & Base Styles
├── .env.example                           # Environment Template
├── package.json                           # Dependencies & Scripts
└── tailwind.config.js                     # Tailwind Theme Configurations
```

---

## ⚡ How to Run Locally

### 1. Start Both Frontend & Backend (One Command)
```bash
npm run dev:all
```
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### 2. Live Cloud vs. Local Offline Engine
- **Cloud Mode:** Click the "Gemini API Key" button on the dashboard or add `GEMINI_API_KEY=your_key` to `.env` to run live Google Gemini 1.5 Flash inferences.
- **Offline / Zero-Key Mode:** If no key is entered, PrepAI automatically switches to its built-in rubric engine so the entire application can be tested immediately with zero setup hurdles!

---

## 📊 Milestone 2 Deliverables Summary
| Milestone Component | Marks | Deliverable Location |
| :--- | :--- | :--- |
| **Prompt / Solution Design & Diagrams** | 2.0 | `server/prompts.js` & `docs/MILESTONE_2_TECHNICAL_REPORT.md` |
| **Running / Partial Implementation** | 3.0 | Working React frontend + Express backend connected live |
| **Demonstration / Pilot Run** | 2.0 | `docs/PILOT_RUN_TEST_CASES.md` |
| **Updated Project Git Repository** | 2.0 | Clean repository structure, scripts, and documentation |
| **BMC / Technical Synopsis** | 1.0 | `docs/MILESTONE_2_TECHNICAL_REPORT.md` (Section 3) |
| **90–150s Video Demo Script** | 2.0 | `docs/VIDEO_DEMO_SCRIPT.md` |
