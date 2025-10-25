import React, { useEffect, useState } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import { Question } from '../Question/Question';
import { Timer } from '../Timer/Timer';
import { Button } from '../common/Button';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import { storage } from '../../utils/storage';

const TIME_PER_QUESTION = 30;

export const Quiz: React.FC = () => {
  const {
    questions,
    currentQuestion,
    state,
    progress,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuiz();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const userProfile = storage.getUserProfile();
    if (userProfile?.username) {
      setUsername(userProfile.username);
    }
  }, []);

  if (state.gameStatus === 'idle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Web3Bridge Quiz
          </h1>
          <p className="text-gray-600 mb-2">
            Test your knowledge with our interactive quiz!
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {questions.length} questions • {TIME_PER_QUESTION}s per question
          </p>

          {username && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Welcome back, <strong>{username}</strong>!
              </p>
            </div>
          )}

          <Button
            onClick={startQuiz}
            className="w-full py-4 text-lg"
          >
            Start Quiz
          </Button>

          <div className="mt-8">
            <Leaderboard />
          </div>
        </div>
      </div>
    );
  }

  if (state.gameStatus === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz Completed! 🎉
            </h1>
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {state.score} / {questions.length}
            </div>
            <p className="text-gray-600 text-lg mb-2">
              You got {state.score} out of {questions.length} questions correct!
            </p>
            <p className="text-gray-500 mb-6">
              That's {Math.round((state.score / questions.length) * 100)}% correct answers.
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="secondary">
                Back to Start
              </Button>
              <Button onClick={startQuiz}>
                Play Again
              </Button>
            </div>
          </div>

          <Leaderboard
            currentScore={state.score}
            totalQuestions={questions.length}
            onPlayAgain={startQuiz}
          />
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Web3Bridge Quiz
            </h1>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-800">
                Score: <span className="text-blue-600">{state.score}</span>
              </div>
              <div className="text-sm text-gray-600">
                Question {state.currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <Timer timeRemaining={state.timeRemaining} totalTime={TIME_PER_QUESTION} />

        {/* Question */}
        <Question
          question={currentQuestion}
          selectedAnswer={state.selectedAnswer}
          isAnswered={state.isAnswered}
          onAnswerSelect={selectAnswer}
        />

        {/* Next Button */}
        {state.isAnswered && (
          <div className="text-center">
            <Button onClick={nextQuestion} className="px-8 py-3">
              {state.currentQuestionIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};