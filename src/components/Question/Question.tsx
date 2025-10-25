import React from 'react';
import type { Question as QuestionType } from '../../types/quiz';

interface QuestionProps {
  question: QuestionType;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
}) => {
  const getOptionStyles = (index: number) => {
    let baseStyles = 'p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ';
    
    if (!isAnswered) {
      baseStyles += 'border-gray-300 hover:border-blue-500 hover:bg-blue-50';
    } else {
      if (index === question.correctAnswer) {
        baseStyles += 'border-green-500 bg-green-50 text-green-800';
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseStyles += 'border-red-500 bg-red-50 text-red-800';
      } else {
        baseStyles += 'border-gray-300 bg-gray-100 text-gray-500';
      }
    }

    if (selectedAnswer === index && !isAnswered) {
      baseStyles += ' border-blue-500 bg-blue-50';
    }

    return baseStyles;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          {question.category}
        </span>
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {question.difficulty}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={getOptionStyles(index)}
            onClick={() => !isAnswered && onAnswerSelect(index)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3 font-medium">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>

      {isAnswered && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};