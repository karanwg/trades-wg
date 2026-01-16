'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import Link from 'next/link';
import { SequencingQuestion } from '@/lib/sequencing/types';

function QuestionCard({ question }: { question: SequencingQuestion }) {
  return (
    <Link 
      href={`/play/${question.id}`}
      className="group block wg-card-dark border-2 border-white/30 rounded-2xl p-6 
                 hover:border-[var(--wg-accent-purple)] hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20
                 hover:scale-105 hover:-translate-y-1
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--wg-accent-purple)]"
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--wg-accent-purple)] transition-colors">{question.title}</h3>
      
      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">{question.description}</p>

      {/* Arrow indicator */}
      <div className="flex items-center justify-end mt-4">
        <svg className="w-5 h-5 text-white/30 group-hover:text-[var(--wg-accent-purple)] transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
}

export default function PlayPage() {
  const router = useRouter();
  const { questions, isLoaded } = useQuestions();
  const [isRolling, setIsRolling] = useState(false);

  const handleRandomPlay = () => {
    if (questions.length === 0 || isRolling) return;

    setIsRolling(true);

    // Brief animation before selecting
    setTimeout(() => {
      // Pick a random question
      const randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];
      
      // Navigate to the question
      router.push(`/play/${selectedQuestion.id}`);
    }, 300);
  };

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            Select Your Question
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Pick a specific question or roll the dice for a random one
          </p>
        </div>

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
          <>
            {/* Random Question Button */}
            <div className="mb-12">
              <button
                onClick={handleRandomPlay}
                disabled={isRolling}
                className="group relative w-full wg-card-dark p-8 border-2 border-[var(--wg-accent-purple)]/50 hover:border-[var(--wg-accent-purple)] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-6">
                  {/* Dice Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-xl ${isRolling ? 'animate-spin' : 'group-hover:scale-110 group-hover:rotate-12'} transition-all`}>
                    <div className="text-5xl filter drop-shadow-lg">
                      🎲
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-left">
                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-[var(--wg-accent-purple)] transition-colors">
                      {isRolling ? 'Rolling...' : 'Random Question'}
                    </h2>
                    <p className="text-white/80">
                      {isRolling ? 'Picking your question...' : 'Let fate decide your question'}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="text-white/50 group-hover:text-[var(--wg-accent-purple)] transition-colors text-3xl ml-auto">
                    →
                  </div>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-white/60 text-sm font-bold">OR CHOOSE SPECIFIC</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
