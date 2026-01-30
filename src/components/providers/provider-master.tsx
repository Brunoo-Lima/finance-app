'use client';

import { AuthProvider } from '@/context/auth-context';
import { GoalsProvider } from '@/context/goals-context';
import { TransactionsProvider } from '@/context/transactions-context';
// import { AuthValidator } from "./auth-validator";

export const ProviderMaster = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TransactionsProvider>
        <GoalsProvider>{children}</GoalsProvider>
      </TransactionsProvider>
    </AuthProvider>
  );
};
