'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SequencingQuestion, ActionStep } from '@/lib/sequencing/types';
import { ActionList } from './ActionList';

interface QuestionFormProps {
  onSave: (question: SequencingQuestion) => void;
  initialData?: {
    title: string;
    description: string;
    startingPoint: string;
    endingPoint: string;
    maxSteps: number;
    actions: Omit<ActionStep, 'id'>[];
  };
}

export function QuestionForm({ onSave, initialData }: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [endingPoint, setEndingPoint] = useState('');
  const [maxSteps, setMaxSteps] = useState(5);
  const [actions, setActions] = useState<ActionStep[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStartingPoint(initialData.startingPoint);
      setEndingPoint(initialData.endingPoint);
      setMaxSteps(initialData.maxSteps);
      // Add unique IDs to actions
      const actionsWithIds = initialData.actions.map((action, index) => ({
        ...action,
        id: `action-${Date.now()}-${index}`,
      }));
      setActions(actionsWithIds);
    }
  }, [initialData]);

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
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Section: Basic Info */}
      <section className="light-card p-8 space-y-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-2xl">📋</span>
          Basic Information
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Question Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., CPR Emergency Response"
            className={`light-input w-full text-lg ${errors.title ? 'border-red-400' : ''}`}
          />
          {errors.title && <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Description / Problem Statement *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the scenario and what the student needs to accomplish..."
            rows={3}
            className={`light-textarea w-full ${errors.description ? 'border-red-400' : ''}`}
          />
          {errors.description && <p className="mt-2 text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>
      </section>

      {/* Section: Scenario */}
      <section className="light-card p-8 space-y-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-2xl">📍</span>
          Scenario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Starting Point *
              </span>
            </label>
            <textarea
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              placeholder="Describe the initial state before any action is taken..."
              rows={4}
              className={`light-textarea w-full ${errors.startingPoint ? 'border-red-400' : ''}`}
            />
            {errors.startingPoint && <p className="mt-2 text-sm text-red-600 font-medium">{errors.startingPoint}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Ending Point (Goal) *
              </span>
            </label>
            <textarea
              value={endingPoint}
              onChange={(e) => setEndingPoint(e.target.value)}
              placeholder="Describe the successful end state..."
              rows={4}
              className={`light-textarea w-full ${errors.endingPoint ? 'border-red-400' : ''}`}
            />
            {errors.endingPoint && <p className="mt-2 text-sm text-red-600 font-medium">{errors.endingPoint}</p>}
          </div>
        </div>
      </section>

      {/* Section: Steps Config */}
      <section className="light-card p-8">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
          <span className="text-2xl">⚙️</span>
          Configuration
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm font-semibold text-gray-700">Maximum steps allowed:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={maxSteps}
            onChange={(e) => setMaxSteps(parseInt(e.target.value, 10) || 5)}
            className="w-24 h-12 px-4 text-center light-input font-bold text-lg"
          />
          {correctCount > 0 && correctCount !== maxSteps && (
            <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1.5 rounded-lg">
              ⚠️ You have {correctCount} correct actions but max steps is {maxSteps}
            </span>
          )}
        </div>
      </section>

      {/* Section: Actions */}
      <section className="light-card p-8">
        <ActionList actions={actions} onChange={setActions} />
        {errors.actions && <p className="mt-4 text-sm text-red-600 font-medium">{errors.actions}</p>}
      </section>

      {/* Submit */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-gray-600 font-medium">
          {actions.length === 0 ? 'Add some actions to complete your question' : `${correctCount} correct steps, ready to save`}
        </p>
        <button
          type="submit"
          disabled={actions.length === 0}
          className="light-button-primary px-10 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Play
        </button>
      </div>
    </form>
  );
}
