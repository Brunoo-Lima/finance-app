"use client";

import { TransactionsProvider } from "@/context/transactions-context";
import { AuthValidator } from "./auth-validator";

export const ProviderMaster = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthValidator>
      <TransactionsProvider>{children}</TransactionsProvider>
    </AuthValidator>
  );
};
