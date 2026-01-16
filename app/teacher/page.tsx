'use client';

import { useRouter } from 'next/navigation';
import { useQuestions } from '@/lib/sequencing/context';
import { SequencingQuestion } from '@/lib/sequencing/types';
import { QuestionForm } from '@/components/sequencing/teacher/QuestionForm';

export default function TeacherPage() {
  const router = useRouter();
  const { addQuestion } = useQuestions();

  const handleSave = (question: SequencingQuestion) => {
    addQuestion(question);
    // Navigate back to home to play the new question
    router.push('/');
  };

  return (
    <div className="min-h-screen wg-background relative">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <QuestionForm onSave={handleSave} />
      </div>
    </div>
  );
}
