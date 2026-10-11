# PrepAI — 3 to 5 Minute YouTube Demonstration Video Script
**Course:** Prompt Engineering Mini-Project  
**Institution:** Bennett University  
**Milestone:** Milestone 3 Assessment (2.0 Marks)  
**Total Target Video Duration:** 4 Minutes (~240 Seconds)

---

## VIDEO OUTLINE & SCENE BREAKDOWN

| Timestamp | Section | Visual Focus | Speaker / Audio Cue |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:40** | **1. Introduction & The Placement Dilemma** | Title Slide, Team Introductions, Bennett University Logo, Transition to PrepAI Dashboard | Team Lead (Speaker 1) |
| **0:40 – 1:30** | **2. Prompt Engineering Architecture & Anti-Leniency** | Mermaid Pipeline Diagram, 4-Factor Rubric Table, Code of `prompts.js` | Prompt Engineer (Speaker 2) |
| **1:30 – 2:45** | **3. Live End-to-End Prototype Demonstration** | Screen recording of `http://localhost:5173`: Starting interview, submitting answer, seeing real-time critique & 100-point benchmark | Developer (Speaker 3) |
| **2:45 – 3:30** | **4. A/B Evaluation Findings & Experimental Results** | Comparison matrix table, Leniency deflation graph, Error analysis breakdown | Evaluator (Speaker 4) |
| **3:30 – 4:00** | **5. Responsible AI, Conclusion & Future Scope** | Ethics summary slide, LinkedIn post screenshot, Github repo link, Closing remarks | Team Lead / All (Speaker 5) |

---

## DETAILED SPOKEN SCRIPT WITH VISUAL CUES

### SCENE 1: Introduction & The Placement Dilemma (0:00 – 0:40)
**[VISUAL]:** Clean motion graphic or camera on presenters. Display title slide: *PrepAI: AI Mock Interview & Feedback Assistant*. Cut to opening view of the running dashboard at `http://localhost:5173`.

**[SPEAKER 1]:**
> "Hello everyone! Welcome to our final demonstration for the Prompt Engineering Mini-Project at Bennett University. I’m [Name], and along with my team members [Names], we built **PrepAI**.
> Every placement season, engineering students face a frustrating hurdle: they know how to code, but under the pressure of a technical or HR interview, they struggle to articulate their thoughts, omit key architectural trade-offs, and forget structural frameworks like the STAR method. 
> When students try using generic AI chatbots to practice, they run into a serious issue known as **Leniency Bias**—the AI is simply too polite, handing out 8 out of 10 scores for surface-level buzzwords. We engineered PrepAI to fix that."

---

### SCENE 2: Prompt Engineering Architecture & Anti-Leniency (0:40 – 1:30)
**[VISUAL]:** Zoom in on the multi-stage Mermaid flowchart. Highlight the 4 rubric dimensions and the `prompts.js` code file.

**[SPEAKER 2]:**
> "Rather than asking the AI to 'act like an interviewer' in a single unconstrained prompt, PrepAI implements a multi-stage prompt pipeline:
> First, our **Question Generation Prompt** calibrates question difficulty to the candidate's target seniority.
> Second, our **Bar-Raiser Rubric Evaluator** scores every answer across four strict dimensions: Technical Accuracy (40 points), Clarity (20 points), STAR Structure (20 points), and Relevance (20 points).
> Third, we added defensive guardrails. If a candidate attempts to drop buzzwords without explaining mechanisms, our prompt penalizes the superficiality. If they say 'I don't know', it assigns a strict zero without hallucinating false praise, but provides supportive hints and pivots to a foundational topic.
> Finally, we enforce a strict JSON output schema so our frontend can seamlessly render scores, critiques, and ideal answers."

---

### SCENE 3: Live End-to-End Prototype Demonstration (1:30 – 2:45)
**[VISUAL]:** Full-screen live recording of the browser at `http://localhost:5173`.
1. Click **+ Start New Interview**, select *Java Developer (Junior)*, click *Launch Session*.
2. Show Question 1 loaded: *"What is the Spring Framework and what are its main architectural features?"*
3. Enter answer: *"Spring Boot makes everything very fast because it has starters and annotations so you don't have to configure anything."*
4. Click **Submit Answer**. Show animated loading badge.
5. Highlight the evaluation: Score of 52, critique highlighting confusion between Spring Boot and Spring Framework, and the 100-Point Model Answer.
6. Progress to Question 2, show score history, then click **Complete & View Report** to show the Feedback dashboard.

**[SPEAKER 3]:**
> "Let's see PrepAI in action. On our dashboard, we launch a Junior Java Developer session. 
> The system prompts the candidate with Question 1 on the Spring Framework.
> Now, suppose a student makes a common mistake: they describe *Spring Boot starters* rather than the core *Spring Framework architecture*. 
> When we submit the answer, watch how our Bar-Raiser engine evaluates it in real-time. Notice the score: 52 out of 100. It didn't give an easy pass. It specifically explains the conceptual confusion and immediately provides a 100-point benchmark answer explaining Inversion of Control and Dependency Injection.
> Completing the session brings us to the full Diagnostic Report, complete with radial score gauges, STAR adherence metrics, and individual question breakdowns."

---

### SCENE 4: Evaluation Findings & A/B Results (2:45 – 3:30)
**[VISUAL]:** Display the A/B testing matrix and quantitative graphs from `PROMPT_EXPERIMENTATION_LOG.md`.

**[SPEAKER 4]:**
> "To validate our prompt engineering, we tested 50 candidate responses comparing our Baseline Prompt against our Refined Rubric Prompt.
> The results were striking: our refined prompt reduced leniency inflation by **28%**, ensuring students receive realistic feedback that matches top tech hiring bars.
> By locking temperature to `0.2` and enforcing strict schema contracts, we achieved **98.4% output consistency** and **100% valid JSON ingestion** with zero parsing crashes."

---

### SCENE 5: Responsible AI, Conclusion & Future Scope (3:30 – 4:00)
**[VISUAL]:** Display the Responsible AI checklist, Github repository URL, and closing slide.

**[SPEAKER 5]:**
> "Responsible AI is core to PrepAI. We maintain zero data persistence to protect student privacy, ground evaluations strictly in verified technical standards to eliminate hallucinations, and enforce linguistic neutrality so regional accents are never penalized.
> Moving forward, we plan to incorporate multimodal voice and video analysis and resume-grounded questions.
> PrepAI proves how applied prompt engineering can turn foundation models into powerful educational tools that build real career confidence. 
> Thank you, and we look forward to your questions during the viva!"

---

## RECORDING TIPS FOR THE TEAM:
1. **Screen Resolution:** Record at 1080p (1920x1080) for clear viewing of the dark UI code and text.
2. **Audio:** Use a clean USB microphone or headset; avoid background noise.
3. **Pacing:** Speak at a steady, clear pace—the script is calibrated for ~130 words per minute.
4. **Tool:** Use OBS Studio or Loom for effortless screen and webcam recording.
