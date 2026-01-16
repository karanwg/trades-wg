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
      p-4 rounded-xl border transition-all
      ${action.isCorrect 
        ? 'bg-[var(--wg-success)]/5 border-[var(--wg-success)]/20' 
        : 'bg-white/5 border-white/10'
      }
    `}>
      <div className="flex items-start gap-4">
        {/* Move buttons */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-3">
          {/* Row 1: Icon, Label, Is Correct */}
          <div className="flex items-center gap-3">
            {/* Icon input */}
            <div className="relative">
              <input
                type="text"
                value={action.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                className="w-16 h-10 text-center text-2xl bg-black/30 border border-white/10 rounded-lg 
                         focus:border-[var(--wg-accent-purple)] focus:outline-none"
                placeholder="📝"
              />
            </div>

            {/* Label input */}
            <input
              type="text"
              value={action.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="Action name"
              className="flex-1 h-10 px-4 bg-black/30 border border-white/10 rounded-lg text-white
                       placeholder:text-white/30 focus:border-[var(--wg-accent-purple)] focus:outline-none"
            />

            {/* Is Correct toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={action.isCorrect}
                onChange={(e) => handleChange('isCorrect', e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-black/30 text-[var(--wg-success)] 
                         focus:ring-[var(--wg-accent-purple)] focus:ring-offset-0"
              />
              <span className={`text-sm font-medium ${action.isCorrect ? 'text-[var(--wg-success)]' : 'text-white/50'}`}>
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
            <label className="block text-xs text-white/50 mb-1.5">
              Feedback (shown when this action is dropped correctly)
            </label>
            <input
              type="text"
              value={action.feedback || ''}
              onChange={(e) => handleChange('feedback', e.target.value || undefined)}
              placeholder="e.g., 'Great! Power is now disconnected.'"
              className="w-full h-10 px-4 bg-black/30 border border-white/10 rounded-lg text-white
                       placeholder:text-white/30 focus:border-[var(--wg-accent-purple)] focus:outline-none"
            />
          </div>

          {/* Correct order (only if isCorrect) */}
          {action.isCorrect && (
            <div className="flex items-center gap-3">
              <label className="text-xs text-white/50">Order in sequence:</label>
              <input
                type="number"
                min={0}
                value={action.correctOrder ?? index}
                onChange={(e) => handleChange('correctOrder', parseInt(e.target.value, 10))}
                className="w-20 h-8 px-3 text-center bg-black/30 border border-white/10 rounded-lg text-white
                         focus:border-[var(--wg-accent-purple)] focus:outline-none"
              />
              <span className="text-xs text-white/40">(0 = first step)</span>
            </div>
          )}
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-[var(--wg-error)]/20 text-white/40 hover:text-[var(--wg-error)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
