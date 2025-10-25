import React, { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '../../types/quiz';
import { storage } from '../../utils/storage';

interface LeaderboardProps {
  currentScore?: number;
  totalQuestions?: number;
  currentUsername?: string;
  onPlayAgain?: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentScore = 0,
  totalQuestions = 0,
  currentUsername = '',
  onPlayAgain,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [previousBest, setPreviousBest] = useState(0);

  useEffect(() => {
    const savedLeaderboard = storage.getLeaderboard();
    setLeaderboard(savedLeaderboard.slice(0, 10)); // Display only top 10
  }, []);

  // Automatically save score when quiz is completed
  useEffect(() => {
    if (currentScore > 0 && totalQuestions > 0 && currentUsername && !scoreSaved) {
      // Check if user already has a score
      const existingEntry = storage.getLeaderboard().find(
        e => e.username.toLowerCase() === currentUsername.toLowerCase()
      );
      
      if (existingEntry) {
        setPreviousBest(existingEntry.score);
        setIsNewBest(currentScore > existingEntry.score);
      } else {
        setIsNewBest(true); // First time player
      }

      const entry = {
        username: currentUsername,
        score: currentScore,
        date: new Date().toISOString(),
        totalQuestions,
        correctAnswers: currentScore,
      };
      
      storage.saveToLeaderboard(entry);
      const updatedLeaderboard = storage.getLeaderboard();
      setLeaderboard(updatedLeaderboard.slice(0, 10)); // Display only top 10
      setScoreSaved(true);
    }
  }, [currentScore, totalQuestions, currentUsername, scoreSaved]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🏆 Leaderboard
      </h2>

      {currentScore > 0 && scoreSaved && isNewBest && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-center font-medium">
            {previousBest > 0 
              ? `🎉 New personal best! Previous: ${previousBest}/${totalQuestions}`
              : '🎉 Your score has been saved to the leaderboard!'
            }
          </p>
        </div>
      )}

      {currentScore > 0 && scoreSaved && !isNewBest && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-center font-medium">
            Your score: {currentScore}/{totalQuestions} • Best: {previousBest}/{totalQuestions}
          </p>
          <p className="text-yellow-700 text-center text-sm mt-1">
            Keep playing to beat your record!
          </p>
        </div>
      )}

      {leaderboard.length > 0 ? (
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                currentUsername.toLowerCase() === entry.username.toLowerCase()
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : index === 0 ? 'border-yellow-400 bg-yellow-50' :
                  index === 1 ? 'border-gray-400 bg-gray-50' :
                  index === 2 ? 'border-orange-400 bg-orange-50' :
                  'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  index === 0 ? 'bg-yellow-400 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-400 text-white' :
                  'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-800">
                    {entry.username}
                    {currentUsername.toLowerCase() === entry.username.toLowerCase() && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">You</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {entry.score} / {entry.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round((entry.correctAnswers / entry.totalQuestions) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No scores yet. Be the first to top the leaderboard!
        </div>
      )}

      {onPlayAgain && (
        <div className="text-center mt-6">
          <button
            onClick={onPlayAgain}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};