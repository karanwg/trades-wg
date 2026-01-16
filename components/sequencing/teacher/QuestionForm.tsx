'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SequencingQuestion, ActionStep } from '@/lib/sequencing/types';
import { ActionList } from './ActionList';

interface QuestionFormProps {
  onSave: (question: SequencingQuestion) => void;
}

export function QuestionForm({ onSave }: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [endingPoint, setEndingPoint] = useState('');
  const [maxSteps, setMaxSteps] = useState(5);
  const [actions, setActions] = useState<ActionStep[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!startingPoint.trim()) {
      newErrors.startingPoint = 'Starting point is required';
    }
    if (!endingPoint.trim()) {
      newErrors.endingPoint = 'Ending point is required';
    }

    const correctActions = actions.filter(a => a.isCorrect);
    if (correctActions.length === 0) {
      newErrors.actions = 'At least one correct action is required';
    }

    const hasEmptyLabels = actions.some(a => !a.label.trim());
    if (hasEmptyLabels) {
      newErrors.actions = 'All actions must have a name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const question: SequencingQuestion = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      startingPoint: startingPoint.trim(),
      endingPoint: endingPoint.trim(),
      maxSteps,
      actions: actions.map((a, i) => ({
        ...a,
        correctOrder: a.isCorrect ? (a.correctOrder ?? i) : undefined,
      })),
      isBuiltIn: false,
    };

    onSave(question);
  };

  const correctCount = actions.filter(a => a.isCorrect).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Create Question</h1>
          <p className="text-white/50">Build a new sequencing challenge for your students</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancel</span>
        </Link>
      </div>

      {/* Section: Basic Info */}
      <section className="wg-card-dark p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-xl">📋</span>
          Basic Information
        </h2>

        <div>
          <label className="block text-sm text-white/70 mb-2">Question Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., CPR Emergency Response"
            className={`w-full h-12 px-4 bg-black/30 border rounded-lg text-white text-lg
                     placeholder:text-white/30 focus:outline-none transition-colors
                     ${errors.title ? 'border-[var(--wg-error)]' : 'border-white/10 focus:border-[var(--wg-accent-purple)]'}`}
          />
          {errors.title && <p className="mt-1 text-sm text-[var(--wg-error)]">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-2">Description / Problem Statement *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the scenario and what the student needs to accomplish..."
            rows={3}
            className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white
                     placeholder:text-white/30 focus:outline-none transition-colors resize-none
                     ${errors.description ? 'border-[var(--wg-error)]' : 'border-white/10 focus:border-[var(--wg-accent-purple)]'}`}
          />
          {errors.description && <p className="mt-1 text-sm text-[var(--wg-error)]">{errors.description}</p>}
        </div>
      </section>

      {/* Section: Scenario */}
      <section className="wg-card-dark p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-xl">📍</span>
          Scenario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-2">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--wg-accent-orange)]"></span>
                Starting Point *
              </span>
            </label>
            <textarea
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              placeholder="Describe the initial state before any action is taken..."
              rows={4}
              className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white
                       placeholder:text-white/30 focus:outline-none transition-colors resize-none
                       ${errors.startingPoint ? 'border-[var(--wg-error)]' : 'border-white/10 focus:border-[var(--wg-accent-purple)]'}`}
            />
            {errors.startingPoint && <p className="mt-1 text-sm text-[var(--wg-error)]">{errors.startingPoint}</p>}
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--wg-success)]"></span>
                Ending Point (Goal) *
              </span>
            </label>
            <textarea
              value={endingPoint}
              onChange={(e) => setEndingPoint(e.target.value)}
              placeholder="Describe the successful end state..."
              rows={4}
              className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white
                       placeholder:text-white/30 focus:outline-none transition-colors resize-none
                       ${errors.endingPoint ? 'border-[var(--wg-error)]' : 'border-white/10 focus:border-[var(--wg-accent-purple)]'}`}
            />
            {errors.endingPoint && <p className="mt-1 text-sm text-[var(--wg-error)]">{errors.endingPoint}</p>}
          </div>
        </div>
      </section>

      {/* Section: Steps Config */}
      <section className="wg-card-dark p-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <span className="text-xl">⚙️</span>
          Configuration
        </h2>

        <div className="flex items-center gap-4">
          <label className="text-sm text-white/70">Maximum steps allowed:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={maxSteps}
            onChange={(e) => setMaxSteps(parseInt(e.target.value, 10) || 5)}
            className="w-24 h-10 px-4 text-center bg-black/30 border border-white/10 rounded-lg text-white
                     focus:border-[var(--wg-accent-purple)] focus:outline-none"
          />
          {correctCount > 0 && correctCount !== maxSteps && (
            <span className="text-sm text-[var(--wg-accent-orange)]">
              ⚠️ You have {correctCount} correct actions but max steps is {maxSteps}
            </span>
          )}
        </div>
      </section>

      {/* Section: Actions */}
      <section className="wg-card-dark p-6">
        <ActionList actions={actions} onChange={setActions} />
        {errors.actions && <p className="mt-4 text-sm text-[var(--wg-error)]">{errors.actions}</p>}
      </section>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-sm">
          {actions.length === 0 ? 'Add some actions to complete your question' : `${correctCount} correct steps, ready to save`}
        </p>
        <button
          type="submit"
          disabled={actions.length === 0}
          className="wg-button wg-button-submit px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Play
        </button>
      </div>
    </form>
  );
}
