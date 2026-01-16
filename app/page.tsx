'use client';

import { useState } from 'react';
import { Theme } from '@/lib/sequencing/types';
import { getTheme } from '@/lib/sequencing/themes';
import { getQuestion } from '@/lib/sequencing/questions';
import { ThemeSelector } from '@/components/sequencing/ThemeSelector';
import { SequencingGame } from '@/components/sequencing/SequencingGame';

export default function SequencingPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handleChangeTheme = () => {
    setSelectedTheme(null);
  };

  if (selectedTheme) {
    const question = getQuestion(selectedTheme.id);
    return (
      <SequencingGame
        theme={selectedTheme}
        question={question}
        onChangeTheme={handleChangeTheme}
      />
    );
  }

  return <ThemeSelector onSelectTheme={handleSelectTheme} />;
}
