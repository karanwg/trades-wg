'use client';

import { ActionStep } from '@/lib/sequencing/types';

interface ActionEditorProps {
  action: ActionStep;
  index: number;
  onChange: (action: ActionStep) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

// Common emoji suggestions for quick selection - commented out for now
// const EMOJI_SUGGESTIONS = ['⚡', '🔧', '✅', '❌', '⚠️', '📝', '🔴', '🟢', '💧', '🔥', '📞', '👀', '🛑', '🧪', '⏱️'];

export function ActionEditor({
  action,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: ActionEditorProps) {
  const handleChange = (field: keyof ActionStep, value: string | boolean | number | undefined) => {
    onChange({ ...action, [field]: value });
  };

  return (
    <div className={`
      p-5 rounded-xl border-2 transition-all
      ${action.isCorrect 
        ? 'bg-green-50 border-green-300' 
        : 'bg-white border-gray-200'
      }
    `}>
      <div className="flex items-start gap-4">
        {/* Move buttons */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1.5 rounded hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1.5 rounded hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4">
          {/* Row 1: Icon, Label, Is Correct */}
          <div className="flex items-center gap-3">
            {/* Icon input */}
            <div className="relative">
              <input
                type="text"
                value={action.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                className="w-16 h-12 text-center text-2xl bg-white border-2 border-gray-200 rounded-lg 
                         focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                placeholder="📝"
              />
            </div>

            {/* Label input */}
            <input
              type="text"
              value={action.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="Action name"
              className="flex-1 h-12 px-4 light-input"
            />

            {/* Is Correct toggle */}
            <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={action.isCorrect}
                onChange={(e) => handleChange('isCorrect', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 
                         focus:ring-2 focus:ring-purple-400 focus:ring-offset-0"
              />
              <span className={`text-sm font-semibold ${action.isCorrect ? 'text-green-700' : 'text-gray-500'}`}>
                Correct
              </span>
            </label>
          </div>

          {/* Emoji quick picks - commented out for now
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-white/40 mr-2">Quick icons:</span>
            {EMOJI_SUGGESTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleChange('icon', emoji)}
                className={`w-8 h-8 rounded flex items-center justify-center transition-all
                          ${action.icon === emoji 
                            ? 'bg-[var(--wg-accent-purple)]/30 ring-1 ring-[var(--wg-accent-purple)]' 
                            : 'hover:bg-white/10'
                          }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          */}

          {/* Row 2: Feedback (optional) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Feedback (shown when this action is dropped correctly)
            </label>
            <input
              type="text"
              value={action.feedback || ''}
              onChange={(e) => handleChange('feedback', e.target.value || undefined)}
              placeholder="e.g., 'Great! Power is now disconnected.'"
              className="w-full light-input"
            />
          </div>

          {/* Correct order (only if isCorrect) */}
          {action.isCorrect && (
            <div className="flex items-center gap-3 bg-green-100 px-4 py-3 rounded-lg">
              <label className="text-sm font-semibold text-green-800">Order in sequence:</label>
              <input
                type="number"
                min={0}
                value={action.correctOrder ?? index}
                onChange={(e) => handleChange('correctOrder', parseInt(e.target.value, 10))}
                className="w-20 h-10 px-3 text-center bg-white border-2 border-green-300 rounded-lg text-gray-900 font-bold
                         focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
              <span className="text-sm text-green-700">(0 = first step)</span>
            </div>
          )}
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
