'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import Link from 'next/link';

export default function RandomPlayPage() {
  const router = useRouter();
  const { questions, isLoaded } = useQuestions();
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = () => {
    if (questions.length === 0 || isRolling) return;

    setIsRolling(true);

    // Animate for 1 second before selecting
    setTimeout(() => {
      // Pick a random question
      const randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];
      
      // Navigate to the question
      router.push(`/play/${selectedQuestion.id}`);
    }, 1000);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen light-bg relative flex items-center justify-center">
        <div className="light-bg-pattern" />
        <div className="light-bg-shapes" />
        <div className="relative z-10 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen light-bg relative flex flex-col">
      {/* Background Effects */}
      <div className="light-bg-pattern" />
      <div className="light-bg-shapes" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-all font-medium shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl font-black gradient-text mb-4">
            Random Challenge
          </h1>
          <p className="text-gray-600 text-xl mb-12">
            Click the dice to get a random sequencing question
          </p>

          {/* Dice Button */}
          <button
            onClick={handleRollDice}
            disabled={questions.length === 0 || isRolling}
            className={`group relative mx-auto transition-all duration-300 ${
              isRolling ? 'animate-bounce' : ''
            }`}
          >
            {/* Dice Container */}
            <div className={`
              w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400
              flex items-center justify-center
              shadow-2xl hover:shadow-purple-500/50
              transform transition-all duration-300
              ${isRolling ? 'animate-spin' : 'hover:scale-110 hover:rotate-6'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}>
              <div className="text-8xl filter drop-shadow-lg">
                🎲
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </button>

          {/* Instructions */}
          <div className="mt-12 space-y-4">
            <p className="text-gray-700 font-medium">
              {isRolling ? 'Rolling the dice...' : 'Ready to test your skills?'}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-purple-500">✓</span>
              <span>{questions.length} questions available</span>
            </div>
          </div>

          {/* No Questions Message */}
          {questions.length === 0 && (
            <div className="mt-8 light-card p-6">
              <p className="text-gray-600 mb-4">
                No questions available yet. Create some questions first!
              </p>
              <Link
                href="/create"
                className="light-button-primary inline-block px-6 py-3"
              >
                Create Your First Question
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer Hint */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Tip: Each roll picks a completely random question
        </p>
      </div>
    </div>
  );
}
