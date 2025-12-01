import s from "./_page-container.module.scss";

import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: IProps) => {
  return (
    <section className={`${s.page__container} ${className}`}>
      {children}
    </section>
  );
};

export const PageHeader = ({ children, className }: IProps) => {
  return <div className={`${s.page__header} ${className}`}>{children}</div>;
};

export const PageContent = ({ children, className }: IProps) => {
  return <div className={`${s.page__content} ${className}`}>{children}</div>;
};
