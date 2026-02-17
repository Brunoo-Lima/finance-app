'use client';

import { usePagination } from '@/hooks/use-pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IGoal, IGoalData } from '@/@types/IGoal';

export const GoalsContext = createContext<IGoalsContextProps | undefined>(
  undefined,
);

interface IGoalsContextProps {
  paginatedData: IGoal[];
  page: number;
  totalPages: number;
  selectedGoal: IGoal | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<IGoal | null>>;
  selectedGoalId: number | null;
  setSelectedGoalId: React.Dispatch<React.SetStateAction<number | null>>;

  totalContributionMonthly: number;
  totalAchieved: number;
  totalOverall: number;
  allGoals: IGoal[];

  handlePageChange: (page: number) => void;
  addGoals: (goal: Omit<IGoalData, 'id'>) => void;
  editGoal: (goal: IGoalData) => void;
  deleteGoal: (id: number) => void;
  completeGoal: (id: number) => void;
}

interface IGoalsProviderProps {
  children: ReactNode;
}

export function GoalsProvider({ children }: IGoalsProviderProps) {
  const [goals, setGoals] = useLocalStorage<IGoal[]>('goals', []);
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const itemsPerPage = 7;

  const { page, totalPages, handlePageChange, paginatedData } = usePagination(
    goals,
    itemsPerPage,
  );

  const totalContributionMonthly = goals.reduce(
    (acc, item) => item.contributionMonthly + acc,
    0,
  );

  const totalAchieved = goals.reduce(
    (acc, item) => item.valueAchieved + acc,
    0,
  );

  const totalOverall = goals.reduce((acc, item) => item.valueTotal + acc, 0);

  function addGoals(goal: Omit<IGoalData, 'id'>) {
    const newId =
      goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1;

    const newGoal = { ...goal, id: newId };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals as IGoal[]);

    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  }

  function editGoal(goal: IGoalData) {
    const updatedGoals = goals.map((g) => (g.id === goal.id ? goal : g));

    console.log('aa', updatedGoals);

    setGoals(updatedGoals as IGoal[]);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  }

  function completeGoal(id: number) {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, status: 'finalizada' } : goal,
    );

    setGoals(updatedGoals as IGoal[]);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  }

  function deleteGoal(id: number) {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);

    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  }

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    selectedGoal,
    setSelectedGoal,
    selectedGoalId,
    setSelectedGoalId,
    allGoals: goals,
    totalContributionMonthly,
    totalAchieved,
    totalOverall,
    handlePageChange,
    addGoals,
    deleteGoal,
    editGoal,
    completeGoal,
  };

  return (
    <GoalsContext.Provider value={contextValue}>
      {children}
    </GoalsContext.Provider>
  );
}
