'use client';

import { GoalsContext } from '@/context/goals-context';
import { useContext } from 'react';

export const useGoals = () => {
  const context = useContext(GoalsContext);

  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};
