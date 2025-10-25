import { render, screen } from '@testing-library/react';
import { Quiz } from '../components/Quiz/Quiz';

// Mock the hooks and components
jest.mock('../hooks/useQuiz', () => ({
  useQuiz: () => ({
    questions: [
      {
        id: 1,
        question: 'Test question 1?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Test explanation 1',
        category: 'Test',
        difficulty: 'easy'
      }
    ],
    currentQuestion: {
      id: 1,
      question: 'Test question 1?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Test explanation 1',
      category: 'Test',
      difficulty: 'easy'
    },
    state: {
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeRemaining: 30,
      gameStatus: 'idle' as const,
      userAnswers: []
    },
    progress: 0,
    startQuiz: jest.fn(),
    selectAnswer: jest.fn(),
    nextQuestion: jest.fn(),
    resetQuiz: jest.fn()
  })
}));

describe('Quiz', () => {
  test('renders start screen with name input', () => {
    render(<Quiz />);
    
    expect(screen.getByText('🎯 Web3Bridge Quiz')).toBeTruthy();
    expect(screen.getByText('Enter your name to start:')).toBeTruthy();
    expect(screen.getByPlaceholderText('Your name')).toBeTruthy();
    expect(screen.getByText('Start Quiz')).toBeTruthy();
  });

  test('renders leaderboard on start screen', () => {
    render(<Quiz />);
    
    expect(screen.getByText('🏆 Leaderboard')).toBeTruthy();
  });

  test('start button is disabled when name is empty', () => {
    render(<Quiz />);
    
    const startButton = screen.getByText('Start Quiz') as HTMLButtonElement;
    expect(startButton.disabled).toBe(true);
  });
});