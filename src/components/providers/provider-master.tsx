"use client";

import { AuthValidator } from "./auth-validator";

export const ProviderMaster = ({ children }: { children: React.ReactNode }) => {
  return <AuthValidator>{children}</AuthValidator>;
};
