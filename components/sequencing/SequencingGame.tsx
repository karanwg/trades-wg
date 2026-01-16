'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { SequencingQuestion, ActionStep, LogEntry } from '@/lib/sequencing/types';
import { ProgressHeader } from './ProgressHeader';
import { DropZonePanel } from './DropZonePanel';
import { FeedbackPanel } from './FeedbackPanel';
import { ActionsPanel } from './ActionsPanel';
import { LogPanel } from './LogPanel';
import { CompletionModal } from './CompletionModal';
import { ScenarioModal } from './ScenarioModal';

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

interface SequencingGameProps {
  question: SequencingQuestion;
  onBack: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SequencingGame({ question, onBack }: SequencingGameProps) {
  const isMobile = useIsMobile();

  // All available actions (shuffled)
  const allActions = useMemo(() => {
    return shuffleArray([...question.actions]);
  }, [question]);

  // Correct sequence sorted by correctOrder
  const correctSequence = useMemo(() => {
    return question.actions
      .filter((a) => a.isCorrect && typeof a.correctOrder === 'number')
      .sort((a, b) => (a.correctOrder ?? 0) - (b.correctOrder ?? 0));
  }, [question.actions]);

  const totalSteps = correctSequence.length;

  // Game state
  const [score, setScore] = useState(100);
  const [chain, setChain] = useState<ActionStep[]>([]);
  const [log, setLog] = useState<LogEntry[]>([
    {
      id: 'start',
      timestamp: new Date(),
      action: `Started: ${question.title}`,
      status: 'info',
      icon: '🎮',
    },
  ]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRedFlash, setShowRedFlash] = useState(false);
  const [shakingActionId, setShakingActionId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [newChainItemId, setNewChainItemId] = useState<string | null>(null);
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<string | null>(null);

  // Mobile-specific state
  const [showScenarioModal, setShowScenarioModal] = useState(true);
  const [isScenarioAutoTriggered, setIsScenarioAutoTriggered] = useState(true); // True only on initial page load
  const [isLogCollapsed, setIsLogCollapsed] = useState(true);

  const currentStep = chain.length;

  // Add log entry
  const addLog = useCallback((action: string, status: 'success' | 'error' | 'info', icon?: string) => {
    setLog((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        action,
        status,
        icon,
      },
    ]);
  }, []);

  // Trigger error feedback
  const triggerErrorFeedback = useCallback((actionId: string, actionLabel: string) => {
    setScore((prev) => Math.max(0, prev - 10));
    setShowRedFlash(true);
    setTimeout(() => setShowRedFlash(false), 500);

    setShakingActionId(actionId);
    setTimeout(() => setShakingActionId(null), 600);

    addLog(`Wrong: ${actionLabel}`, 'error', '❌');
  }, [addLog]);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (isCompleted) return;

      const actionId = e.dataTransfer.getData('text/plain');
      const action = allActions.find((a) => a.id === actionId);

      if (!action) return;

      // Check if this is the correct next action
      const expectedAction = correctSequence[currentStep];
      
      if (action.id === expectedAction.id) {
        // Correct!
        setNewChainItemId(action.id);
        setChain((prev) => [...prev, action]);
        addLog(`Step ${currentStep + 1}: ${action.label}`, 'success', action.icon);
        
        // Show feedback if available
        if (action.feedback) {
          setCurrentFeedback(action.feedback);
        }
        
        // Show "Good Job!" briefly
        setShowGoodJob(true);
        setTimeout(() => setShowGoodJob(false), 1500);
        
        setTimeout(() => setNewChainItemId(null), 500);

        // Check if complete
        if (currentStep + 1 === totalSteps) {
          setTimeout(() => {
            setIsCompleted(true);
            addLog('Sequence completed!', 'success', '🎉');
          }, 600);
        }
      } else {
        // Wrong - trigger error
        triggerErrorFeedback(actionId, action.label);
      }
    },
    [allActions, currentStep, totalSteps, isCompleted, correctSequence, addLog, triggerErrorFeedback]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!isCompleted) {
        setIsDragOver(true);
      }
    },
    [isCompleted]
  );

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDragStart = useCallback(
    (e: React.DragEvent, actionId: string) => {
      if (isCompleted) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', actionId);
      e.dataTransfer.effectAllowed = 'move';
      setDraggingId(actionId);
    },
    [isCompleted]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setIsDragOver(false);
  }, []);

  // Handle click-to-add (for mobile)
  const handleActionClick = useCallback(
    (actionId: string) => {
      if (isCompleted) return;

      const action = allActions.find((a) => a.id === actionId);
      if (!action) return;

      // Check if this is the correct next action
      const expectedAction = correctSequence[currentStep];

      if (action.id === expectedAction.id) {
        // Correct!
        setNewChainItemId(action.id);
        setChain((prev) => [...prev, action]);
        addLog(`Step ${currentStep + 1}: ${action.label}`, 'success', action.icon);

        // Show feedback if available
        if (action.feedback) {
          setCurrentFeedback(action.feedback);
        }

        // Show "Good Job!" briefly
        setShowGoodJob(true);
        setTimeout(() => setShowGoodJob(false), 1500);

        setTimeout(() => setNewChainItemId(null), 500);

        // Check if complete
        if (currentStep + 1 === totalSteps) {
          setTimeout(() => {
            setIsCompleted(true);
            addLog('Sequence completed!', 'success', '🎉');
          }, 600);
        }
      } else {
        // Wrong - trigger error
        triggerErrorFeedback(actionId, action.label);
      }
    },
    [allActions, currentStep, totalSteps, isCompleted, correctSequence, addLog, triggerErrorFeedback]
  );

  const handleReset = useCallback(() => {
    setScore(100);
    setChain([]);
    setCurrentFeedback(null);
    setLog([
      {
        id: 'restart',
        timestamp: new Date(),
        action: `Restarted: ${question.title}`,
        status: 'info',
        icon: '🔄',
      },
    ]);
    setIsCompleted(false);
    setShowGoodJob(false);
    setShowScenarioModal(true);
    setIsScenarioAutoTriggered(true); // Reset shows scenario with lock again
  }, [question.title]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-screen overflow-hidden wg-background relative flex flex-col">
        {/* Background Effects */}
        <div className="wg-bg-pattern" />
        <div className="wg-bg-shapes" />

        {/* Red Flash Overlay */}
        {showRedFlash && <div className="wg-red-flash" />}

        {/* Scenario Modal */}
        {showScenarioModal && !isCompleted && (
          <ScenarioModal
            title={question.title}
            startingPoint={question.startingPoint}
            endingPoint={question.endingPoint}
            isAutoTriggered={isScenarioAutoTriggered}
            onContinue={() => {
              setShowScenarioModal(false);
              setIsScenarioAutoTriggered(false); // Future opens will not be auto-triggered
            }}
          />
        )}

        <div className="relative z-10 flex flex-col flex-1 min-h-0">
          {/* Header */}
          <ProgressHeader
            currentStep={currentStep}
            totalSteps={totalSteps}
            score={score}
            questionTitle={question.title}
            questionDescription={question.description}
            onReset={handleReset}
            onBack={onBack}
          />

          {/* Main Content - Mobile Layout */}
          <div className="flex-1 min-h-0 px-3 pb-0 flex flex-col gap-3 overflow-hidden">
            {/* Collapsible Scenario Section */}
            <button
              onClick={() => setShowScenarioModal(true)}
              className="wg-scenario-collapsed wg-touch-feedback shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                  Scenario
                </span>
              </div>
              <svg 
                className="w-5 h-5 text-white/50" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Drop Zone - takes available space */}
            <div className="flex-1 min-h-0">
              <DropZonePanel
                chain={chain}
                currentStep={currentStep}
                totalSteps={totalSteps}
                isDragOver={isDragOver}
                newChainItemId={newChainItemId}
                showGoodJob={showGoodJob}
                feedback={currentFeedback}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              />
            </div>

            {/* Actions Panel */}
            <div className="wg-card-dark p-3 shrink-0 max-h-[40vh] overflow-hidden flex flex-col mb-3">
              <ActionsPanel
                actions={allActions}
                isCompleted={isCompleted}
                shakingActionId={shakingActionId}
                draggingId={draggingId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onActionClick={handleActionClick}
              />
            </div>
          </div>

          {/* Sticky Log Panel at Bottom */}
          <div className="shrink-0 wg-safe-area-bottom mt-auto">
            <LogPanel
              entries={log}
              isCollapsed={isLogCollapsed}
              onToggle={() => setIsLogCollapsed(!isLogCollapsed)}
              isMobile={true}
            />
          </div>
        </div>

        {/* Completion Modal */}
        {isCompleted && (
          <CompletionModal
            score={score}
            onPlayAgain={handleReset}
            onBack={onBack}
          />
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-screen overflow-hidden wg-background relative flex flex-col">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      {/* Red Flash Overlay */}
      {showRedFlash && <div className="wg-red-flash" />}

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <ProgressHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          score={score}
          questionTitle={question.title}
          questionDescription={question.description}
          onReset={handleReset}
          onBack={onBack}
        />

        {/* Main Content - fills remaining space */}
        <div className="flex-1 min-h-0 px-6 pb-4 flex flex-col gap-4">
          {/* Top Row: Feedback Panel + Drop Zone (25/75 split) */}
          <div className="flex-1 min-h-0 grid gap-4 grid-cols-[1fr_3fr]">
            {/* Feedback Panel (Top-Left) */}
            <FeedbackPanel
              feedback={currentFeedback}
              questionDescription={question.description}
              startingPoint={question.startingPoint}
              endingPoint={question.endingPoint}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />

            {/* Drop Zone (Top-Right) */}
            <DropZonePanel
              chain={chain}
              currentStep={currentStep}
              totalSteps={totalSteps}
              isDragOver={isDragOver}
              newChainItemId={newChainItemId}
              showGoodJob={showGoodJob}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            />
          </div>

          {/* Bottom Row: Log + Actions (25/75 split) */}
          <div className="flex-1 min-h-0 grid grid-cols-[1fr_3fr] gap-4">
            {/* Log Panel (Bottom-Left) */}
            <div className="wg-card-dark p-4 min-h-0 overflow-hidden flex flex-col">
              <LogPanel entries={log} />
            </div>

            {/* Actions Panel (Bottom-Right) */}
            <div className="wg-card-dark p-4 min-h-0 overflow-hidden flex flex-col">
              <ActionsPanel
                actions={allActions}
                isCompleted={isCompleted}
                shakingActionId={shakingActionId}
                draggingId={draggingId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onActionClick={handleActionClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <CompletionModal
          score={score}
          onPlayAgain={handleReset}
          onBack={onBack}
        />
      )}
    </div>
  );
}
