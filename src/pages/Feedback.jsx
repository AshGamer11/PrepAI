import { useState, useEffect } from 'react';
import { Lightbulb, RotateCcw, Info, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function Feedback() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('prepai_last_session');
    if (raw) {
      try {
        setSession(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to parse last session:', e);
      }
    }
  }, []);

  // Use dynamic session data or fall back to rich showcase data
  const records = session?.records || [
    {
      questionNumber: 1,
      topic: "Personal Introduction & Motivation",
      question: "Walk me through your background and why you are interested in this role.",
      userAnswer: "I have worked on full-stack Java and React projects for 2 years, building scalable microservices and real-time dashboards.",
      evaluation: {
        score: 88,
        metrics: { clarity: 92, structure: 85, relevance: 90, technicalDepth: 85 },
        feedback: "Well structured, confident articulation with clear career trajectory.",
        idealAnswer: "Briefly mention educational background, 2 prominent projects with architectural responsibilities, and specific reasons this company fits your goals."
      }
    },
    {
      questionNumber: 2,
      topic: "Professional Challenge (STAR Method)",
      question: "Describe a tough technical bottleneck you faced and how you resolved it.",
      userAnswer: "In our payment service, database lock contention caused slow response times. I refactored it using Redis caching and optimistic locking, cutting latency by 45%.",
      evaluation: {
        score: 85,
        metrics: { clarity: 88, structure: 90, relevance: 85, technicalDepth: 88 },
        feedback: "Strong application of STAR framework with clear metrics and quantifiable results.",
        idealAnswer: "Detail the bottleneck metrics, the trade-offs of caching vs read-replicas, and testing under stress."
      }
    },
    {
      questionNumber: 3,
      topic: "Core Technical Concepts",
      question: "What is the Spring Framework and what are its main architectural features?",
      userAnswer: "Spring Boot is a tool that provides starters and auto-configuration to write applications faster.",
      evaluation: {
        score: 65,
        metrics: { clarity: 80, structure: 70, relevance: 75, technicalDepth: 60 },
        feedback: "Confused Spring Boot with the underlying Spring Framework. Lacked mention of Dependency Injection and AOP.",
        idealAnswer: "The Spring Framework is an enterprise Java framework providing IoC/DI, AOP, transaction abstractions, and modular integration."
      }
    },
    {
      questionNumber: 4,
      topic: "Conflict Resolution & Leadership",
      question: "Tell me about a disagreement with a peer over code review or architecture.",
      userAnswer: "A colleague wanted to rewrite a module in a new framework. I listened to his points and we did a benchmark comparison.",
      evaluation: {
        score: 78,
        metrics: { clarity: 82, structure: 75, relevance: 80, technicalDepth: 75 },
        feedback: "Good collaborative spirit, but slightly vague on the long-term business outcome and team agreement.",
        idealAnswer: "Explain the opposing views, the factual benchmarking rubric created, the consensus achieved, and the post-project retro."
      }
    }
  ];

  // Calculate averages
  const scores = records.map(r => r.evaluation?.score || 70);
  const avgOverall = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1));

  const avgClarity = Math.round(records.reduce((acc, r) => acc + (r.evaluation?.metrics?.clarity || 85), 0) / (records.length || 1));
  const avgStructure = Math.round(records.reduce((acc, r) => acc + (r.evaluation?.metrics?.structure || 80), 0) / (records.length || 1));
  const avgRelevance = Math.round(records.reduce((acc, r) => acc + (r.evaluation?.metrics?.relevance || 85), 0) / (records.length || 1));

  const [selectedRecordIndex, setSelectedRecordIndex] = useState(0);
  const selectedRecord = records[selectedRecordIndex] || records[0];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs text-textMuted hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-white">Interview Results & Rubric Report</h1>
          <p className="text-xs text-textMuted mt-1">
            Session: <span className="text-primary font-semibold">{session?.role || "Java Developer"}</span> · Difficulty: <span className="text-slate-300">{session?.difficulty || "Junior"}</span>
          </p>
        </div>

        <button 
          onClick={() => navigate('/interview')}
          className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RotateCcw size={14} /> Rerun Simulation
        </button>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex gap-6">
        {/* Left Column: Overall Score & Timeline */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Top Score Banner */}
          <div className="bg-surface rounded-2xl border border-surfaceBorder p-8 flex flex-col items-center relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-8 mb-8">
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[8px] border-surfaceBorder">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                   <circle 
                     cx="50" 
                     cy="50" 
                     r="44" 
                     fill="transparent" 
                     stroke="url(#gradientScore)" 
                     strokeWidth="8" 
                     strokeDasharray="276" 
                     strokeDashoffset={276 - (276 * avgOverall) / 100} 
                     strokeLinecap="round" 
                   />
                   <defs>
                     <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#10B981" />
                       <stop offset="100%" stopColor="#8B5CF6" />
                     </linearGradient>
                   </defs>
                </svg>
                <div className="text-center">
                  <div className="text-3xl font-black text-white leading-none">{avgOverall}</div>
                  <span className="text-[10px] text-textMuted uppercase font-bold tracking-wider">/ 100</span>
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {avgOverall >= 85 ? "Distinction Performance" : avgOverall >= 70 ? "Solid Passing Score" : "Needs Targeted Practice"}
                </div>
                <p className="text-xs text-textMuted max-w-sm">
                  Evaluated across technical accuracy, articulation clarity, STAR framing, and answer depth.
                </p>
              </div>
            </div>

            {/* Metric Bars */}
            <div className="w-full grid grid-cols-3 gap-4">
              <MetricBar label="Clarity & Articulation" value={avgClarity} color="bg-accent" />
              <MetricBar label="STAR / Structure" value={avgStructure} color="bg-primary" />
              <MetricBar label="Relevance & Depth" value={avgRelevance} color="bg-success" />
            </div>
          </div>

          {/* Detailed Question Timeline */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Question-by-Question Breakdown</span>
              <span className="text-xs text-textMuted font-normal">Click question to inspect model response</span>
            </h3>

            <div className="space-y-3">
              {records.map((r, idx) => {
                const isSelected = idx === selectedRecordIndex;
                const score = r.evaluation?.score || 0;
                const isHigh = score >= 75;

                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedRecordIndex(idx)}
                    className={clsx(
                      "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                      isSelected 
                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                        : "bg-surface border-surfaceBorder hover:border-surfaceBorder/80"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border",
                        isHigh ? "border-success text-success bg-success/10" : "border-warning text-warning bg-warning/10"
                      )}>
                        Q{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{r.topic || `Question ${idx + 1}`}</h4>
                        <p className="text-xs text-textMuted line-clamp-1">{r.question}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={clsx("text-base font-extrabold", isHigh ? "text-success" : "text-warning")}>
                          {score}
                        </span>
                        <span className="text-[10px] text-textMuted"> /100</span>
                      </div>
                      <span className="text-xs text-primary underline">Details</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Active Question Drilldown */}
        <div className="w-[420px] flex flex-col">
          <div className="bg-[#12131A] rounded-2xl border border-primary/30 p-6 flex-1 flex flex-col shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-surfaceBorder/60">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Lightbulb size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Q{selectedRecordIndex + 1} Assessment & Ideal Answer
                </h3>
                <span className="text-xs text-textMuted">{selectedRecord.topic}</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {/* Question */}
              <div>
                <span className="text-[11px] font-bold text-textMuted uppercase tracking-wider">Prompt Question:</span>
                <p className="text-xs text-slate-300 mt-1 italic font-medium">"{selectedRecord.question}"</p>
              </div>

              {/* Your Answer */}
              <div>
                <span className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-wider">Your Submitted Answer:</span>
                <p className="text-xs text-slate-400 mt-1 bg-[#0A0B10] p-3 rounded-lg border border-surfaceBorder/50">
                  {selectedRecord.userAnswer || "No answer recorded."}
                </p>
              </div>

              {/* Feedback Critique */}
              <div>
                <span className="text-[11px] font-bold text-warning uppercase tracking-wider">Bar-Raiser Critique:</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedRecord.evaluation?.feedback}
                </p>
              </div>

              {/* Ideal Answer */}
              {selectedRecord.evaluation?.idealAnswer && (
                <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-xl">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span>★ 100-Point Benchmark Response</span>
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{selectedRecord.evaluation.idealAnswer}"
                  </p>
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate(`/interview?role=${encodeURIComponent(session?.role || 'Java Developer')}`)}
              className="mt-6 w-full py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold text-xs tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
            >
              <RotateCcw size={15} /> Practice This Module Again
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricBar({ label, value, color }) {
  return (
    <div className="bg-[#0D0E14] border border-surfaceBorder/80 rounded-xl p-3.5">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-textMuted">{label}:</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-surfaceBorder rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full transition-all duration-700", color)} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default Feedback;
