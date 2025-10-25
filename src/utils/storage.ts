const STORAGE_KEYS = {
  LEADERBOARD: 'quiz_leaderboard',
  USER_PROFILE: 'quiz_user_profile',
} as const;

export const storage = {
  // Leaderboard
  getLeaderboard: (): LeaderboardEntry[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADERBOARD) || '[]');
    } catch {
      return [];
    }
  },

  saveToLeaderboard: (entry: Omit<LeaderboardEntry, 'id'>): void => {
    try {
      const leaderboard = storage.getLeaderboard();
      const newEntry: LeaderboardEntry = {
        ...entry,
        id: Date.now().toString(),
      };
      leaderboard.push(newEntry);
      leaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard.slice(0, 10))); // Keep top 10
    } catch (error) {
      console.error('Failed to save to leaderboard:', error);
    }
  },

  // User Profile
  getUserProfile: (): { username: string } | null => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || 'null');
    } catch {
      return null;
    }
  },

  saveUserProfile: (username: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify({ username }));
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  },
};