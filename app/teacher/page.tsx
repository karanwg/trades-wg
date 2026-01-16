'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import { SequencingQuestion } from '@/lib/sequencing/types';
import { QuestionForm } from '@/components/sequencing/teacher/QuestionForm';
import { AIQuestionGenerator } from '@/components/sequencing/teacher/AIQuestionGenerator';

type CreationMode = 'manual' | 'ai';

interface GeneratedQuestionData {
  title: string;
  description: string;
  startingPoint: string;
  endingPoint: string;
  maxSteps: number;
  actions: Array<{
    label: string;
    icon: string;
    feedback?: string;
    isCorrect: boolean;
    correctOrder?: number;
  }>;
}

export default function TeacherPage() {
  const router = useRouter();
  const { addQuestion } = useQuestions();
  const [mode, setMode] = useState<CreationMode>('manual');
  const [generatedData, setGeneratedData] = useState<GeneratedQuestionData | null>(null);

  const handleSave = (question: SequencingQuestion) => {
    addQuestion(question);
    // Navigate back to home to play the new question
    router.push('/');
  };

  const handleGenerated = (data: GeneratedQuestionData) => {
    setGeneratedData(data);
    setMode('manual'); // Switch to form view to allow editing
  };

  const handleBack = () => {
    if (generatedData) {
      // If we have generated data, go back to AI prompt
      setGeneratedData(null);
      setMode('ai');
    } else {
      // Otherwise navigate home
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen light-bg relative">
      {/* Background Effects */}
      <div className="light-bg-pattern" />
      <div className="light-bg-shapes" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {!generatedData ? (
          <>
            {/* Header with Mode Toggle */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-black gradient-text mb-3">Create Question</h1>
                  <p className="text-gray-600 text-lg">Build a new sequencing challenge for your students</p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all font-medium"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Back</span>
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-4">
                <button
                  onClick={() => setMode('manual')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                    mode === 'manual'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 transform scale-105'
                      : 'bg-white/70 text-gray-600 hover:bg-white hover:text-gray-900 border border-purple-200'
                  }`}
                >
                  <span className="mr-2">✏️</span>
                  Create Manually
                </button>
                <button
                  onClick={() => setMode('ai')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                    mode === 'ai'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 transform scale-105'
                      : 'bg-white/70 text-gray-600 hover:bg-white hover:text-gray-900 border border-purple-200'
                  }`}
                >
                  <span className="mr-2">✨</span>
                  Generate with AI
                </button>
              </div>
            </div>

            {/* AI Generation Interface */}
            {mode === 'ai' && (
              <AIQuestionGenerator
                onGenerated={handleGenerated}
                onCancel={() => router.push('/')}
              />
            )}

            {/* Manual Creation Form */}
            {mode === 'manual' && (
              <QuestionForm onSave={handleSave} />
            )}
          </>
        ) : (
          <>
            {/* Show form with generated data */}
            <div className="mb-8">
              <div className="light-card p-6 flex items-start gap-4 border-2 border-purple-200">
                <div className="text-3xl">✨</div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">AI Generated Question</h3>
                  <p className="text-gray-600">
                    Review and edit the generated question below. You can modify any field before saving.
                  </p>
                </div>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 transition-all font-medium"
                >
                  ← Back to prompt
                </button>
              </div>
            </div>
            <QuestionForm onSave={handleSave} initialData={generatedData} />
          </>
        )}
      </div>
    </div>
  );
}
