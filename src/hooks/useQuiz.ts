import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState } from '../types/quiz';
import questionsData from '../data/questions.json';

const TIME_PER_QUESTION = 30; // seconds

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeRemaining: TIME_PER_QUESTION,
    gameStatus: 'idle',
    userAnswers: [],
  });

  // Load questions
  useEffect(() => {
    try {
      setQuestions(questionsData);
    } catch (error) {
      console.error('Failed to load questions:', error);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.gameStatus !== 'playing' || state.isAnswered) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            timeRemaining: 0,
            isAnswered: true,
            userAnswers: [...prev.userAnswers, -1], // -1 indicates timeout
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameStatus, state.isAnswered]);

  const startQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeRemaining: TIME_PER_QUESTION,
      gameStatus: 'playing',
      userAnswers: [],
    });
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (state.isAnswered) return;

    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const scoreIncrement = isCorrect ? 1 : 0;

    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: prev.score + scoreIncrement,
      userAnswers: [...prev.userAnswers, answerIndex],
    }));
  }, [state.currentQuestionIndex, state.isAnswered, questions]);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex >= questions.length) {
        return { ...prev, gameStatus: 'finished' };
      }
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswered: false,
        timeRemaining: TIME_PER_QUESTION,
      };
    });
  }, [questions.length]);

  const resetQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeRemaining: TIME_PER_QUESTION,
      gameStatus: 'idle',
      userAnswers: [],
    });
  }, []);

  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = questions.length > 0 ? ((state.currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return {
    questions,
    currentQuestion,
    state,
    progress,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  };
};