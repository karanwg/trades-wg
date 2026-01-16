'use client';

import { useState } from 'react';

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

interface AIQuestionGeneratorProps {
  onGenerated: (data: GeneratedQuestionData) => void;
  onCancel: () => void;
}

export function AIQuestionGenerator({ onGenerated, onCancel }: AIQuestionGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate question');
      }

      onGenerated(data.question);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate question');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="light-card p-10 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
          <span className="text-3xl">✨</span>
          AI Question Generator
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Describe the scenario you want to create, and AI will generate a complete sequencing question for you to review and edit.
        </p>
      </div>

      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          What kind of sequence do you want to create?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Create a question about troubleshooting a furnace that won't ignite, including safety checks, testing the thermocouple, and verifying gas supply..."
          rows={6}
          className="light-textarea w-full text-base"
          disabled={isGenerating}
          autoFocus
        />
        {error && (
          <p className="mt-3 text-sm text-red-600 font-medium flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
            <span>⚠️</span>
            {error}
          </p>
        )}
        <p className="mt-3 text-xs text-gray-500">
          Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono">Ctrl+Enter</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono">⌘+Enter</kbd> to generate
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="light-button-primary px-10 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <span className="text-xl">✨</span>
              Generate Question
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={isGenerating}
          className="light-button-secondary px-10 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      {/* Tips Section */}
      <div className="pt-6 border-t border-purple-100">
        <h3 className="text-base font-bold text-gray-900 mb-4">Tips for better results:</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold text-lg">•</span>
            Be specific about the domain (HVAC, electrical, medical, etc.)
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold text-lg">•</span>
            Mention key steps you want included
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold text-lg">•</span>
            Include safety considerations if relevant
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold text-lg">•</span>
            Specify difficulty level if desired (beginner, intermediate, advanced)
          </li>
        </ul>
      </div>

      {/* Example Prompts */}
      <div className="pt-6 border-t border-purple-100">
        <h3 className="text-base font-bold text-gray-900 mb-4">Example prompts:</h3>
        <div className="space-y-3">
          {[
            'Create a question about troubleshooting a furnace that won\'t ignite, including safety checks',
            'Make a sequence for proper ladder safety setup for working at heights',
            'Generate a medical emergency scenario for treating a choking victim',
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setPrompt(example)}
              disabled={isGenerating}
              className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium border border-purple-100 hover:border-purple-200"
            >
              💡 "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
