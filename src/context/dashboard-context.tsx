'use client';

import { endOfMonth, startOfMonth } from 'date-fns';
import { createContext, useState } from 'react';

interface IDashboardContextProps {
  from: Date;
  to: Date;
  setFrom: (date: Date) => void;
  setTo: (date: Date) => void;

  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const DashboardContext = createContext<
  IDashboardContextProps | undefined
>(undefined);

interface IDashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider = ({ children }: IDashboardProviderProps) => {
  const now = new Date();

  const [from, setFrom] = useState<Date>(startOfMonth(now));
  const [to, setTo] = useState<Date>(endOfMonth(now));

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const contextValue = {
    from,
    to,
    setFrom,
    setTo,

    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
