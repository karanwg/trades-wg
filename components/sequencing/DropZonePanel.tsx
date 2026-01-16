'use client';

import { ActionStep } from '@/lib/sequencing/types';

interface DropZonePanelProps {
  chain: ActionStep[];
  currentStep: number;
  totalSteps: number;
  isDragOver: boolean;
  newChainItemId: string | null;
  showGoodJob: boolean;
  feedback?: string | null;
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
  feedback,
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
        h-full relative rounded-2xl overflow-hidden transition-all duration-300
        ${isDragOver ? 'ring-4 ring-[var(--wg-accent-teal)] ring-opacity-50' : ''}
      `}
      style={{ background: 'rgba(18, 21, 23, 0.8)' }}
    >
      {/* Dashed drop zone border */}
      <div className={`
        absolute inset-2 md:inset-4 border-2 md:border-3 border-dashed rounded-xl transition-all duration-300
        ${isDragOver 
          ? 'border-white/40 bg-white/5' 
          : 'border-white/20 bg-transparent'
        }
      `} />

      {/* Content area */}
      <div className="relative z-10 p-3 md:p-6 h-full flex flex-col">
        {/* Feedback display at top (mobile shows inline, desktop may show elsewhere) */}
        {feedback && !isComplete && (
          <div className="mb-3 md:mb-4 wg-animate-fade-in">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 md:px-4 md:py-3 border border-white/20">
              <p className="text-white text-xs md:text-sm font-medium leading-relaxed">
                {feedback}
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {chain.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Different text for mobile vs desktop */}
            <p className="text-white/60 text-base md:text-lg font-medium text-center hidden md:block">
              Drag and drop actions here to build your sequence
            </p>
            <p className="text-white/60 text-sm font-medium text-center md:hidden">
              Tap an action below to start
            </p>
            <p className="text-white/40 text-xs md:text-sm mt-2">
              Start with step 1
            </p>
          </div>
        )}

        {/* Chain items - vertical on mobile, horizontal on desktop */}
        {chain.length > 0 && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Good Job speech bubble */}
            {showGoodJob && (
              <div className="absolute top-2 md:top-4 right-2 md:left-4 md:right-auto bg-white rounded-xl md:rounded-2xl px-3 py-1.5 md:px-4 md:py-2 shadow-xl wg-animate-bounce-in z-20">
                <span className="text-sm md:text-lg font-bold text-[var(--wg-bg-end)]">Good Job! 🎉</span>
                <div className="absolute -bottom-2 right-4 md:left-6 md:right-auto w-3 h-3 md:w-4 md:h-4 bg-white transform rotate-45" />
              </div>
            )}

            {/* Chain items container */}
            <div className="flex-1 overflow-y-auto p-2 md:p-4">
              {/* Mobile: Vertical layout */}
              <div className="flex flex-col gap-2 md:hidden">
                {chain.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      wg-chain-item flex items-center gap-2 px-3 py-2
                      ${newChainItemId === item.id ? 'wg-animate-pop-in' : ''}
                    `}
                  >
                    <div className="wg-step-badge w-6 h-6 text-xs shrink-0">
                      {index + 1}
                    </div>
                    {item.icon && <span className="text-base">{item.icon}</span>}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                ))}
                
                {/* Next step placeholder - mobile */}
                {!isComplete && (
                  <div className="border-2 border-dashed border-white/30 rounded-xl px-3 py-2 text-white/40 text-sm font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                      {chain.length + 1}
                    </div>
                    <span>Next step...</span>
                  </div>
                )}
              </div>

              {/* Desktop: Horizontal layout */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
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

                {/* Next step placeholder - desktop */}
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
              <div className="text-5xl md:text-6xl mb-2">✅</div>
              <p className="text-white text-lg md:text-xl font-bold">Sequence Complete!</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
