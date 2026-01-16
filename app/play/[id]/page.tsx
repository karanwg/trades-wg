'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import { SequencingGame } from '@/components/sequencing/SequencingGame';

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const { getQuestion, isLoaded } = useQuestions();

  const questionId = params.id as string;
  const question = getQuestion(questionId);

  const handleBack = () => {
    router.push('/');
  };

  // Loading state
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

  // Question not found
  if (!question) {
    return (
      <div className="min-h-screen wg-background relative flex items-center justify-center">
        <div className="wg-bg-pattern" />
        <div className="wg-bg-shapes" />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">Question Not Found</h1>
          <p className="text-white/60 mb-6">The question you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl bg-[var(--wg-accent-purple)] text-white font-semibold hover:bg-[var(--wg-accent-purple)]/80 transition-colors"
          >
            Back to Questions
          </button>
        </div>
      </div>
    );
  }

  return <SequencingGame question={question} onBack={handleBack} />;
}
