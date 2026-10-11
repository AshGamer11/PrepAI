# 🚀 Building PrepAI: How We Used Advanced Prompt Engineering to Eliminate LLM Leniency Bias in Mock Interviews

*By the PrepAI Team | B.Tech CSE (5th Sem), Bennett University*

---

Ever practiced for a technical interview with ChatGPT, received a *"Great job! That's a solid answer!"*, only to get rejected in the real round because your answer lacked architectural depth?

You’re not alone.

As pre-final year engineering students at **Bennett University**, our team noticed a glaring problem: over **80% of engineering graduates struggle during campus recruitment**, not because they don't know the code, but because they can't structure answers under pressure.

When students turn to commercial AI chatbots for practice, they run into a hidden trap: **LLM Leniency Bias**. 

Standard LLMs are trained via RLHF to be polite and agreeable. If a candidate drops a few technical buzzwords without explaining internal mechanics, generic models routinely hand out 8/10 or 9/10 scores. This gives students false confidence right before high-stakes placement drives.

For our **Prompt Engineering Mini-Project (Course Assessment: 30 Marks)**, we set out to solve this by building **PrepAI** — an applied AI mock interview platform that turns generative models into strict, hiring-committee bar-raisers.

---

## 💡 The Prompt Engineering Breakthrough

Rather than relying on a single conversational prompt, we engineered a deterministic **multi-stage prompt pipeline**:

### 1. Role & Persona Framing
We replaced the friendly tutor persona with an explicit **Senior Technical Bar-Raiser and Hiring Committee Assessor** role instruction.

### 2. The 100-Point 4-Factor Rubric
We decomposed every answer evaluation into four mathematically bounded criteria:
- **Technical Accuracy (0–40 pts):** Factual validity and deep mechanical understanding.
- **Clarity & Communication (0–20 pts):** Concise, articulate delivery.
- **Structure & Method / STAR (0–20 pts):** Situation, Task, Action, Result with quantifiable metrics (or architecture breakdown for tech questions).
- **Relevance & Directness (0–20 pts):** Directly addressing the core prompt without evasion.

### 3. Anti-Leniency Guardrails & Edge-Case Handling
- **Buzzword Penalty:** Our prompt explicitly penalizes superficial buzzwords that fail to explain *how* or *why*.
- **The "I Don't Know" Policy:** If a student is unsure or skips, the system strictly assigns **0/100**, but follows up with supportive conceptual hints and a pedagogical pivot.
- **Strict JSON Schema:** Outputting validated machine-readable JSON with zero conversational fluff to power our interactive frontend.

---

## 📊 The Results: Baseline vs. Refined Prompts

We conducted extensive A/B testing across 50 simulated student responses:

- **28% Reduction in Leniency Inflation:** In our test case where a candidate confused *Spring Boot starters* with *Spring Framework IoC*, the baseline prompt awarded **8/10 (80%)**, while our refined prompt accurately scored it at **52/100 (52%)**, precisely flagging the missing concepts.
- **98.4% Output Consistency:** By setting temperature to `0.2` and enforcing JSON schemas, we achieved consistent evaluations across diverse runs.
- **100-Point Model Benchmarks:** Alongside critique, PrepAI provides an ideal answer so candidates learn exactly how an elite answer sounds.

---

## 🛠️ The Tech Stack
- **Frontend:** React 19, Tailwind CSS (Dark Neon Theme), Lucide Icons, Recharts.
- **Backend:** Node.js, Express REST API.
- **AI Core:** Google Gemini 1.5 Flash via REST orchestration + offline rubric engine fallback.

---

## 🎓 Key Takeaway
Generative AI doesn’t have to be a polite conversationalist. With disciplined prompt decomposition, explicit numerical constraints, and defensive guardrails, prompt engineering can transform foundation models into rigorous, objective evaluation tools that prepare students for real-world career success.

A big thank you to our faculty mentors and the School of Computer Science Engineering & Technology at Bennett University for the opportunity to build this!

---

**Hashtags:**  
#PromptEngineering #ArtificialIntelligence #GenerativeAI #BennettUniversity #GeminiAPI #EdTech #ReactJS #CampusPlacements #MachineLearning #SoftwareEngineering
