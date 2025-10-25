import { renderHook, act } from '@testing-library/react';
import { useQuiz } from '../hooks/useQuiz';

// Mock the questions data
jest.mock('../data/questions.json', () => [
  {
    id: 1,
    question: 'Test question 1?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0,
    explanation: 'Test explanation 1',
    category: 'Test',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'Test question 2?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 1,
    explanation: 'Test explanation 2',
    category: 'Test',
    difficulty: 'medium'
  }
]);

describe('useQuiz', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should initialize with idle state', () => {
    const { result } = renderHook(() => useQuiz());
    
    expect(result.current.state.gameStatus).toBe('idle');
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.currentQuestionIndex).toBe(0);
  });

  test('should start quiz', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    expect(result.current.state.gameStatus).toBe('playing');
    expect(result.current.state.timeRemaining).toBe(30);
  });

  test('should select correct answer and update score', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    act(() => {
      result.current.selectAnswer(0); // Correct answer for first question
    });

    expect(result.current.state.score).toBe(1);
    expect(result.current.state.isAnswered).toBe(true);
  });

  test('should select wrong answer and not update score', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    act(() => {
      result.current.selectAnswer(1); // Wrong answer for first question
    });

    expect(result.current.state.score).toBe(0);
    expect(result.current.state.isAnswered).toBe(true);
  });

  test('should move to next question', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    act(() => {
      result.current.selectAnswer(0);
    });

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.state.currentQuestionIndex).toBe(1);
    expect(result.current.state.isAnswered).toBe(false);
    expect(result.current.state.timeRemaining).toBe(30);
  });

  test('should finish quiz after last question', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    // Answer first question
    act(() => {
      result.current.selectAnswer(0);
    });

    act(() => {
      result.current.nextQuestion();
    });

    // Answer second question
    act(() => {
      result.current.selectAnswer(1);
    });

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.state.gameStatus).toBe('finished');
  });

  test('should handle timer expiration', () => {
    const { result } = renderHook(() => useQuiz());
    
    act(() => {
      result.current.startQuiz();
    });

    // Advance timer by 30 seconds
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(result.current.state.isAnswered).toBe(true);
    expect(result.current.state.timeRemaining).toBe(0);
  });
});