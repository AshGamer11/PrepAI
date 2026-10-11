# PrepAI — AI Mock Interview & Feedback Assistant
**Bennett University | B.Tech 5th Semester | Prompt Engineering Mini-Project**  
**Problem Pool ID:** C10 (Mock interview question and feedback tool)  
**Total Assessment Marks:** 30 Marks  
**Status:** All Milestones (M1: 8M | M2: 12M | M3: 10M) Fully Completed

---

## 🚀 Overview
PrepAI is a full-stack, applied AI mock interview platform that simulates realistic technical and behavioral hiring committee interviews. Powered by Gemini 1.5 prompt chains and custom anti-leniency rubrics, PrepAI provides real-time scoring, STAR framework adherence checking, diagnostic feedback, and 100-point benchmark answers.

---

## 🛠️ Project Structure & Complete Deliverables
```
PrepAI/
├── docs/                                  # Complete Milestone Deliverables
│   ├── FINAL_PROJECT_REPORT.md            # Prescribed 9-Chapter Final Project Report (M3 - 3.0M)
│   ├── PRESENTATION_SLIDES_AND_VIVA_GUIDE.md # 12-Slide Presentation & Viva Guide (M3 - 3.0M)
│   ├── LINKEDIN_BLOG_POST.md              # Public-Facing Technical Article (M3 - 2.0M)
│   ├── YOUTUBE_VIDEO_SCRIPT_3_TO_5_MIN.md # 3–5 Minute Demonstration Video Script (M3 - 2.0M)
│   ├── MILESTONE_2_TECHNICAL_REPORT.md    # Technical Synopsis & BMC (M2 - 3.0M)
│   ├── PROMPT_EXPERIMENTATION_LOG.md      # A/B Prompt Experiments & Leniency Analysis (M2 - 2.0M)
│   ├── PILOT_RUN_TEST_CASES.md            # Live Demonstration Matrix & Test Logs (M2 - 2.0M)
│   └── VIDEO_DEMO_SCRIPT.md               # 90–150s Milestone 2 Video Script (M2 - 2.0M)
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

## 📊 Complete 30-Mark Assessment Matrix
| Milestone | Focus | Deliverables & Status | Marks |
| :--- | :--- | :--- | :---: |
| **Milestone 1** | Problem Identification, Use-Case & Prompt Proposal | Complete 10-point proposal, baseline prompt, initial React UI prototype | **8 / 8** |
| **Milestone 2** | Prompt Design, Implementation, BMC & Pilot Run | Working React + Express full-stack app, 4-factor rubrics, A/B testing logs, BMC | **12 / 12** |
| **Milestone 3** | Final Solution, 9-Chapter Report, Presentation & Viva | Prescribed 9-Chapter Report, 12 slides deck, Viva Q&A guide, LinkedIn post, 4-min video script | **10 / 10** |
| **TOTAL** | **Full Mini-Project Lifecycle** | **All Artifacts & Live Systems Ready** | **30 / 30** |
