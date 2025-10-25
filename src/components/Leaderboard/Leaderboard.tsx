import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from '../../types/quiz';
import { storage } from '../../utils/storage';

interface LeaderboardProps {
  currentScore?: number;
  totalQuestions?: number;
  onPlayAgain?: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentScore = 0,
  totalQuestions = 0,
  onPlayAgain,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedLeaderboard = storage.getLeaderboard();
    setLeaderboard(savedLeaderboard);
    
    const userProfile = storage.getUserProfile();
    if (userProfile?.username) {
      setUsername(userProfile.username);
    }
  }, []);

  const handleSaveScore = () => {
    if (username.trim()) {
      const entry = {
        username: username.trim(),
        score: currentScore,
        date: new Date().toISOString(),
        totalQuestions,
        correctAnswers: currentScore,
      };
      
      storage.saveToLeaderboard(entry);
      storage.saveUserProfile(username.trim());
      setLeaderboard(storage.getLeaderboard());
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🏆 Leaderboard
      </h2>

      {currentScore > 0 && !showForm && leaderboard.length === 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-center">
            You scored {currentScore} out of {totalQuestions}! Save your score to the leaderboard.
          </p>
          <div className="text-center mt-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save My Score
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your username:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
              maxLength={20}
            />
            <button
              onClick={handleSaveScore}
              disabled={!username.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {leaderboard.length > 0 ? (
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                index === 0 ? 'border-yellow-400 bg-yellow-50' :
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
                  <div className="font-semibold text-gray-800">{entry.username}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()}
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