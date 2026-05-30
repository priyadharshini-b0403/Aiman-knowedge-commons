import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, CheckCircle, Zap, ArrowRight, Brain, FileText, ShieldCheck, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const goTo = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  const workflow = [
    {
      step: '1',
      icon: FileText,
      title: 'User submits knowledge',
      desc: 'Contributors share observations, corrections, and expertise through a structured claim form.',
    },
    {
      step: '2',
      icon: ShieldCheck,
      title: 'Reviewer validates',
      desc: 'Human reviewers check evidence, score quality, and decide if the claim is trustworthy.',
    },
    {
      step: '3',
      icon: Sparkles,
      title: 'AI-ready knowledge',
      desc: 'Verified claims are tagged for training, evaluation, knowledge bases, or correction feedback.',
    },
  ];

  const whyItems = [
    'Local and field knowledge that training data often misses',
    'Real-time environmental and infrastructure observations',
    'Expert corrections when AI systems make mistakes',
    'Creative ideas that improve how models are built and evaluated',
    'Human validation before knowledge enters AI workflows',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent">
      <section className="relative px-4 md:px-8 pt-8 pb-24 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] orb-violet" />
          <div className="absolute bottom-0 right-0 w-80 h-80 orb-fuchsia" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 orb-gold" />
        </div>

        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Zap size={16} className="text-violet-400" />
            <span className="text-sm text-violet-300">Human knowledge → Better AI systems</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Crowdsource verified knowledge to{' '}
            <span className="gradient-text">improve AI</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            AI models learn from data—but humans hold context, corrections, and ground truth that
            machines never saw. AIMan Knowledge Commons collects, reviews, and prepares that
            knowledge for safe use in training, evaluation, and knowledge bases.
          </p>

          {!isAuthenticated && (
            <p className="text-sm text-violet-300/90">
              Please log in to access Submit, Dashboard, and Review features.
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            {!isAuthenticated ? (
              <button
                onClick={() => navigate('/login', { state: { from: '/dashboard' } })}
                className="group px-8 py-4 gradient-accent rounded-xl font-semibold text-white transition-all hover:shadow-2xl hover:shadow-violet-500/50 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Login to Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => goTo('/submit')}
                  className="group px-8 py-4 gradient-accent rounded-xl font-semibold text-white transition-all hover:shadow-2xl hover:shadow-violet-500/50 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
                >
                  Submit Knowledge
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => goTo('/dashboard')}
                  className="px-8 py-4 glass rounded-xl font-semibold text-violet-200 hover:bg-slate-800/50 transition inline-flex items-center justify-center gap-2"
                >
                  <Brain size={20} />
                  My Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto border-t border-violet-500/15">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How it works</h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-14">
          A simple pipeline from human insight to AI-ready assets
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {workflow.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative glass-light rounded-2xl p-8 border border-violet-500/20 card-hover"
              >
                <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-bold bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">
                  Step {item.step}
                </span>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-xl flex items-center justify-center mb-5 mt-2">
                  <Icon size={24} className="text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Users size={18} className="text-violet-400" />
            <span>Submit</span>
            <ArrowRight size={14} />
            <CheckCircle size={18} className="text-yellow-400" />
            <span>Validate</span>
            <ArrowRight size={14} />
            <Sparkles size={18} className="text-emerald-400" />
            <span>AI-ready</span>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How human knowledge improves AI systems
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Large language models and other AI tools can hallucinate, miss local context, or
              repeat outdated patterns. Verified human contributions close those gaps with
              evidence-backed claims reviewers can trust before they reach production datasets.
            </p>
            <ul className="space-y-4">
              {whyItems.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="score-panel rounded-2xl p-8 border">
            <Brain size={48} className="text-violet-500 dark:text-violet-400 mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-3">Knowledge Value Score</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--score-label-color)' }}>
              Each submission receives a mock Knowledge Value Score based on description depth,
              evidence, contributor details, and consent—helping reviewers prioritize high-quality
              claims for AI training, evaluation, or knowledge bases.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="glass-light rounded-2xl p-10 md:p-12 border border-violet-500/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to contribute?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Submit a knowledge claim or open the reviewer dashboard to validate community
            contributions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => goTo('/submit')}
              className="px-8 py-3 gradient-accent rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-violet-500/30 transition"
            >
              Submit Knowledge
            </button>
            <button
              onClick={() => goTo('/dashboard')}
              className="px-8 py-3 glass rounded-xl font-semibold text-violet-200 hover:bg-slate-800/50 transition"
            >
              View My Claims
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
