'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AuthProvider } from '@/context/auth-context';
import { GoalsProvider } from '@/context/goals-context';
import { TransactionsProvider } from '@/context/transactions-context';
import { DashboardProvider } from '@/context/dashboard-context';
// import { AuthValidator } from "./auth-validator";

export const ProviderMaster = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <AuthProvider>
        <DashboardProvider>
          <TransactionsProvider>
            <GoalsProvider>{children}</GoalsProvider>
          </TransactionsProvider>
        </DashboardProvider>
      </AuthProvider>
    </NuqsAdapter>
  );
};
