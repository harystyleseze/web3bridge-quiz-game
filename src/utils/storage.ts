import type { LeaderboardEntry } from '../types/quiz';

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
      
      // Find existing entry for this user
      const existingEntryIndex = leaderboard.findIndex(
        e => e.username.toLowerCase() === entry.username.toLowerCase()
      );

      if (existingEntryIndex !== -1) {
        const existingEntry = leaderboard[existingEntryIndex];
        
        // Only update if the new score is better
        if (entry.score > existingEntry.score) {
          leaderboard[existingEntryIndex] = {
            ...entry,
            id: existingEntry.id, // Keep the same ID
            date: new Date().toISOString(), // Update date to show when they achieved this score
          };
        } else {
          // If new score is not better, don't save it
          return;
        }
      } else {
        // New user - add their entry
        const newEntry: LeaderboardEntry = {
          ...entry,
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        leaderboard.push(newEntry);
      }

      // Sort by score (descending), then by date (most recent first)
      leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard.slice(0, 50))); // Keep top 50
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