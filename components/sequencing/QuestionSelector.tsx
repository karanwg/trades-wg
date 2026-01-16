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
        className="block light-card p-6 
                   hover:shadow-xl hover:scale-[1.02]
                   transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 pr-8 group-hover:text-purple-600 transition-colors">{question.title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{question.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-green-600">
            <span>✓</span>
            <span>{correctCount} steps</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span>⚡</span>
            <span>{distractorCount} distractors</span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-5 right-5 text-gray-300 group-hover:text-purple-500 transition-colors">
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
          className="absolute top-4 right-4 p-2 rounded-lg bg-red-100 text-red-600
                     opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-all z-10"
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
    <div className="min-h-screen light-bg relative">
      {/* Background Effects */}
      <div className="light-bg-pattern" />
      <div className="light-bg-shapes" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black gradient-text mb-4">
            Sequence Question
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Put the steps in the right order. Learn by doing!
          </p>
        </div>

        {/* YOUR QUESTIONS SECTION - MOVED TO TOP */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl font-bold text-gray-900">Your Questions</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-200 via-pink-200 to-transparent" />
            <Link
              href="/create"
              className="light-button-primary px-6 py-3"
            >
              + Create New
            </Link>
          </div>

          {!isLoaded ? (
            <div className="light-card p-12 text-center">
              <div className="animate-spin w-10 h-10 border-3 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : customQuestions.length === 0 ? (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-2xl p-16 text-center">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No custom questions yet</h3>
              <p className="text-gray-600 mb-6">Create your first sequencing question for students</p>
              <Link
                href="/create"
                className="light-button-primary inline-block px-8 py-3"
              >
                Create your first question
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* SAMPLE QUESTIONS SECTION - MOVED TO BOTTOM */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl">📚</span>
            <h2 className="text-2xl font-bold text-gray-900">Sample Questions</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-200 via-pink-200 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
              />
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-16 pt-8 border-t border-purple-100">
          <Link
            href="/simulator"
            className="text-gray-500 hover:text-purple-600 font-medium transition-colors inline-flex items-center gap-2"
          >
            <span>→ Go to AC Repair Simulator</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
