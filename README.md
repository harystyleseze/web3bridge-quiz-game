# 🎯 Web3Bridge Quiz Game

An interactive quiz application built with React, TypeScript, and Vite. Test your knowledge across various topics including Programming, Web Development, Geography, and Algorithms!

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://harystyleseze.github.io/web3bridge-quiz-game/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)

## 🎮 Live Demo

Play the game now: [https://harystyleseze.github.io/web3bridge-quiz-game/](https://harystyleseze.github.io/web3bridge-quiz-game/)

## 📋 Table of Contents

- [Features](#-features)
- [How to Play](#-how-to-play)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Core Features

- **🎯 Interactive Quiz System**
  - Multiple-choice questions with 4 options
  - Instant feedback on answers (correct/incorrect)
  - Detailed explanations after each answer
  - Progress tracking throughout the quiz

- **⏱️ Countdown Timer**
  - 30 seconds per question
  - Visual timer with color coding (green → yellow → red)
  - Automatic submission when time expires

- **🏆 Leaderboard System**
  - Top 10 players displayed
  - Single best score per player (no duplicates)
  - Personal best tracking
  - Real-time leaderboard updates
  - Visual ranking with medals (🥇 Gold, 🥈 Silver, 🥉 Bronze)

- **👤 Player Management**
  - Mandatory name entry before starting
  - Persistent user profiles (remembers returning players)
  - Case-insensitive username matching
  - Player name displayed during gameplay

- **📊 Smart Score Tracking**
  - Only saves your best score
  - Comparison with previous attempts
  - Percentage calculation
  - Score history with timestamps

### Additional Features

- **🎨 Beautiful UI/UX**
  - Modern, responsive design with Tailwind CSS
  - Smooth animations and transitions
  - Color-coded feedback (green for correct, red for incorrect)
  - Gradient backgrounds and card-based layouts

- **💾 Local Storage**
  - Persistent leaderboard data
  - User profile storage
  - Maintains top 50 scores internally
  - Automatic data synchronization

- **📱 Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Adaptive layouts for different screen sizes
  - Touch-friendly interface

- **🔒 Type-Safe Development**
  - Full TypeScript implementation
  - Type definitions for all components
  - Compile-time error checking

## 🎮 How to Play

### Step 1: Enter Your Name
1. Visit the game URL
2. Enter your name in the input field
3. Press Enter or click "Start Quiz"

### Step 2: Answer Questions
1. Read the question carefully
2. You have 30 seconds per question (watch the timer!)
3. Click on one of the four options (A, B, C, or D)
4. See immediate feedback:
   - ✅ **Green border** = Correct answer
   - ❌ **Red border** = Your incorrect answer
   - The correct answer is always highlighted in green

### Step 3: Learn from Explanations
- After answering, read the explanation to understand why
- Click "Next Question" to continue
- Track your progress at the top of the screen

### Step 4: View Your Results
1. After completing all questions, see your final score
2. Your score is automatically saved to the leaderboard
3. Check if you beat your previous best score
4. Compare your score with other players

### Step 5: Play Again
- Click "Play Again" to try to beat your score
- Or click "Back to Start" to return to the home screen

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - UI library
- **TypeScript 5.9** - Type-safe development
- **Vite 7.1** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework

### Testing
- **Jest 29.7** - Testing framework
- **React Testing Library 16.1** - Component testing
- **ts-jest** - TypeScript support for Jest

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment
- **GitHub Pages** - Static site hosting
- **gh-pages** - Deployment automation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harystyleseze/web3bridge-quiz-game.git
   cd web3bridge-quiz-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173/web3bridge-quiz-game/`

## 📁 Project Structure

```
web3bridge-quiz-game/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Button.tsx          # Reusable button component
│   │   ├── Leaderboard/
│   │   │   └── Leaderboard.tsx     # Leaderboard display
│   │   ├── Question/
│   │   │   └── Question.tsx        # Question card component
│   │   ├── Quiz/
│   │   │   └── Quiz.tsx            # Main quiz orchestrator
│   │   └── Timer/
│   │       └── Timer.tsx           # Countdown timer
│   ├── data/
│   │   └── questions.json          # Quiz questions database
│   ├── hooks/
│   │   └── useQuiz.ts              # Quiz logic custom hook
│   ├── tests/
│   │   ├── Quiz.test.tsx           # Quiz component tests
│   │   └── useQuiz.test.ts         # Hook tests
│   ├── types/
│   │   └── quiz.ts                 # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts              # LocalStorage utilities
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── dist/                           # Production build output
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── jest.config.js                  # Jest testing configuration
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run all tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run deploy` | Deploy to GitHub Pages |

## 🧪 Testing

The project includes comprehensive tests for components and logic:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Quiz component rendering
- ✅ User interactions (name input, button clicks)
- ✅ Quiz state management
- ✅ Timer functionality
- ✅ Score calculation
- ✅ Answer selection and validation

## 🚢 Deployment

### Deploy to GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

The app will be deployed to: `https://harystyleseze.github.io/web3bridge-quiz-game/`

### Manual Deployment

If you want to deploy to a different platform:

1. Build the project: `npm run build`
2. The `dist/` folder contains the production-ready files
3. Upload the contents of `dist/` to your hosting provider

## 🎯 Key Implementation Details

### Score Management
- Each user maintains **only one entry** on the leaderboard
- Only the **best score** is saved and displayed
- Lower scores don't overwrite better scores
- Users receive feedback on whether they beat their record

### Timer System
- 30 seconds per question
- Visual countdown with color indicators
- Automatic answer submission on timeout
- Timer pauses after answer selection

### Data Persistence
- LocalStorage API for data persistence
- Leaderboard data survives page refreshes
- User profile remembers last used name
- Stores up to 50 scores internally, displays top 10

### Smart Leaderboard
- Case-insensitive username matching
- Sorts by score (descending), then by date
- Highlights current player's entry
- Shows timestamp for each score

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Adding New Questions

Edit `src/data/questions.json`:

```json
{
  "id": 6,
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explanation of the correct answer.",
  "category": "Category Name",
  "difficulty": "easy|medium|hard"
}
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Harystyles**
- GitHub: [@harystyleseze](https://github.com/harystyleseze)
- Repository: [web3bridge-quiz-game](https://github.com/harystyleseze/web3bridge-quiz-game)

## 🙏 Acknowledgments

- Built as part of Web3Bridge assessment test

---