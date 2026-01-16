'use client';

import { ActionStep } from '@/lib/sequencing/types';
import { ActionEditor } from './ActionEditor';

interface ActionListProps {
  actions: ActionStep[];
  onChange: (actions: ActionStep[]) => void;
}

export function ActionList({ actions, onChange }: ActionListProps) {
  const handleAddAction = () => {
    const newAction: ActionStep = {
      id: `action-${Date.now()}`,
      label: '',
      icon: '📝',
      isCorrect: false,
    };
    onChange([...actions, newAction]);
  };

  const handleUpdateAction = (index: number, updated: ActionStep) => {
    const newActions = [...actions];
    newActions[index] = updated;
    onChange(newActions);
  };

  const handleDeleteAction = (index: number) => {
    onChange(actions.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newActions = [...actions];
    [newActions[index - 1], newActions[index]] = [newActions[index], newActions[index - 1]];
    onChange(newActions);
  };

  const handleMoveDown = (index: number) => {
    if (index === actions.length - 1) return;
    const newActions = [...actions];
    [newActions[index], newActions[index + 1]] = [newActions[index + 1], newActions[index]];
    onChange(newActions);
  };

  const correctCount = actions.filter(a => a.isCorrect).length;
  const distractorCount = actions.filter(a => !a.isCorrect).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Actions</h3>
          <p className="text-sm text-gray-600 mt-1">
            {correctCount} correct steps, {distractorCount} distractors
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddAction}
          className="light-button-secondary px-6 py-3 text-base"
        >
          + Add Action
        </button>
      </div>

      {/* Actions list */}
      {actions.length === 0 ? (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-600 mb-6 text-lg">No actions added yet</p>
          <button
            type="button"
            onClick={handleAddAction}
            className="light-button-primary px-8 py-3"
          >
            Add your first action
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {actions.map((action, index) => (
            <ActionEditor
              key={action.id}
              action={action}
              index={index}
              onChange={(updated) => handleUpdateAction(index, updated)}
              onDelete={() => handleDeleteAction(index)}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              canMoveUp={index > 0}
              canMoveDown={index < actions.length - 1}
            />
          ))}
        </div>
      )}

      {/* Help text */}
      {actions.length > 0 && (
        <div className="mt-6 p-5 rounded-xl bg-purple-50 border border-purple-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            💡 <strong className="text-purple-700">Tip:</strong> Mark the correct actions and set their order. 
            Add some wrong actions (distractors) to make it challenging!
          </p>
        </div>
      )}
    </div>
  );
}
