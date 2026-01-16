'use client';

import { ActionStep } from '@/lib/sequencing/types';

interface ActionsPanelProps {
  actions: ActionStep[];
  isCompleted: boolean;
  shakingActionId: string | null;
  draggingId: string | null;
  onDragStart: (e: React.DragEvent, actionId: string) => void;
  onDragEnd: () => void;
  onActionClick?: (actionId: string) => void;
}

// Drag Handle Component - hidden on mobile
function DragHandle() {
  return (
    <div className="wg-drag-handle hidden md:grid">
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
  onActionClick,
}: ActionsPanelProps) {
  const handleClick = (actionId: string) => {
    if (isCompleted || !onActionClick) return;
    onActionClick(actionId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">
          Actions
        </h3>
        <div className="flex-1 h-px bg-white/10" />
        {/* Different hint for mobile vs desktop */}
        <span className="text-white/40 text-xs hidden md:inline">Drag to drop zone</span>
        <span className="text-white/40 text-xs md:hidden">Tap to add</span>
      </div>

      {/* Actions grid - 2 columns on mobile, 3 on desktop */}
      <div className="flex-1 overflow-y-auto p-1 md:p-2 -m-1 md:-m-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {actions.map((action) => {
            const isShaking = shakingActionId === action.id;
            const isDragging = draggingId === action.id;

            return (
              <div
                key={action.id}
                draggable={!isCompleted && !isShaking}
                onDragStart={(e) => onDragStart(e, action.id)}
                onDragEnd={onDragEnd}
                onClick={() => handleClick(action.id)}
                className={`
                  wg-option-card wg-option-card-mobile
                  ${isShaking ? 'wg-animate-shake wg-option-card-error' : ''}
                  ${isDragging ? 'wg-option-card-dragging' : ''}
                  ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <DragHandle />
                {action.icon && <span className="text-lg md:text-xl">{action.icon}</span>}
                <span className="flex-1 text-xs md:text-sm leading-tight">{action.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instruction - hidden on mobile to save space */}
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10 hidden md:block">
        <p className="text-white/40 text-xs text-center">
          💡 Actions can be used multiple times if needed
        </p>
      </div>
    </div>
  );
}
