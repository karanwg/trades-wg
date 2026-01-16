'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import Link from 'next/link';

export default function RandomPlayPage() {
  const router = useRouter();
  const { questions, isLoaded } = useQuestions();
  const [isRolling, setIsRolling] = useState(false);

  // Auto-roll dice when questions are loaded
  useEffect(() => {
    if (isLoaded && questions.length > 0 && !isRolling) {
      setIsRolling(true);

      // Animate for 1 second before selecting
      setTimeout(() => {
        // Pick a random question
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];
        
        // Navigate to the question
        router.push(`/play/${selectedQuestion.id}`);
      }, 1000);
    }
  }, [isLoaded, questions, router, isRolling]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen wg-background relative flex items-center justify-center">
        <div className="wg-bg-pattern" />
        <div className="wg-bg-shapes" />
        <div className="relative z-10 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen wg-background relative flex flex-col">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        {questions.length === 0 ? (
          <div className="wg-card-dark p-12 text-center">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Questions Available</h2>
            <p className="text-white/60 mb-6">
              No questions available yet. Create some questions first!
            </p>
            <Link
              href="/create"
              className="wg-button wg-button-submit inline-block px-8 py-3"
            >
              Create Your First Question
            </Link>
          </div>
        ) : (
          <div className="relative w-40 h-40">
            {/* Dice Container */}
            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl animate-spin">
              <div className="text-8xl filter drop-shadow-lg">
                🎲
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 blur-xl opacity-75 -z-10" />
          </div>
        )}
      </div>
    </div>
  );
}
