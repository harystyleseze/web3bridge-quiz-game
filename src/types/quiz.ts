export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeRemaining: number;
  gameStatus: 'idle' | 'playing' | 'finished';
  userAnswers: number[];
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
}