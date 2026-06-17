import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS, RESULTS, INITIAL_COMMUNITY_POSTS } from './data';
import { Question, ResultProfile, CommunityPost } from './types';

export default function App() {
  // Navigation & Global state
  const [activeTab, setActiveTab] = useState<'test' | 'results' | 'community' | 'guide'>('test');
  const [testState, setTestState] = useState<'home' | 'playing' | 'completed'>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Track selected S, A, V responses
  const [userSelections, setUserSelections] = useState<('S' | 'A' | 'V')[]>([]);
  
  // Results State
  const [latestResult, setLatestResult] = useState<ResultProfile | null>(null);
  const [gaugeTrigger, setGaugeTrigger] = useState(false);

  // Community State
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newStyleTag, setNewStyleTag] = useState('하트 시그널 과몰입러');

  // Load Initial Data from LocalStorage
  useEffect(() => {
    // Load result
    const savedResult = localStorage.getItem('push_pull_latest_result_new');
    if (savedResult) {
      try {
        setLatestResult(JSON.parse(savedResult));
      } catch (e) {
        console.error("Failed to parse saved result", e);
      }
    }

    // Load community posts
    const savedPosts = localStorage.getItem('push_pull_community_posts_new');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(INITIAL_COMMUNITY_POSTS);
      }
    } else {
      setPosts(INITIAL_COMMUNITY_POSTS);
      localStorage.setItem('push_pull_community_posts_new', JSON.stringify(INITIAL_COMMUNITY_POSTS));
    }
  }, []);

  // Sync results state with gauge anim trigger
  useEffect(() => {
    if (activeTab === 'results' && latestResult) {
      setGaugeTrigger(false);
      const timer = setTimeout(() => setGaugeTrigger(true), 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab, latestResult]);

  // Handle Answer Selection
  const handleAnswerSelect = (type: 'S' | 'A' | 'V') => {
    const updatedSelections = [...userSelections, type];
    setUserSelections(updatedSelections);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Next Question
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      // Calculate final results
      setTimeout(() => {
        // Count S, A, V
        const counts = updatedSelections.reduce((acc: Record<'S' | 'A' | 'V', number>, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, { S: 0, A: 0, V: 0 });

        const sCount = counts['S'] || 0;
        const aCount = counts['A'] || 0;
        const vCount = counts['V'] || 0;

        /**
         * 채점 로직:
         * 각 문항의 선택지는 순서대로 안정형(S) / 불안형(A) / 회피형(V)입니다. 
         * 가장 많이 나온 알파벳이 나의 메인 성향이 됩니다. 
         * (A와 V가 비슷하게 많다면 혼란형)
         * 비등한 차이 (예: Math.abs(A - V) <= 1 이고 둘다 3 이상인 경우 등)
         */
        let finalProfileId: 'secure' | 'anxious' | 'avoidant' | 'fearful' = "secure";

        if (Math.abs(aCount - vCount) <= 1 && (aCount >= 3 && vCount >= 3)) {
          finalProfileId = "fearful"; // 혼란형
        } else {
          // 가장 빈도가 높은 성향 추출
          const maxCount = Math.max(sCount, aCount, vCount);
          if (maxCount === aCount) {
            finalProfileId = "anxious"; // 불안형
          } else if (maxCount === vCount) {
            finalProfileId = "avoidant"; // 회피형
          } else {
            finalProfileId = "secure"; // 안정형
          }
        }

        const matchedProfile = RESULTS.find(r => r.id === finalProfileId) || RESULTS[0];

        // Save
        localStorage.setItem('push_pull_latest_result_new', JSON.stringify(matchedProfile));
        setLatestResult(matchedProfile);
        setTestState('completed');
        setActiveTab('results');
      }, 350);
    }
  };

  // Reset Test
  const resetTest = () => {
    setUserSelections([]);
    setCurrentQuestionIndex(0);
    setTestState('playing');
    setActiveTab('test');
  };

  // Create Custom Post
  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newPost: CommunityPost = {
      id: "post_" + Date.now(),
      author: newAuthor.trim(),
      avatarId: "avatar_" + (Math.floor(Math.random() * 5) + 1),
      text: newText.trim(),
      styleTag: newStyleTag,
      timestamp: "방금 전",
      likes: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('push_pull_community_posts_new', JSON.stringify(updatedPosts));

    // Clear inputs
    setNewAuthor('');
    setNewText('');
  };

  // Like Community Post
  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('push_pull_community_posts_new', JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen bg-[#f6fafe] text-[#171c1f] flex flex-col font-sans">
      
      {/* ────────────────────────────────────────────────────────
          HOMEPAGE STATIC FULL HEADER
          ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 w-full z-45 bg-white/95 backdrop-blur-md border-b border-[#eaeef2] shadow-sm select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-3.5 md:py-0 min-h-[5rem] flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => {
              setTestState('home');
              setActiveTab('test');
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-[#ff9f89] flex items-center justify-center shadow-md shadow-[#ff9f89]/25 group-hover:scale-105 duration-200">
              <span className="material-symbols-outlined text-white text-[20px] md:text-[24px] font-bold">favorite</span>
            </div>
            <div>
              <h1 className="font-display font-black text-base md:text-lg text-[#944937] leading-none tracking-tight">
                My Push-and-Pull Style
              </h1>
            </div>
          </div>

          {/* Navigation Links (Visible on both mobile & desktop) */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={() => {
                if (testState === 'playing') {
                  if (confirm("테스트를 중단하고 메인페이지로 가시겠습니까?")) {
                    setTestState('home');
                  }
                } else {
                  setTestState('home');
                  setActiveTab('test');
                }
              }}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'test' 
                  ? 'bg-[#ff9f89]/15 text-[#944937]' 
                  : 'text-[#54433f] hover:bg-[#f0f4f8]'
              }`}
            >
              자가 진단 테스트
            </button>
            <button 
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'guide' 
                  ? 'bg-[#ff9f89]/15 text-[#944937]' 
                  : 'text-[#54433f] hover:bg-[#f0f4f8]'
              }`}
            >
              밀당 장인 연애 백서
            </button>
          </nav>

          {/* Slogan pill or active counter */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#eaeef2] px-4 py-2 rounded-full text-xs font-bold text-[#54433f]">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>누적 참가자 124,052명 돌파</span>
          </div>

        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          MAIN EXPANSE BODY CONTENT
          ──────────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-16">
        <AnimatePresence mode="wait">

          {/* TAB 1: TEST PANEL */}
          {activeTab === 'test' && (
            <motion.div
              key="test_wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* 1.1: HOME LANDING VIEW */}
              {testState === 'home' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Column: Visual copy structure */}
                  <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">

                    <div className="space-y-3">
                      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#944937] leading-[1.12] tracking-tight">
                        카톡 알림창으로 보는<br />
                        <span className="text-[#171c1f]">나의 밀당스타일</span>
                      </h2>
                      <p className="text-sm md:text-base text-[#54433f]/70 font-bold tracking-wide select-none">
                        나의 유리멘탈 지수는?
                      </p>
                    </div>

                    {/* Action button container */}
                    <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button 
                        onClick={() => {
                          setUserSelections([]);
                          setCurrentQuestionIndex(0);
                          setTestState('playing');
                        }}
                        className="h-16 px-10 bg-[#ff9f89] hover:bg-[#ff9f89]/90 text-white font-display font-black rounded-2xl shadow-lg shadow-[#ff9f89]/25 hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center justify-center space-x-3 text-base cursor-pointer"
                        id="start_test_home"
                      >
                        <span>테스트 시작하기</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Giant Soft Responsive Illustration */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
                    <div className="absolute inset-0 bg-[#ffdad2] opacity-30 blur-[90px] rounded-full scale-90"></div>
                    
                    <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-full max-w-[340px] md:max-w-[400px]"
                    >
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVw0jTJAUzg-8WY_aRaKcr9ezvv4zNSDEjX2rzIuHExZVWBLtggnmxvIEdV0AdbbKW3g2-vTGsKXFffgop-xT-ej0VyUUiaf9DwCiiBnLg9PFBy_EpMxYGCfTk55JDrzgAiIUi1JVQ0cR-uKTass8gV4xObrhcImgLO2uipRP9QydC8XDP1NhWi0d6OFsqMZf5r4hY7WiPmssfY916nVZI6NjhcagJ0XsqgPxOwrx2OD6GPvAcEKveVH-3RVquADBbe47g90r6JyQ"
                        alt="Lovely pink smartphone graphic"
                        className="w-full h-auto object-contain filter drop-shadow-[0_25px_30px_rgba(148,73,55,0.15)]"
                      />
                    </motion.div>

                    {latestResult && (
                      <button 
                        onClick={() => setActiveTab('results')}
                        className="mt-6 h-14 w-full max-w-[340px] px-8 bg-white hover:bg-[#f6fafe] border-2 border-[#ff9f89] text-[#944937] font-display font-bold rounded-2xl duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>보관함 결과 열기</span>
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </button>
                    )}
                  </div>

                </div>
              )}

              {/* 1.2: ACTIVE TESTING INTERFACE */}
              {testState === 'playing' && (
                <div className="max-w-4xl mx-auto">
                  
                  {/* Top Progress Info Block */}
                  <div className="mb-4 md:mb-8 select-none bg-white p-3 md:p-6 rounded-2xl md:rounded-3xl border border-[#eaeef2] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                    <div className="space-y-0.5 md:space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#ff9f89] animate-pulse"></span>
                        <span className="font-display font-extrabold text-[#944937] text-xs md:text-sm">
                          진행 상태: 질문 {QUESTIONS[currentQuestionIndex].id} / 12
                        </span>
                      </div>
                      <p className="hidden md:block text-xs text-[#54433f]/70 font-medium">
                        질문에 솔직한 당신의 평소 카톡 심리를 대입해 답해 주세요.
                      </p>
                    </div>

                    {/* Progress track */}
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-64">
                      <div className="h-2.5 md:h-3.5 bg-[#eaeef2] rounded-full flex-1 overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(QUESTIONS[currentQuestionIndex].id / 12) * 100}%` }}
                          transition={{ type: "spring", stiffness: 65, damping: 14 }}
                          className="h-full bg-gradient-to-r from-[#ff9f89] to-[#944937] rounded-full"
                        />
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-[#944937] min-w-[28px] text-right">
                        {Math.round((QUESTIONS[currentQuestionIndex].id / 12) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Split Panel: Left text bubble and Illustration / Right Options stack */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">
                    
                    {/* Left: Bubble prompt & Big responsive graphic */}
                    <div className="md:col-span-12 lg:col-span-5 space-y-3 md:space-y-6">
                      
                      {/* Left AI chat visual prompt */}
                      <div className="bg-[#dce1ff] text-[#091842] p-3.5 md:p-6 rounded-2xl md:rounded-3xl rounded-bl-none shadow-sm relative chat-bubble-left select-all">
                        <div className="flex items-center space-x-2 mb-1 md:mb-2 bg-[#b8c5f8] px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-[9px] md:text-[10px] uppercase font-bold text-[#384570] filter drop-shadow-sm select-none w-max">
                          💬 Question {QUESTIONS[currentQuestionIndex].id}
                        </div>
                        <p className="font-display text-[15px] md:text-[17px] font-bold leading-snug md:leading-relaxed">
                          {QUESTIONS[currentQuestionIndex].text}
                        </p>
                      </div>

                      {/* Giant illustration card container */}
                      <div className="hidden md:block w-full h-56 rounded-3xl overflow-hidden shadow-md border border-[#eaeef2] relative group select-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                        <img 
                          src={QUESTIONS[currentQuestionIndex].illustrationUrl} 
                          alt={QUESTIONS[currentQuestionIndex].illustrationAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 duration-700"
                        />
                      </div>

                    </div>

                    {/* Right: Choices list stack with beautiful transitions */}
                    <div className="md:col-span-12 lg:col-span-7 space-y-2 md:space-y-4">
                      
                      {QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ x: 6, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleAnswerSelect(option.type)}
                            className="w-full p-3 md:p-6 bg-white border-2 border-transparent text-left rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(148,73,55,0.03)] hover:shadow-xl transition-all duration-200 hover:border-[#ff9f89] flex items-center justify-between gap-2.5 md:gap-4 cursor-pointer text-[#171c1f] group"
                          >
                            <div className="flex items-center gap-2.5 md:gap-4 flex-1">
                              <span className="w-7 h-7 md:w-9 md:h-9 rounded-xl md:rounded-2xl bg-[#ffdad2] text-[#944937] group-hover:bg-[#ff9f89] group-hover:text-white transition-colors text-xs md:text-sm font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                                {idx + 1}
                              </span>
                              <p className="font-body text-[13.5px] md:text-[16px] font-medium leading-snug md:leading-relaxed group-hover:text-[#944937] transition-colors flex-1">
                                {option.text}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-[#dac1bc] group-hover:text-[#944937] text-lg md:text-2xl transition-colors shrink-0">
                              check_circle
                            </span>
                          </motion.button>
                        );
                      })}

                      {/* Help Tip */}
                      <p className="hidden md:block text-[11px] text-[#54433f]/60 font-semibold text-center select-none pt-2">
                        💡 선택지는 안정형(S), 불안형(A), 회피형(V) 밸런스로 정밀히 작용합니다.
                      </p>
                    </div>

                  </div>

                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: DETAILED RESULTS DASHBOARD */}
          {activeTab === 'results' && (
            <motion.div
              key="results_wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {latestResult ? (
                <div className="space-y-8 max-w-5xl mx-auto">
                  
                  {/* Result Header visual intro banner */}
                  <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border border-[#eaeef2] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff9f89]/10 rounded-full blur-[80px] -z-10"></div>
                    
                    <div className="space-y-3 text-center md:text-left">
                      <div className="inline-flex items-center space-x-2 bg-[#ffdad2] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black text-[#783424] uppercase tracking-wider select-none">
                        💌 나의 정밀 연애 애착 분석 카드
                      </div>

                      <h2 className="font-display text-[19px] min-[370px]:text-[22px] min-[412px]:text-2xl sm:text-4xl md:text-5xl font-black text-[#944937] leading-tight select-all whitespace-nowrap">
                        {latestResult.title}
                      </h2>
                      <p className="text-[12.5px] min-[370px]:text-[14px] min-[412px]:text-base sm:text-lg md:text-xl text-[#54433f] italic font-semibold select-all leading-relaxed whitespace-nowrap">
                        {latestResult.subtitle}
                      </p>
                    </div>

                    {/* Result Profile Floating 3d avatar frame */}
                    <div className="relative select-none shrink-0">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-[#ff9f89] to-[#ffdad2] rounded-full p-1.5 sm:p-2 flex items-center justify-center shadow-lg shadow-[#ff9f89]/20"
                      >
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5 sm:p-2 overflow-hidden">
                          <img 
                            src={latestResult.imageUrl} 
                            alt={latestResult.title} 
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 sm:w-28 sm:h-28 object-contain scale-105"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* TWO-COLUMN DASHBOARD BENTO GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Circular Gauge & Description (lg:col-span-5) */}
                    <div className="lg:col-span-5 space-y-8">
                      
                      {/* Gauge Card */}
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#eaeef2] flex flex-col items-center justify-center text-center">
                        <span className="font-display text-xs font-extrabold text-[#54433f]/60 uppercase tracking-widest mb-6 block select-none">
                          유리멘탈 지수 (Mental Glass Gauge)
                        </span>

                        {/* Circular Progress SVG */}
                        <div className="relative w-48 h-48 mb-6">
                          <svg className="w-full h-full animate-fade" viewBox="0 0 160 160">
                            <circle 
                              className="text-[#f0f4f8] stroke-current" 
                              cx="80" 
                              cy="80" 
                              r="64" 
                              fill="transparent" 
                              strokeWidth="12"
                            />
                            <motion.circle 
                              className="text-[#ff9f89] stroke-current" 
                              cx="80" 
                              cy="80" 
                              r="64" 
                              fill="transparent" 
                              strokeWidth="12"
                              strokeDasharray={`${2 * Math.PI * 64}`}
                              initial={{ strokeDashoffset: `${2 * Math.PI * 64}` }}
                              animate={{ 
                                strokeDashoffset: gaugeTrigger 
                                  ? `${2 * Math.PI * 64 * (1 - latestResult.anxietyLevel / 100)}` 
                                  : `${2 * Math.PI * 64}` 
                              }}
                              transition={{ duration: 1.6, ease: "easeOut" }}
                              strokeLinecap="round"
                              style={{ 
                                transform: "rotate(-90deg)", 
                                transformOrigin: "50% 50%" 
                              }}
                            />
                          </svg>

                          {/* Center Text displaying percentage */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center -space-y-1">
                            <span className="text-4xl font-display font-black text-[#944937]">
                              {latestResult.anxietyLevel}%
                            </span>
                            <span className="text-[10px] font-black text-[#54433f]/50 bg-[#eaeef2] px-2.5 py-1 rounded-md uppercase tracking-wider scale-95">
                              {latestResult.anxietyLevel >= 75 ? "위태위태" : latestResult.anxietyLevel >= 50 ? "적당주의" : "강철단단"}
                            </span>
                          </div>
                        </div>

                        {/* Summary Narrative */}
                        <div className="border-t border-[#eaeef2] pt-6 w-full">
                          <h4 className="font-display font-bold text-sm text-[#171c1f] mb-2 select-none">성향 요약</h4>
                          <p className="text-[#54433f] text-[14px] leading-relaxed select-all">
                            {latestResult.description}
                          </p>
                        </div>
                      </div>

                      {/* Kakao-style Text Simulation Micro-Playground */}
                      <div className="bg-white p-6 rounded-3xl border border-[#eaeef2] shadow-sm space-y-4">
                        <span className="font-display text-[11px] font-bold text-[#54433f]/60 uppercase tracking-widest block mb-1 select-none">
                          💬 대화 시뮬레이션
                        </span>

                        {/* Partner Message (A / V / S reactive) */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#dce1ff] text-[#3a4772] flex items-center justify-center shrink-0 border border-white font-mono text-xs font-bold leading-none select-none">
                            👽
                          </div>
                          <div className="bg-[#dce1ff] text-[#091842] p-4 rounded-2xl rounded-bl-none max-w-[80%] font-body text-[13.5px] leading-relaxed relative chat-bubble-left shadow-sm select-all">
                            {latestResult.id === 'secure' && "바쁜 일이 있나 보네요. 먼저 푹 쉬고 편할 때 답장 줘요~"}
                            {latestResult.id === 'anxious' && "답장이 늦어서 많이 신경 쓰이셨나요? 미안해요, 바빴어서 이제야 봤어요!"}
                            {latestResult.id === 'avoidant' && "왜 자꾸 대화를 피하는 거 같죠? 조금 무심해서 섭섭할 때가 있어요."}
                            {latestResult.id === 'fearful' && "바람처럼 당겼다 밀었다 하니 도대체 진짜 마음이 뭔지 헷갈려요."}
                          </div>
                        </div>

                        {/* My Message (SAV reactive) */}
                        <div className="flex flex-row-reverse items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#ffdad2] text-[#944937] flex items-center justify-center shrink-0 border border-white font-mono text-xs font-bold leading-none select-none">
                            👤
                          </div>
                          <div className="bg-[#ff9f89] text-white p-4 rounded-2xl rounded-br-none max-w-[80%] font-body text-[13.5px] leading-relaxed relative chat-bubble-right shadow-sm select-all">
                            {latestResult.id === 'secure' && "네! 믿어줘서 편하고 좋네요. 저녁 맛있게 드시고 내일 봐요 🧸"}
                            {latestResult.id === 'anxious' && "안절부절 못하면서 대화창만 오백 번 복기하고 있었달까요...ㅠㅠ"}
                            {latestResult.id === 'avoidant' && "밀당하는 건 아닌데... 피곤하면 마음 셔터가 내려와서 저도 모르게 😭"}
                            {latestResult.id === 'fearful' && "좋아하는 만큼 상처받기 두려워서 저도 혼란스럽나 봐요.."}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Style evaluation & Prescription (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-8">
                      
                      {/* Push pull Style Analysis card */}
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#eaeef2] space-y-4">
                        <div className="flex items-center space-x-3 text-[#735c00] select-none">
                          <div className="bg-[#fcd664]/20 p-2.5 rounded-xl shrink-0">
                            <span className="material-symbols-outlined text-[#735c00]">insights</span>
                          </div>
                          <div>
                            <h4 className="font-display font-black text-xs uppercase tracking-wide">Relationship Strategy</h4>
                            <h3 className="font-display font-extrabold text-base text-[#171c1f] mt-0.5">나의 일상 밀당 스타일</h3>
                          </div>
                        </div>

                        <p className="font-body text-[15px] text-[#171c1f] leading-relaxed font-bold bg-[#fcd664]/10 border border-[#fcd664]/30 p-5 rounded-2xl select-all">
                          {latestResult.pushPullStyle}
                        </p>
                      </div>

                      {/* Therapeutic Prescription card */}
                      <div className="bg-[#ff9f89]/8 border border-[#ff9f89]/25 p-8 rounded-3xl space-y-4">
                        <div className="flex items-center space-x-3 text-[#944937] select-none">
                          <div className="bg-[#ffdad2] p-2.5 rounded-xl shrink-0">
                            <span className="material-symbols-outlined text-[#944937]">vaccines</span>
                          </div>
                          <div>
                            <h4 className="font-display font-black text-xs uppercase tracking-wide">Self-Compassion Prescription</h4>
                            <h3 className="font-display font-extrabold text-base text-[#171c1f] mt-0.5">따뜻한 자존감 처방전</h3>
                          </div>
                        </div>

                        <p className="font-body text-[15px] text-[#54433f] leading-relaxed italic bg-white/70 border border-[#ff9f89]/20 p-6 rounded-2xl select-all">
                          {latestResult.prescription}
                        </p>
                      </div>

                      {/* CTA Panel */}
                      <div className="bg-white p-8 rounded-3xl border border-[#eaeef2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 select-none">
                        <div>
                          <h4 className="font-bold text-sm text-[#171c1f]">마음에 드시나요?</h4>
                          <p className="text-xs text-[#54433f]/70 mt-1">링크를 복사해 친구와 공유하고 연정 전선을 비교해보세요.</p>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button 
                            onClick={() => {
                              const shareText = `[My Push-and-Pull Style]\n나의 유형: ${latestResult.title}\n유리멘탈 지수: ${latestResult.anxietyLevel}%\n\n지금 카톡 연애 자가 진단 테스트를 무상으로 진행해보세요 👉\n${window.location.href}`;
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(shareText);
                                alert("진단 결과 전문 정보가 클립보드에 복사되었습니다! 친구들에게 편하게 메신저로 공유하십시오 💕");
                              } else {
                                alert("복사 실패. 브라우저 설정을 확인해주세요.");
                              }
                            }}
                            className="bg-[#ff9f89] hover:bg-[#ff9f89]/90 text-white px-6 h-12 rounded-xl text-xs font-bold font-display flex items-center justify-center space-x-2 transition-all duration-150 cursor-pointer w-full sm:w-auto"
                          >
                            <span className="material-symbols-outlined text-xs">share</span>
                            <span>결과 클립보드 복사</span>
                          </button>

                          <button 
                            onClick={resetTest}
                            className="bg-transparent border-2 border-[#505c8a] hover:bg-[#505c8a]/5 text-[#505c8a] px-6 h-12 rounded-xl text-xs font-bold font-display flex items-center justify-center space-x-2 duration-150 cursor-pointer w-full sm:w-auto"
                          >
                            <span className="material-symbols-outlined text-xs">replay</span>
                            <span>다시하기</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                // Empty view container
                <div className="py-24 max-w-lg mx-auto bg-white rounded-3xl p-10 border border-[#eaeef2] shadow-sm text-center select-none">
                  <span className="material-symbols-outlined text-[64px] text-[#dac1bc] mb-4">analytics</span>
                  <h3 className="font-display font-extrabold text-xl text-[#54433f] mb-3">
                    저장된 분석 결과가 전혀 없습니다
                  </h3>
                  <p className="text-sm text-[#54433f]/75 leading-relaxed mb-8">
                    12개의 카카오톡 심리 질문 평가를 풀으셔야 본인만의 매칭 카드가 완성됩니다.
                  </p>
                  <button 
                    onClick={() => {
                      resetTest();
                      setTestState('playing');
                      setActiveTab('test');
                    }}
                    className="px-8 h-14 bg-[#ff9f89] text-white font-display font-bold text-sm rounded-xl shadow-md hover:scale-[1.03] duration-150 cursor-pointer"
                  >
                    지금 첫 진단 시작하기 &rarr;
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: COMMUNITY 익명 고민 상담소 Area */}
          {activeTab === 'community' && (
            <motion.div
              key="community_wrapper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left side column: Write Worry Box & informational message (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Topic banner */}
                  <div className="bg-[#ff9f89]/10 border border-[#ff9f89]/25 p-6 rounded-3xl select-none">
                    <h2 className="font-display font-extrabold text-[#944937] text-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-[24px]">forum</span>
                      익명 고민 상담소
                    </h2>
                    <p className="text-xs text-[#54433f] leading-relaxed mt-2.5 select-all">
                      밀고 당기기 속에서 지쳐버린 카카오톡 메신저 속 이야기들을 자유롭게 공유하세요. 서로에게 부담 없고 따뜻한 조언과 위로의 댓글을 선물할 수 있는 오픈 고민 소통망입니다.
                    </p>
                  </div>

                  {/* Submission form */}
                  <form onSubmit={handleCreatePost} className="bg-white p-6 rounded-3xl border border-[#eaeef2] shadow-sm space-y-4">
                    <h4 className="font-display font-extrabold text-xs text-[#944937] tracking-wider uppercase select-none">
                      ✏️ 나의 고민 공유하기
                    </h4>

                    {/* Metadata boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#54433f]/60 uppercase ml-1 block select-none">익명 주주 닉네임</label>
                        <input 
                          type="text" 
                          placeholder="예: 고민상담봇"
                          maxLength={12}
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          className="bg-[#f6fafe] border border-[#eaeef2] rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#ff9f89] focus:ring-1 focus:ring-[#ff9f89] w-full"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#54433f]/60 uppercase ml-1 block select-none">나의 밀당 본심</label>
                        <select
                          value={newStyleTag}
                          onChange={(e) => setNewStyleTag(e.target.value)}
                          className="bg-[#f6fafe] border border-[#eaeef2] rounded-xl px-3.5 py-3 text-xs font-bold text-[#944937] focus:outline-none focus:border-[#ff9f89] focus:ring-1 focus:ring-[#ff9f89] w-full select-none"
                        >
                          <option value="하트 시그널 과몰입러">하트 시그널 과몰입러</option>
                          <option value="소프트 아이스 아메리카노">소프트 아이스 아메리카노</option>
                          <option value="황금 밸런스 자유주의자">황금 밸런스 자유주의자</option>
                          <option value="시베리아 츤데레">시베리아 츤데레</option>
                        </select>
                      </div>
                    </div>

                    {/* TextArea body input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#54433f]/60 uppercase ml-1 block select-none">고민 내용 (최대 100자)</label>
                      <textarea 
                        placeholder="상대에게 상처받았거나, 답장을 보내기가 혼란스러운 순간을 귀엽게 털어놓아 보세요... 🌻"
                        maxLength={100}
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="bg-[#f6fafe] border border-[#eaeef2] rounded-xl px-4 py-3.5 text-xs font-medium focus:outline-none focus:border-[#ff9f89] resize-none h-24 w-full leading-relaxed"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      className="w-full h-11 bg-[#ff9f89] hover:bg-[#ff9f89]/90 active:scale-95 duration-100 text-white font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm select-none"
                    >
                      <span>익명 글 게재하기</span>
                      <span className="material-symbols-outlined text-xs font-bold">send</span>
                    </button>
                  </form>

                </div>

                {/* Right side column: Worry feed grid (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs font-extrabold text-[#54433f]/60 uppercase tracking-widest pl-2 mb-2 select-none flex justify-between items-center">
                    <span>실시간 고민 상담 피드</span>
                    <span className="text-[11px] text-[#ff9f89]">모두 익명 보장 🔒</span>
                  </div>

                  {posts.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-[#eaeef2] text-center select-none text-sm text-[#54433f]/60 font-semibold">
                      상담소에 등록된 글이 아직 존재하지 않습니다.
                    </div>
                  ) : (
                    posts.map((post) => (
                      <motion.div 
                        key={post.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-6 rounded-2xl border border-[#eaeef2] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col space-y-3"
                      >
                        {/* Author Profile section */}
                        <div className="flex items-center justify-between select-none">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-2xl bg-[#ffdad2] text-sm leading-none flex items-center justify-center text-[#944937] shrink-0 font-bold border border-white">
                              👤
                            </div>
                            <div>
                              <div className="text-xs font-black text-[#171c1f]">익명 {post.author}</div>
                              <div className="text-[10px] text-[#54433f]/60 tracking-wider font-semibold mt-0.5">{post.timestamp}</div>
                            </div>
                          </div>

                          <div className="bg-[#ffdad2] text-[#3c0701] px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 max-w-[150px] truncate">
                            <span>💡</span>
                            <span>{post.styleTag}</span>
                          </div>
                        </div>

                        {/* Contents text block */}
                        <p className="text-xs md:text-sm text-[#171c1f] leading-relaxed select-all">
                          {post.text}
                        </p>

                        {/* Heart Support Action */}
                        <div className="flex justify-end select-none">
                          <button 
                            onClick={() => handleLikePost(post.id)}
                            className="flex items-center text-[#ff9f89] hover:text-[#944937] hover:scale-105 duration-200 text-xs font-bold gap-1 bg-[#ff9f89]/10 hover:bg-[#ff9f89]/15 px-3.5 py-2 rounded-xl cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span>위로와 공감 {post.likes}</span>
                          </button>
                        </div>

                      </motion.div>
                    ))
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: RELATIONSHIP WISDOM GUIDEBOOK */}
          {activeTab === 'guide' && (
            <motion.div
              key="guide_wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl mx-auto space-y-8"
            >
              {/* Header Visual */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#eaeef2] shadow-sm relative overflow-hidden text-center max-w-4xl mx-auto select-none">
                <div className="absolute top-0 left-0 w-84 h-84 bg-[#a9b6e9]/10 rounded-full blur-[80px] -z-10"></div>
                
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#944937] leading-tight mb-3">
                  밀당 장인 연애 백서 📖
                </h2>
                <p className="text-sm md:text-base text-[#54433f] max-w-2xl mx-auto leading-relaxed">
                  카카오톡 메시지로 지친 마음의 안정을 찾기 위한 심리학 연애 규칙 가이드북입니다.<br />
                  세상 어떤 관계에도 마법처럼 안정적인 분위기를 전수해보세요.
                </p>
              </div>

              {/* Wisdom grid panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Rule Card 1 */}
                <div className="bg-white p-6 rounded-2xl border border-[#eaeef2] shadow-sm space-y-3">
                  <span className="text-3xl select-none">🚨</span>
                  <h3 className="font-display font-extrabold text-base text-[#944937] select-none">불안 수치 극복 훈련</h3>
                  <p className="text-xs md:text-sm text-[#171c1f] leading-relaxed select-all">
                    상대의 늦은 카톡 답장에 온종일 과몰입하는 악순환을 깨기 위해서는 휴대폰 화면을 보지 않는 <span className="font-bold text-[#944937]">매일 45분 집중 취미</span>(작업, 공부, 독서, 운동 일상 요법)을 적극 설계해 보십시오.
                  </p>
                </div>

                {/* Rule Card 2 */}
                <div className="bg-white p-6 rounded-2xl border border-[#eaeef2] shadow-sm space-y-3">
                  <span className="text-3xl select-none">🚪</span>
                  <h3 className="font-display font-extrabold text-base text-[#944937] select-none">회피성 동굴 매너</h3>
                  <p className="text-xs md:text-sm text-[#171c1f] leading-relaxed select-all">
                    자극이나 갈등에 지쳐 안읽씹 대화 차단을 시작하고 도망치기 전에, 상대방에게 <span className="font-bold text-[#944937]">"지금 잠시 회복할 여유가 필요해. 몇 시간 뒤에 답할게"</span> 하고 한마디를 적어 두면 관계 파국을 아름답게 막을 수 있는 큰 자원이 됩니다.
                  </p>
                </div>

                {/* Rule Card 3 */}
                <div className="bg-white p-6 rounded-2xl border border-[#eaeef2] shadow-sm space-y-3">
                  <span className="text-3xl select-none">🤝</span>
                  <h3 className="font-display font-extrabold text-base text-[#944937] select-none">황금 밸런스 소통법</h3>
                  <p className="text-xs md:text-sm text-[#171c1f] leading-relaxed select-all">
                    서로의 독립된 바쁜 사생활 영역에 경의를 표하며 넓게 존중해 주십시오. 있는 그대로의 감정을 솔직하고 다정하게 조율할 때 비로소 읽음 숫자에 매달리지 않는 탄탄하고 이쁜 사랑을 전수받을 수 있습니다.
                  </p>
                </div>

              </div>

              {/* Extra self compassion footer note */}
              <div className="bg-[#ff9f89]/10 p-6 md:p-8 rounded-2xl text-center select-all text-xs md:text-sm text-[#54433f] font-medium leading-relaxed max-w-4xl mx-auto">
                "이 진단 웹사이트의 성향 요약은 당신을 낙인찍기 위해서 작동되는 것이 결코 아닙니다.<br />
                그저 사랑에 정성을 다하는 경보기(불안)와, 자존감을 지키는 방어기제(회피)가 조율을 맞춰가는 과정임을 기억하세요."
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ────────────────────────────────────────────────────────
          HOMEPAGE STATIC FULL FOOTER
          ──────────────────────────────────────────────────────── */}
      <footer className="w-full bg-white border-t border-[#eaeef2] py-8 text-center select-none mt-12">
        <div className="max-w-7xl mx-auto px-6 text-[#54433f]/70 text-xs space-y-3 leading-relaxed">
          <p className="font-bold text-[#944937]">My Push-and-Pull Style © 2026. All rights reserved.</p>
          <p>이 홈페이지의 모든 진단 평가는 메신저 소통을 다루는 심리학 이론과 자존감 처방 백서를 바탕으로 구성된 소통 자가 진단 및 고민 플랫폼입니다.</p>
          <div className="flex items-center justify-center space-x-4 pt-1 font-bold">
            <button onClick={() => { setTestState('home'); setActiveTab('test'); }} className="hover:text-[#944937] cursor-pointer">진단하기</button>
            <span>•</span>
            <button onClick={() => setActiveTab('results')} className="hover:text-[#944937] cursor-pointer">내 보관함</button>
            <span>•</span>
            <button onClick={() => setActiveTab('guide')} className="hover:text-[#944937] cursor-pointer">백서 가이드</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
