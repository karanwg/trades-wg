'use client';

import { useQuestions } from '@/lib/sequencing/context';
import { QuestionSelector } from '@/components/sequencing/QuestionSelector';

export default function HomePage() {
  const { sampleQuestions, customQuestions, isLoaded, deleteQuestion } = useQuestions();

  return (
    <QuestionSelector
      sampleQuestions={sampleQuestions}
      customQuestions={customQuestions}
      isLoaded={isLoaded}
      onDeleteQuestion={deleteQuestion}
    />
  );
}
