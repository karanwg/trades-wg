'use client';

import { useState, useCallback, useMemo } from 'react';
import { Theme, SequencingQuestion, ActionStep, LogEntry, FeedbackReading } from '@/lib/sequencing/types';
import { ProgressHeader } from './ProgressHeader';
import { DropZonePanel } from './DropZonePanel';
import { FeedbackPanel } from './FeedbackPanel';
import { ActionsPanel } from './ActionsPanel';
import { LogPanel } from './LogPanel';
import { CompletionModal } from './CompletionModal';

interface SequencingGameProps {
  theme: Theme;
  question: SequencingQuestion;
  onChangeTheme: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SequencingGame({ theme, question, onChangeTheme }: SequencingGameProps) {
  // All available actions (correct + distractors, shuffled)
  const allActions = useMemo(() => {
    return shuffleArray([...question.correctSequence, ...question.distractors]);
  }, [question]);

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

  const totalSteps = question.correctSequence.length;
  const currentStep = chain.length;

  // Get current feedback reading
  const currentReading: FeedbackReading = useMemo(() => {
    if (!question.feedbackConfig) {
      return { display: '---', value: 0, unit: '', status: 'normal', description: '' };
    }
    return question.feedbackConfig.readings[currentStep] || question.feedbackConfig.initialReading;
  }, [question.feedbackConfig, currentStep]);

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
      const expectedAction = question.correctSequence[currentStep];
      
      if (action.id === expectedAction.id) {
        // Correct!
        setNewChainItemId(action.id);
        setChain((prev) => [...prev, action]);
        addLog(`Step ${currentStep + 1}: ${action.label}`, 'success', action.icon);
        
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
    [allActions, currentStep, totalSteps, isCompleted, question.correctSequence, addLog, triggerErrorFeedback]
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

  const handleReset = useCallback(() => {
    setScore(100);
    setChain([]);
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
  }, [question.title]);

  return (
    <div className="min-h-screen flex flex-col wg-background relative">
      {/* Background Effects */}
      <div className="wg-bg-pattern" />
      <div className="wg-bg-shapes" />

      {/* Red Flash Overlay */}
      {showRedFlash && <div className="wg-red-flash" />}

      {/* Header */}
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        score={score}
        theme={theme}
        questionTitle={question.title}
        questionDescription={question.description}
        onReset={handleReset}
      />

      {/* Main Content */}
      <div className="flex-1 relative z-10 px-6 pb-6">
        <div className="h-full grid grid-rows-[1fr_auto] gap-4">
          {/* Top Row: Drop Zone + Feedback Panel (60/40 split) */}
          <div className={`grid gap-4 ${theme.hasFeedbackPanel ? 'grid-cols-[3fr_2fr]' : 'grid-cols-1'}`}>
            {/* Drop Zone (Top-Left) */}
            <DropZonePanel
              theme={theme}
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

            {/* Feedback Panel (Top-Right) - Only for HVAC and Piano */}
            {theme.hasFeedbackPanel && theme.feedbackType && (
              <FeedbackPanel
                type={theme.feedbackType}
                reading={currentReading}
                questionTitle={question.title}
                questionDescription={question.description}
              />
            )}
          </div>

          {/* Bottom Row: Log + Actions (40/60 split) */}
          <div className="grid grid-cols-[2fr_3fr] gap-4 h-[280px]">
            {/* Log Panel (Bottom-Left) */}
            <div className="wg-card-dark p-4">
              <LogPanel entries={log} />
            </div>

            {/* Actions Panel (Bottom-Right) */}
            <div className="wg-card-dark p-4">
              <ActionsPanel
                actions={allActions}
                isCompleted={isCompleted}
                shakingActionId={shakingActionId}
                draggingId={draggingId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <CompletionModal
          score={score}
          theme={theme}
          onPlayAgain={handleReset}
          onChangeTheme={onChangeTheme}
        />
      )}
    </div>
  );
}
