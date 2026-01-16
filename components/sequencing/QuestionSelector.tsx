'use client';

import Link from 'next/link';
import { SequencingQuestion } from '@/lib/sequencing/types';

interface QuestionSelectorProps {
  sampleQuestions: SequencingQuestion[];
  customQuestions: SequencingQuestion[];
  isLoaded: boolean;
  onDeleteQuestion: (id: string) => void;
}

function QuestionCard({ 
  question, 
  onDelete,
  canDelete = false 
}: { 
  question: SequencingQuestion; 
  onDelete?: () => void;
  canDelete?: boolean;
}) {
  const correctCount = question.actions.filter(a => a.isCorrect).length;
  const distractorCount = question.actions.filter(a => !a.isCorrect).length;

  return (
    <div className="group relative">
      <Link 
        href={`/play/${question.id}`}
        className="block bg-[var(--wg-card-dark)] border border-white/10 rounded-2xl p-5 
                   hover:border-[var(--wg-accent-purple)]/50 hover:bg-white/5 
                   transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--wg-accent-purple)]"
      >
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 pr-8">{question.title}</h3>
        
        {/* Description */}
        <p className="text-white/50 text-sm mb-4 line-clamp-2">{question.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[var(--wg-success)]">
            <span>✓</span>
            <span>{correctCount} steps</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40">
            <span>⚡</span>
            <span>{distractorCount} distractors</span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-3 right-3 text-white/30 group-hover:text-[var(--wg-accent-purple)] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </Link>

      {/* Delete button - positioned outside the link */}
      {canDelete && onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 p-2 rounded-lg bg-[var(--wg-error)]/20 text-[var(--wg-error)]
                     opacity-0 group-hover:opacity-100 hover:bg-[var(--wg-error)]/30 transition-all z-10"
          title="Delete question"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function QuestionSelector({
  sampleQuestions,
  customQuestions,
  isLoaded,
  onDeleteQuestion,
}: QuestionSelectorProps) {
  return (
    <div className="min-h-screen wg-background relative">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            Sequencing Challenge
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Put the steps in the right order. Learn by doing!
          </p>
        </div>

        {/* Sample Questions Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📚</span>
            <h2 className="text-xl font-bold text-white">Sample Questions</h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
              />
            ))}
          </div>
        </div>

        {/* Custom Questions Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">✨</span>
            <h2 className="text-xl font-bold text-white">Your Questions</h2>
            <div className="flex-1 h-px bg-white/10" />
            <Link
              href="/teacher"
              className="wg-button wg-button-submit text-sm px-4 py-2"
            >
              + Create New
            </Link>
          </div>

          {!isLoaded ? (
            <div className="wg-card-dark p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full mx-auto mb-4" />
              <p className="text-white/50">Loading...</p>
            </div>
          ) : customQuestions.length === 0 ? (
            <div className="wg-card-dark p-8 text-center">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-white/50 mb-4">No custom questions yet</p>
              <Link
                href="/teacher"
                className="wg-button wg-button-secondary inline-block"
              >
                Create your first question
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onDelete={() => onDeleteQuestion(question.id)}
                  canDelete
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <Link
            href="/simulator"
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            → Go to AC Repair Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
