
import React, { createContext, useContext, useState } from 'react';
import { Prompt } from '@/components/PromptCard';

interface PromptDetailContextType {
  isOpen: boolean;
  currentPrompt: Prompt | null;
  openPromptDetail: (prompt: Prompt) => void;
  closePromptDetail: () => void;
}

const PromptDetailContext = createContext<PromptDetailContextType | undefined>(undefined);

export const PromptDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);

  const openPromptDetail = (prompt: Prompt) => {
    setCurrentPrompt(prompt);
    setIsOpen(true);
  };

  const closePromptDetail = () => {
    setIsOpen(false);
  };

  return (
    <PromptDetailContext.Provider value={{ isOpen, currentPrompt, openPromptDetail, closePromptDetail }}>
      {children}
    </PromptDetailContext.Provider>
  );
};

export const usePromptDetailModal = () => {
  const context = useContext(PromptDetailContext);
  if (context === undefined) {
    throw new Error('usePromptDetailModal must be used within a PromptDetailProvider');
  }
  return context;
};
