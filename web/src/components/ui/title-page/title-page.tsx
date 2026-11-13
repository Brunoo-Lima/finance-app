import s from "./_title-page.module.scss";

import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const TitlePage = ({ children, className }: IProps) => {
  return <h1 className={`${s.title} ${className}`}>{children}</h1>;
};
