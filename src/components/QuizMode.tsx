import React, { useState } from 'react';
import { Award, AlertCircle, CheckCircle2, ArrowRight, RotateCcw, CheckSquare } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import '../styles/components.css';

export const QuizMode: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerRevealed(true);
    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    return (
      <div className="glass-panel max-w-2xl mx-auto p-8 text-center flex flex-col items-center justify-center min-h-[400px]" role="alert">
        <Award size={64} className="text-amber-400 mb-6" aria-hidden="true" />
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-xl text-slate-300 mb-8">
          You scored <span className="text-white font-bold">{score}</span> out of {QUIZ_QUESTIONS.length} ({percentage}%)
        </p>
        
        <div className="w-full bg-slate-800 rounded-full h-4 mb-8 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full transition-all duration-1000" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-slate-400 mb-8 max-w-md">
          {percentage === 100 ? "Perfect score! You are fully prepared for the elections." :
           percentage >= 60 ? "Great job! You have a solid understanding of the electoral process." :
           "Good effort! Review the timeline and simulation to brush up on your knowledge."}
        </p>

        <button onClick={handleRestart} className="action-btn" aria-label="Retake the quiz">
          <RotateCcw size={18} aria-hidden="true" /> Retake Quiz
        </button>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col" role="region" aria-label={`Question ${currentQuestion + 1}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckSquare className="text-indigo-400" aria-hidden="true" /> Knowledge Check
        </h2>
        <div className="text-slate-400 font-medium">
          Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 mb-8 overflow-hidden" role="progressbar" aria-valuenow={((currentQuestion) / QUIZ_QUESTIONS.length) * 100} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="bg-indigo-500 h-full transition-all duration-300" 
          style={{ width: `${((currentQuestion) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="glass-panel p-8 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
          {question.text}
        </h3>

        <div className="space-y-3 mb-8 flex-1">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            
            let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
            
            if (!isAnswerRevealed) {
              optionClass += isSelected 
                ? "bg-indigo-500/20 border-indigo-500 text-white" 
                : "bg-slate-800/50 border-white/10 text-slate-300 hover:border-indigo-400/50 hover:bg-slate-800";
            } else {
              if (isCorrect) {
                optionClass += "bg-emerald-500/20 border-emerald-500 text-white";
              } else if (isSelected && !isCorrect) {
                optionClass += "bg-rose-500/20 border-rose-500 text-white";
              } else {
                optionClass += "bg-slate-800/20 border-white/5 text-slate-500 opacity-50";
              }
            }

            return (
              <button 
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswerRevealed}
                className={optionClass}
              >
                <span className="font-medium">{option}</span>
                {isAnswerRevealed && isCorrect && <CheckCircle2 className="text-emerald-500" />}
                {isAnswerRevealed && isSelected && !isCorrect && <AlertCircle className="text-rose-500" />}
              </button>
            );
          })}
        </div>

        {isAnswerRevealed && (
          <div className="mb-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 flex items-start gap-3 fade-in">
            <AlertCircle className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-white/10">
          {!isAnswerRevealed ? (
            <button 
              className="action-btn"
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
            >
              Check Answer
            </button>
          ) : (
            <button 
              className="action-btn"
              onClick={handleNextQuestion}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
