import { useState, useEffect } from 'react';
import { Send, Mic, Play, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

function Interview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const role = searchParams.get('role') || 'Java Developer';
  const difficulty = searchParams.get('difficulty') || 'Junior';
  const type = searchParams.get('type') || 'Technical';

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionNumber: 1,
    topic: "Core Architecture",
    question: "What is the Spring Framework and what are its main architectural features?"
  });

  // Fetch initial question
  useEffect(() => {
    async function loadFirstQuestion() {
      setLoading(true);
      try {
        const storedKey = localStorage.getItem('prepai_gemini_key') || '';
        const res = await fetch('http://localhost:5000/api/generate-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobRole: role,
            interviewType: type,
            difficulty: difficulty,
            questionNumber: 1,
            apiKey: storedKey
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setCurrentQuestion(data.data);
        }
      } catch (err) {
        console.warn('Backend not responding yet, using standard question:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFirstQuestion();
  }, [role, difficulty, type]);

  // Current question's evaluation state if already answered
  const activeRecord = sessionData[currentQIndex];

  // Submit Answer handler
  const handleSubmitAnswer = async () => {
    if (!inputText.trim()) return;

    setEvaluating(true);
    try {
      const storedKey = localStorage.getItem('prepai_gemini_key') || '';
      const res = await fetch('http://localhost:5000/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: role,
          difficulty: difficulty,
          question: currentQuestion.question,
          userAnswer: inputText,
          apiKey: storedKey
        })
      });
      const data = await res.json();
      
      const evalResult = data.evaluation;
      const record = {
        questionNumber: currentQIndex + 1,
        question: currentQuestion.question,
        topic: currentQuestion.topic || `Topic ${currentQIndex + 1}`,
        userAnswer: inputText,
        evaluation: evalResult
      };

      const updated = [...sessionData];
      updated[currentQIndex] = record;
      setSessionData(updated);
      localStorage.setItem('prepai_last_session', JSON.stringify({
        role,
        difficulty,
        type,
        records: updated,
        timestamp: new Date().toISOString()
      }));
    } catch (err) {
      console.error('Error submitting answer:', err);
    } finally {
      setEvaluating(false);
    }
  };

  // Move to next question or complete session
  const handleNext = async () => {
    if (currentQIndex < 3) {
      const nextIndex = currentQIndex + 1;
      setCurrentQIndex(nextIndex);
      setInputText("");

      if (sessionData[nextIndex]) {
        setCurrentQuestion({
          questionNumber: nextIndex + 1,
          topic: sessionData[nextIndex].topic,
          question: sessionData[nextIndex].question
        });
      } else {
        setLoading(true);
        try {
          const storedKey = localStorage.getItem('prepai_gemini_key') || '';
          const res = await fetch('http://localhost:5000/api/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jobRole: role,
              interviewType: type,
              difficulty: difficulty,
              questionNumber: nextIndex + 1,
              previousContext: currentQuestion.question,
              apiKey: storedKey
            })
          });
          const data = await res.json();
          if (data.success && data.data) {
            setCurrentQuestion(data.data);
          }
        } catch (e) {
          console.warn('Fallback question error', e);
        } finally {
          setLoading(false);
        }
      }
    } else {
      // Completed all 4 questions! Navigate to Feedback report
      navigate('/feedback');
    }
  };

  // Calculate live cumulative score
  const answeredScores = sessionData.map(s => s.evaluation?.score).filter(s => typeof s === 'number');
  const avgScore = answeredScores.length > 0 
    ? (answeredScores.reduce((a, b) => a + b, 0) / answeredScores.length).toFixed(1)
    : "--";

  return (
    <div className="flex h-full w-full">
      {/* Session Details Sidebar */}
      <div className="w-72 bg-surface border-r border-surfaceBorder p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted">Live Session</h2>
          </div>

          <div className="space-y-4 text-sm bg-[#0C0D12] p-4 rounded-xl border border-surfaceBorder/80">
            <div className="flex justify-between items-center">
              <span className="text-textMuted text-xs">Role:</span>
              <span className="font-semibold text-white text-xs px-2 py-0.5 bg-primary/10 rounded text-primary">{role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted text-xs">Difficulty:</span>
              <span className="font-medium text-white text-xs">{difficulty}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted text-xs">Type:</span>
              <span className="font-medium text-white text-xs">{type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted text-xs">Progress:</span>
              <span className="font-medium text-accent text-xs">Question {currentQIndex + 1} of 4</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-[#10141D] rounded-2xl border border-[#212E40] overflow-hidden text-center shadow-lg">
             <div className="bg-primary/20 text-primary border-b border-primary/20 font-bold py-1.5 text-xs tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles size={14} /> LIVE RUBRIC EVALUATION
             </div>
             <div className="py-6 px-4">
                <div className="text-textMuted text-xs mb-1">Session Avg Score</div>
                <div className="text-5xl font-black text-white tracking-tight">{avgScore}</div>
                <div className="mt-3 inline-block">
                  {avgScore !== "--" && (
                    <span className={clsx(
                      "text-xs font-bold px-3 py-1 rounded-full",
                      Number(avgScore) >= 75 ? "bg-success/20 text-success border border-success/30" : "bg-warning/20 text-warning border border-warning/30"
                    )}>
                      {Number(avgScore) >= 75 ? "PASSING TIER" : "NEEDS PRACTICE"}
                    </span>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Interview Area */}
      <div className="flex-1 flex flex-col bg-[#050B14]">
        {/* Timeline Header */}
        <div className="h-20 border-b border-surfaceBorder flex items-center justify-center gap-6 px-8 relative">
           <button 
             onClick={() => currentQIndex > 0 && setCurrentQIndex(currentQIndex - 1)}
             disabled={currentQIndex === 0}
             className="absolute left-8 text-textMuted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
           >
             <ChevronLeft size={22} />
           </button>

           <div className="flex items-center gap-4">
              {[0, 1, 2, 3].map((idx) => {
                const item = sessionData[idx];
                const isCurrent = idx === currentQIndex;
                const score = item?.evaluation?.score;

                return (
                  <div key={idx} className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentQIndex(idx)}
                      className={clsx(
                        "w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 transition-all cursor-pointer",
                        isCurrent 
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105" 
                          : score !== undefined 
                            ? score >= 70 ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning"
                            : "border-surfaceBorder bg-surface text-textMuted opacity-60"
                      )}
                    >
                      <span className="text-[10px] font-bold">Q{idx + 1}</span>
                      <span className="text-xs font-extrabold">{score !== undefined ? score : "·"}</span>
                    </button>
                    {idx < 3 && <div className="w-8 h-[2px] bg-surfaceBorder/80"></div>}
                  </div>
                );
              })}
           </div>

           <button 
             onClick={() => currentQIndex < 3 && setCurrentQIndex(currentQIndex + 1)}
             disabled={currentQIndex === 3 || !sessionData[currentQIndex]}
             className="absolute right-8 text-textMuted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
           >
             <ChevronRight size={22} />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto border border-[#1C2C42] rounded-2xl p-8 bg-[#0B121F] shadow-2xl relative">
            
            {/* Header Badge */}
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full">
                Topic: {currentQuestion.topic || "Core Engineering"}
              </span>
              {activeRecord && (
                <div className={clsx(
                  "w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold shadow-md",
                  activeRecord.evaluation.score >= 75 ? "border-success text-success" : "border-warning text-warning"
                )}>
                  <span className="text-lg leading-none">{activeRecord.evaluation.score}</span>
                  <span className="text-[9px] uppercase tracking-wider text-textMuted">Score</span>
                </div>
              )}
            </div>

            {/* Question Text */}
            <h3 className="text-xl font-medium text-white mb-8 leading-relaxed">
              {loading ? (
                <span className="flex items-center gap-2 text-textMuted">
                  <Loader2 className="animate-spin text-primary" size={20} /> Generating tailored interview question...
                </span>
              ) : (
                currentQuestion.question
              )}
            </h3>

            {/* Split Answering & Evaluation Panels */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Left Column: Candidate Answer */}
              <div>
                <h4 className="text-[#3B82F6] font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>Your Answer</span>
                </h4>
                {activeRecord ? (
                  <div className="bg-[#050B14] border border-[#1C2C42] rounded-xl p-5 text-sm text-textMuted leading-relaxed max-h-60 overflow-y-auto">
                    {activeRecord.userAnswer}
                  </div>
                ) : (
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={evaluating}
                    className="w-full bg-[#050B14] border border-[#1C2C42] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary h-60 resize-none transition-colors"
                    placeholder="Structure your answer clearly (e.g. Definition, Trade-offs, Core components, or STAR method)..."
                  />
                )}
              </div>

              {/* Right Column: AI Critique & Ideal Model Answer */}
              <div>
                <h4 className="text-success font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>Bar-Raiser Feedback & Model Answer</span>
                </h4>
                
                {evaluating ? (
                  <div className="w-full bg-[#050B14] border border-[#1C2C42] border-dashed rounded-xl p-6 h-60 flex flex-col items-center justify-center text-center">
                    <Loader2 className="animate-spin text-primary mb-3" size={28} />
                    <p className="text-sm font-medium text-white">Analyzing with Prompt Rubrics...</p>
                    <p className="text-xs text-textMuted mt-1">Scoring accuracy, STAR structure, and depth</p>
                  </div>
                ) : activeRecord ? (
                  <div className="bg-[#050B14] border border-[#1C2C42] rounded-xl p-5 text-sm max-h-60 overflow-y-auto space-y-4">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase mb-1">Critique:</div>
                      <p className="text-xs text-textMuted leading-relaxed">{activeRecord.evaluation.feedback}</p>
                    </div>
                    {activeRecord.evaluation.idealAnswer && (
                      <div className="border-t border-surfaceBorder/60 pt-3">
                        <div className="text-xs font-bold text-success uppercase mb-1">Model Ideal Answer:</div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">{activeRecord.evaluation.idealAnswer}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full bg-[#050B14] border border-[#1C2C42] border-dashed rounded-xl p-6 h-60 flex flex-col items-center justify-center text-textMuted text-xs text-center leading-relaxed">
                    <p>Enter your answer on the left and submit.</p>
                    <p className="mt-1 opacity-70">The system evaluates across 4 key dimensions: Accuracy, Clarity, STAR structure, and Relevance.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center border-t border-surfaceBorder/50 pt-6">
              <div className="text-xs text-textMuted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>Powered by Gemini 1.5 Prompt Chains</span>
              </div>

              <div className="flex gap-4">
                {!activeRecord ? (
                  <>
                    <button 
                      onClick={() => setInputText("Spring Framework provides a lightweight container that handles Inversion of Control (IoC) and Dependency Injection. Its main features include Spring Core, Spring AOP for cross-cutting concerns like logging and transactions, and Spring MVC for web applications.")}
                      className="text-xs text-textMuted hover:text-primary transition-colors px-3 py-2 border border-surfaceBorder rounded-lg"
                    >
                      Fill Sample Answer
                    </button>
                    <button 
                      onClick={handleSubmitAnswer}
                      disabled={evaluating || !inputText.trim()}
                      className="bg-primary hover:bg-primaryHover disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                      {evaluating ? "Evaluating..." : "Submit Answer"} <Send size={16} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleNext}
                    className="bg-success hover:bg-emerald-600 text-[#050B14] font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-success/20"
                  >
                    {currentQIndex === 3 ? "Complete & View Report" : "Next Question"} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
