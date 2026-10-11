import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Play, Settings, Sparkles, X, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function Dashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  
  // Custom interview config
  const [selectedRole, setSelectedRole] = useState("Java Developer");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Junior");
  const [selectedType, setSelectedType] = useState("Technical");

  // Server status check
  const [backendStatus, setBackendStatus] = useState("Checking...");
  
  useEffect(() => {
    const savedKey = localStorage.getItem('prepai_gemini_key') || '';
    setApiKeyInput(savedKey);

    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data.hasGeminiKey || savedKey ? "Gemini 1.5 Active" : "Intelligent Fallback Engine Active");
      })
      .catch(() => {
        setBackendStatus("Intelligent Fallback Engine (Local)");
      });
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('prepai_gemini_key', apiKeyInput.trim());
    setKeyModalOpen(false);
    setBackendStatus(apiKeyInput.trim() ? "Gemini 1.5 Active" : "Intelligent Fallback Engine Active");
  };

  const handleStartCustomInterview = () => {
    setModalOpen(false);
    navigate(`/interview?role=${encodeURIComponent(selectedRole)}&difficulty=${encodeURIComponent(selectedDifficulty)}&type=${encodeURIComponent(selectedType)}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      {/* Top Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold text-white">Welcome back, John!</h1>
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full flex items-center gap-1.5">
              <Sparkles size={12} /> {backendStatus}
            </span>
          </div>
          <p className="text-sm text-textMuted">PrepAI Bar-Raiser Architecture · Milestone 2 Active Build</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setKeyModalOpen(true)}
            className="border border-surfaceBorder hover:border-primary/50 text-textMuted hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <Key size={14} /> Gemini API Key
          </button>

          <button 
            onClick={() => setModalOpen(true)}
            className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <Play size={15} fill="currentColor" /> + Start New Interview
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Interviews Completed" value="28" change="+5% vs last month" isPositive={true} />
        <StatCard title="Average Rubric Score" value="84/100" change="+4.2 vs baseline" isPositive={true} />
        <StatCard title="STAR Method Consistency" value="86%" change="+12% with refined prompt" isPositive={true} />
        <StatCard title="Practice Time Logged" value="12h 45m" change="On track" isPositive={true} />
      </div>

      {/* Custom Interview Banner */}
      <div className="bg-gradient-to-r from-[#211138] to-[#12072B] border border-primary/30 rounded-2xl p-8 mb-10 relative overflow-hidden flex justify-between items-center shadow-[0_0_40px_rgba(139,92,246,0.12)]">
        <div className="z-10 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/40">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Custom Dynamic Simulation</h2>
          </div>
          <p className="text-textMuted max-w-xl text-sm mb-5 leading-relaxed">
            Tailor your interview experience using advanced prompt chaining. Choose targeted roles, difficulty levels, and strict rubric calibration.
          </p>
          <div className="flex gap-2">
            <Badge text="Role-Specific Prompts" />
            <Badge text="Strict 4-Factor Rubric" />
            <Badge text="Anti-Leniency Guardrails" />
          </div>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="z-10 relative bg-primary/20 hover:bg-primary text-white font-medium text-xs px-5 py-3 rounded-xl border border-primary/40 flex items-center gap-2 transition-all shadow-md"
        >
          Configure Simulation <ArrowRight size={16} />
        </button>
      </div>

      {/* Categories */}
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-xs">Recommended Practice Tracks</h3>
      <div className="grid grid-cols-3 gap-6">
        <CategoryCard 
          title="Technical Interview" 
          desc="Sharpen Java, Spring Boot, concurrency, and distributed system trade-offs."
          bg="bg-gradient-to-br from-[#2D1B2E] to-[#110B13]"
          onClick={() => navigate('/interview?role=Java%20Developer&difficulty=Junior&type=Technical')}
        />
        <CategoryCard 
          title="Behavioral (STAR) Interview" 
          desc="Master conflict resolution, leadership, and crisis ownership using STAR rubrics."
          bg="bg-gradient-to-br from-[#2E2018] to-[#140E0A]"
          onClick={() => navigate('/interview?role=Behavioral&difficulty=Mid-Level&type=Behavioral')}
        />
        <CategoryCard 
          title="Full Stack & React Interview" 
          desc="Evaluate modern React, state architecture, and API integration design patterns."
          bg="bg-gradient-to-br from-[#17202A] to-[#0A0D12]"
          onClick={() => navigate('/interview?role=Full%20Stack%20Developer&difficulty=Junior&type=Technical')}
        />
      </div>

      {/* Configure Interview Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#12131A] border border-primary/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 text-textMuted hover:text-white"
            >
              <X size={18} />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-1">Configure Interview Session</h3>
            <p className="text-xs text-textMuted mb-6">Prompt parameters will be dynamically injected into Gemini.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase mb-1.5 block">Job Role</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-[#090A0E] border border-surfaceBorder rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Java Developer">Java Developer (Spring / JVM)</option>
                  <option value="Full Stack Developer">Full Stack Developer (React / Node)</option>
                  <option value="Data Analyst">Data Analyst (SQL / Python)</option>
                  <option value="Behavioral">Behavioral (STAR / Leadership)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase mb-1.5 block">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Junior', 'Mid-Level', 'Senior'].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={clsx(
                        "py-2.5 rounded-lg text-xs font-semibold border transition-all",
                        selectedDifficulty === lvl 
                          ? "bg-primary text-white border-primary" 
                          : "bg-surface border-surfaceBorder text-textMuted hover:text-white"
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase mb-1.5 block">Interview Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Technical', 'Behavioral'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedType(t)}
                      className={clsx(
                        "py-2.5 rounded-lg text-xs font-semibold border transition-all",
                        selectedType === t 
                          ? "bg-primary text-white border-primary" 
                          : "bg-surface border-surfaceBorder text-textMuted hover:text-white"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 border border-surfaceBorder text-textMuted hover:text-white rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleStartCustomInterview}
                className="flex-1 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-primary/25"
              >
                Launch Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {keyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#12131A] border border-primary/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setKeyModalOpen(false)}
              className="absolute right-5 top-5 text-textMuted hover:text-white"
            >
              <X size={18} />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Key size={18} className="text-primary" /> Google Gemini API Key
            </h3>
            <p className="text-xs text-textMuted mb-4">
              Optional: Enter your free Gemini API key to run live cloud prompt calls. If left empty, PrepAI automatically uses its internal offline rubric engine.
            </p>

            <input 
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#090A0E] border border-surfaceBorder rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary mb-4 font-mono text-xs"
            />

            <div className="flex gap-3">
              <button 
                onClick={() => { setApiKeyInput(''); localStorage.removeItem('prepai_gemini_key'); setKeyModalOpen(false); }}
                className="py-2.5 px-4 border border-surfaceBorder text-textMuted hover:text-danger rounded-xl text-xs font-medium"
              >
                Clear Key
              </button>
              <button 
                onClick={handleSaveKey}
                className="flex-1 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-xl text-xs font-semibold"
              >
                Save & Apply Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-surface border border-surfaceBorder rounded-2xl p-5 shadow-sm">
      <h4 className="text-xs text-textMuted uppercase tracking-wider mb-2 font-medium">{title}</h4>
      <div className="text-2xl font-black text-white mb-2">{value}</div>
      {change && (
        <div className={clsx("flex items-center text-xs font-medium", isPositive ? "text-success" : "text-danger")}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {change}
        </div>
      )}
    </div>
  );
}

function Badge({ text }) {
  return <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-semibold border border-primary/20">{text}</span>;
}

function CategoryCard({ title, desc, bg, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={clsx("rounded-2xl p-6 border border-surfaceBorder h-48 flex flex-col justify-end cursor-pointer hover:border-primary/60 hover:scale-[1.02] transition-all shadow-lg", bg)}
    >
      <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
        <span>{title}</span>
        <ArrowRight size={16} className="text-textMuted" />
      </h4>
      <p className="text-xs text-textMuted leading-relaxed">{desc}</p>
    </div>
  );
}

export default Dashboard;
