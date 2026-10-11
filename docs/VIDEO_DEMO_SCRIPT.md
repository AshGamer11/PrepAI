# PrepAI — 90–150 Second Video Demo Script & Storyboard
**Requirement:** Milestone 2 Assessment (2.0 Marks)  
**Format:** Video walkthrough / Screen recording with voiceover (Duration: ~120 seconds)

---

## Storyboard & Script Breakdown

### Scene 1: Introduction & Problem Statement (0:00 – 0:25)
- **Visual on Screen:** Title slide showing project name, Bennett University, team member names, and Problem Pool ID `C10`. Transition to the PrepAI Dashboard at `http://localhost:5173`.
- **Spoken Voiceover:**
  > *"Hello everyone! Welcome to PrepAI, our applied prompt engineering mini-project for Bennett University. College students frequently struggle during campus placements due to lack of structured articulation and interview feedback. Generic chatbots are often too lenient or unstructured. PrepAI solves this by implementing a deterministic, rubric-guided language model pipeline that acts as a strict technical bar-raiser."*

---

### Scene 2: Solution Architecture & Prompt Design (0:25 – 0:50)
- **Visual on Screen:** Quick display of the Mermaid system architecture diagram from `MILESTONE_2_TECHNICAL_REPORT.md` and the 4-factor scoring rubric.
- **Spoken Voiceover:**
  > *"Our architecture decomposes the interview into dedicated prompt chains. Instead of asking one generic prompt, we use role-calibrated question generation, followed by a strict 100-point rubric evaluator assessing technical accuracy, clarity, STAR structure, and relevance. We also integrated defensive guardrails to handle 'I don't know' responses and eliminate LLM leniency bias."*

---

### Scene 3: Live Application Demonstration (0:50 – 1:30)
- **Visual on Screen:** 
  1. Click "+ Start New Interview", select *Java Developer (Junior)*, and launch the session.
  2. Show Question 1 loading dynamically.
  3. Enter an answer with superficial buzzwords, click *Submit Answer*.
  4. Show the live AI evaluation: score of 52, the specific critique explaining the confusion between Spring Boot and Spring Framework, and the 100-point benchmark model answer!
  5. Advance to the next question.
- **Spoken Voiceover:**
  > *"Here is our live running prototype built with React and Node.js. When we submit an answer, our prompt engine immediately scores it against verified engineering standards. Notice how the AI doesn't award high marks for mere buzzwords—it specifically points out the conceptual gap and presents a 100-point model answer to accelerate student learning."*

---

### Scene 4: Cumulative Diagnostic Report & Conclusion (1:30 – 2:00)
- **Visual on Screen:** Navigate to the Feedback Report screen (`/feedback`). Showcase the circular score gauge, metric bars (Clarity 88%, STAR 85%), and question-by-question breakdown.
- **Spoken Voiceover:**
  > *"Upon completing the session, students receive a complete diagnostic report with radial metrics, STAR framework adherence, and tailored practice recommendations. PrepAI bridges the gap between academic theory and real-world placement readiness. Thank you!"*
