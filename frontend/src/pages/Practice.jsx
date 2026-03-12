import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Practice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category') || 'java';
  const difficultyParam = (searchParams.get('difficulty') || 'easy').toLowerCase();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/questions?category=${categoryParam}&difficulty=${difficultyParam}`);
        
        // Randomly slice 10 questions to ensure variety (as per requirement: "questions must be randomized")
        const shuffled = data.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch challenges. Please try again.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryParam, difficultyParam]);

  useEffect(() => {
    if (timeLeft > 0 && !loading && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !loading && questions.length > 0) {
      handleNext();
    }
  }, [timeLeft, loading, questions]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestionIndex];
    const userSelectedText = selectedOption !== null ? currentQ.options[selectedOption] : null;
    
    const isCorrect = userSelectedText === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Track answers for results page
    setUserAnswers([...userAnswers, {
      question: currentQ.questionText,
      selected: userSelectedText,
      correct: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation
    }]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimeLeft(60);
    } else {
      handleFinish(isCorrect ? score + 1 : score, [...userAnswers, {
        question: currentQ.questionText,
        selected: userSelectedText,
        correct: currentQ.correctAnswer,
        isCorrect,
        explanation: currentQ.explanation
      }]);
    }
  };

  const handleFinish = (finalScore, finalAnswers) => {
    navigate('/result', { 
      state: { 
        score: finalScore, 
        total: questions.length,
        category: categoryParam,
        difficulty: difficultyParam,
        userAnswers: finalAnswers
      } 
    });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-text-muted font-bold text-xl">Loading Challenges...</p>
    </div>
  );

  if (error) return (
    <div className="glass-card p-10 border-accent/20 flex flex-col items-center gap-6">
      <span className="material-symbols-outlined text-6xl text-accent">error</span>
      <p className="text-xl font-bold">{error}</p>
      <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
    </div>
  );
  
  if (questions.length === 0) return (
    <div className="glass-card p-10 flex flex-col items-center gap-6 text-center">
      <span className="material-symbols-outlined text-6xl text-text-muted">search_off</span>
      <div>
        <h3 className="text-2xl font-bold mb-2">No Challenges Found</h3>
        <p className="text-text-muted">We couldn't find any questions for {categoryParam} - {difficultyParam}.</p>
      </div>
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Go Home</button>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in mb-24 relative">
      {/* Immersive Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-card p-8 bg-surface/60 border-primary/20">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Session in Progress</p>
          <h2 className="text-3xl font-outfit font-black capitalize flex items-center gap-3">
             <span className="p-2 bg-primary/10 rounded-xl text-primary material-symbols-outlined">quiz</span>
             {categoryParam} Mastery
          </h2>
          <div className="flex gap-3">
            <span className="text-[9px] font-black uppercase px-3 py-1 bg-primary text-white rounded-lg tracking-widest shadow-lg shadow-primary/20">
               {difficultyParam}
            </span>
            <span className="text-[9px] font-black uppercase px-3 py-1 bg-background text-text-muted rounded-lg border border-border tracking-widest">
               QC: {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        </div>
        
        <div className={`group flex items-center gap-5 px-8 py-4 rounded-[2rem] border-2 transition-all duration-500 shadow-2xl ${
          timeLeft <= 10 ? 'bg-accent/10 border-accent shadow-accent/20 text-accent' : 'bg-background border-border text-text-main hover:border-primary/50'
        }`}>
          <span className={`material-symbols-outlined text-4xl ${timeLeft <= 10 ? 'animate-pulse font-fill' : 'group-hover:rotate-12 transition-transform'}`}>
            {timeLeft <= 10 ? 'notifications_active' : 'schedule'}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-xs font-black uppercase tracking-widest opacity-60 leading-none mb-1">Time Remaining</span>
            <span className="text-4xl font-black font-mono leading-none tracking-tighter">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-2">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-xs font-black uppercase text-text-muted tracking-widest">Momentum Tracking</span>
          </div>
          <span className="text-primary font-black text-xl tracking-tighter">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-6 bg-background rounded-full p-1.5 border border-border shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="glass-card p-10 relative overflow-hidden group/card border-border">
        <h3 className="text-3xl font-bold leading-relaxed mb-12 text-text-main">
          {currentQuestion.questionText}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 relative ${
                selectedOption === index 
                  ? 'border-primary bg-primary/10 shadow-lg' 
                  : 'border-border bg-surface hover:border-primary/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                selectedOption === index ? 'border-primary bg-primary text-white' : 'border-border bg-background'
              }`}>
                <span className={`text-sm font-bold ${selectedOption === index ? 'hidden' : 'block text-text-muted'}`}>
                    {String.fromCharCode(65 + index)}
                </span>
                {selectedOption === index && (
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                )}
              </div>
              <span className={`text-lg font-bold ${
                selectedOption === index ? 'text-text-main' : 'text-text-muted'
              }`}>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-6">
        <p className="text-sm font-bold text-text-muted italic flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">lightbulb</span>
            Accuracy is key. Precision counts towards your global rank.
        </p>
        <button 
          className={`premium-btn px-16 py-6 w-full md:w-auto shadow-2xl ${
            selectedOption === null ? 'opacity-30 cursor-not-allowed grayscale pointer-events-none' : ''
          }`} 
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Advance Track' : 'Finalize Sequence'}
          <span className="material-symbols-outlined font-bold text-2xl">
            {currentQuestionIndex < questions.length - 1 ? 'arrow_forward' : 'verified_user'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Practice;
