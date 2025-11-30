import { ReactNode } from "react";

export const TitlePage = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-bold text-2xl">{children}</h1>;
};
