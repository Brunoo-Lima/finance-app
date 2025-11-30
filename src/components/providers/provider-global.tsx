"use client";

import { AuthProvider } from "@/context/auth-context";

export const ProviderGlobal = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
