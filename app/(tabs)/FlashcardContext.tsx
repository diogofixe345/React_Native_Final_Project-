import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

type FlashcardGroup = {
  id: string;
  name: string;
  flashcards: Flashcard[];
};

type FlashcardContextType = {
  groups: FlashcardGroup[];
  addGroup: (group: FlashcardGroup) => void;
  addFlashcardToGroup: (groupId: string, card: Flashcard) => void;
  updateFlashcard: (
    groupId: string,
    flashcardId: string,
    updatedData: Partial<Flashcard>
  ) => void;
  deleteFlashcard: (groupId: string, flashcardId: string) => void;
  deleteGroup: (groupId: string) => void;
};

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<FlashcardGroup[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const stored = await AsyncStorage.getItem('flashcardGroups');
        if (stored) {
          setGroups(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Erro ao carregar grupos de flashcards:', e);
      }
    };

    loadGroups();
  }, []);

  const saveGroups = async (updatedGroups: FlashcardGroup[]) => {
    try {
      await AsyncStorage.setItem('flashcardGroups', JSON.stringify(updatedGroups));
    } catch (e) {
      console.error('Erro ao salvar grupos:', e);
    }
  };

  const addGroup = (group: FlashcardGroup) => {
    const updated = [...groups, group];
    setGroups(updated);
    saveGroups(updated);
  };

  const addFlashcardToGroup = (groupId: string, card: Flashcard) => {
    const updated = groups.map(group =>
      group.id === groupId
        ? { ...group, flashcards: [...group.flashcards, card] }
        : group
    );

    setGroups(updated);
    saveGroups(updated);
  };

  const updateFlashcard = (
    groupId: string,
    flashcardId: string,
    updatedData: Partial<Flashcard>
  ) => {
    const updated = groups.map(group =>
      group.id === groupId
        ? {
            ...group,
            flashcards: group.flashcards.map(card =>
              card.id === flashcardId ? { ...card, ...updatedData } : card
            ),
          }
        : group
    );

    setGroups(updated);
    saveGroups(updated);
  };

  const deleteFlashcard = (groupId: string, flashcardId: string) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          flashcards: group.flashcards.filter(card => card.id !== flashcardId),
        };
      }
      return group;
    });
  
    setGroups(updatedGroups);
    saveGroups(updatedGroups);
  };

  const deleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
  
    setGroups(updatedGroups); 
    saveGroups(updatedGroups); 
  };
  
  

  return (
    <FlashcardContext.Provider
      value={{ groups, addGroup, addFlashcardToGroup, updateFlashcard, deleteFlashcard, deleteGroup }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashcardContext);
  if (!context) throw new Error('useFlashcards must be used inside FlashcardProvider');
  return context;
};
