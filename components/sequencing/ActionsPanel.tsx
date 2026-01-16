'use client';

import { ActionStep } from '@/lib/sequencing/types';

interface ActionsPanelProps {
  actions: ActionStep[];
  isCompleted: boolean;
  shakingActionId: string | null;
  draggingId: string | null;
  onDragStart: (e: React.DragEvent, actionId: string) => void;
  onDragEnd: () => void;
}

// Drag Handle Component
function DragHandle() {
  return (
    <div className="wg-drag-handle">
      {[...Array(6)].map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export function ActionsPanel({
  actions,
  isCompleted,
  shakingActionId,
  draggingId,
  onDragStart,
  onDragEnd,
}: ActionsPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">
          Actions
        </h3>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/40 text-xs">Drag to drop zone</span>
      </div>

      {/* Actions grid */}
      <div className="flex-1 overflow-y-auto p-2 -m-2">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const isShaking = shakingActionId === action.id;
            const isDragging = draggingId === action.id;

            return (
              <div
                key={action.id}
                draggable={!isCompleted && !isShaking}
                onDragStart={(e) => onDragStart(e, action.id)}
                onDragEnd={onDragEnd}
                className={`
                  wg-option-card
                  ${isShaking ? 'wg-animate-shake wg-option-card-error' : ''}
                  ${isDragging ? 'wg-option-card-dragging' : ''}
                  ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <DragHandle />
                {action.icon && <span className="text-xl">{action.icon}</span>}
                <span className="flex-1 text-sm">{action.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instruction */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-white/40 text-xs text-center">
          💡 Actions can be used multiple times if needed
        </p>
      </div>
    </div>
  );
}
