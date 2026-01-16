'use client';

import { ActionStep } from '@/lib/sequencing/types';

// Default neutral gradient
const NEUTRAL_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)';

interface DropZonePanelProps {
  chain: ActionStep[];
  currentStep: number;
  totalSteps: number;
  isDragOver: boolean;
  newChainItemId: string | null;
  showGoodJob: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
}

export function DropZonePanel({
  chain,
  currentStep: _currentStep,
  totalSteps,
  isDragOver,
  newChainItemId,
  showGoodJob,
  onDrop,
  onDragOver,
  onDragLeave,
}: DropZonePanelProps) {
  void _currentStep; // Reserved for future use
  const isComplete = chain.length === totalSteps;

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-300
        ${isDragOver ? 'ring-4 ring-[var(--wg-accent-teal)] ring-opacity-50' : ''}
      `}
      style={{ background: NEUTRAL_GRADIENT }}
    >
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* Dashed drop zone border */}
      <div className={`
        absolute inset-4 border-3 border-dashed rounded-xl transition-all duration-300
        ${isDragOver 
          ? 'border-white/60 bg-white/10' 
          : 'border-white/20 bg-transparent'
        }
      `} />

      {/* Content area */}
      <div className="relative z-10 p-8 min-h-[320px] flex flex-col">
        {/* Empty state */}
        {chain.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-white/60 text-lg font-medium text-center">
              Drag and drop actions here to build your sequence
            </p>
            <p className="text-white/40 text-sm mt-2">
              Start with step 1
            </p>
          </div>
        )}

        {/* Chain items overlaid as horizontal flowing chain */}
        {chain.length > 0 && (
          <div className="flex-1 flex flex-col">
            {/* Good Job speech bubble */}
            {showGoodJob && (
              <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-2 shadow-xl wg-animate-bounce-in z-20">
                <span className="text-lg font-bold text-[var(--wg-bg-end)]">Good Job! 🎉</span>
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45" />
              </div>
            )}

            {/* Horizontal chain items */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {chain.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      flex items-center gap-2
                      ${newChainItemId === item.id ? 'wg-animate-pop-in' : ''}
                    `}
                  >
                    {/* Connector arrow (except for first item) */}
                    {index > 0 && (
                      <div className="wg-chain-connector shrink-0" />
                    )}

                    {/* Chain item - compact pill */}
                    <div className="wg-chain-item flex items-center gap-2 px-3 py-2">
                      <div className="wg-step-badge w-6 h-6 text-xs shrink-0">
                        {index + 1}
                      </div>
                      {item.icon && <span className="text-lg">{item.icon}</span>}
                      <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>
                    </div>
                  </div>
                ))}

                {/* Next step placeholder */}
                {!isComplete && (
                  <div className="flex items-center gap-2 opacity-60">
                    <div className="wg-chain-connector shrink-0" />
                    <div className="border-2 border-dashed border-white/40 rounded-xl px-4 py-2 text-white/50 text-sm font-medium flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {chain.length + 1}
                      </div>
                      <span>Next...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Completion state */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-center wg-animate-bounce-in">
              <div className="text-6xl mb-2">✅</div>
              <p className="text-white text-xl font-bold">Sequence Complete!</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between text-white/60 text-sm mb-2">
          <span>Progress</span>
          <span>{chain.length} / {totalSteps}</span>
        </div>
        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--wg-accent-teal)] to-[var(--wg-accent-purple)] transition-all duration-500"
            style={{ width: `${(chain.length / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
