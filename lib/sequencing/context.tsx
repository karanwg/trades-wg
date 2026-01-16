'use client';

import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import { SequencingQuestion, QuestionContextType } from './types';
import { useLocalStorage } from './useLocalStorage';
import { SAMPLE_QUESTIONS } from './sampleQuestions';

const STORAGE_KEY = 'sequencing-custom-questions';

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [customQuestions, setCustomQuestions, isLoaded] = useLocalStorage<SequencingQuestion[]>(
    STORAGE_KEY,
    []
  );

  const addQuestion = useCallback((question: SequencingQuestion) => {
    setCustomQuestions((prev) => [...prev, { ...question, isBuiltIn: false }]);
  }, [setCustomQuestions]);

  const deleteQuestion = useCallback((id: string) => {
    // Only delete custom questions, not built-in samples
    setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
  }, [setCustomQuestions]);

  // Filter out hidden questions for student-facing views
  const visibleSampleQuestions = useMemo(() => {
    return SAMPLE_QUESTIONS.filter(q => !q.hidden);
  }, []);

  const questions = useMemo(() => {
    return [...visibleSampleQuestions, ...customQuestions];
  }, [visibleSampleQuestions, customQuestions]);

  const getQuestion = useCallback((id: string) => {
    return questions.find((q) => q.id === id);
  }, [questions]);

  const value: QuestionContextType = useMemo(() => ({
    questions,
    customQuestions,
    sampleQuestions: visibleSampleQuestions,
    addQuestion,
    deleteQuestion,
    getQuestion,
    isLoaded,
  }), [questions, customQuestions, visibleSampleQuestions, addQuestion, deleteQuestion, getQuestion, isLoaded]);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions(): QuestionContextType {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
}
