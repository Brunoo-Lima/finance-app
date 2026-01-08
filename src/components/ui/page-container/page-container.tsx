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

export const PageHeaderContent = ({ children, className }: IProps) => {
  return (
    <div className={`${s.page__header__content} ${className}`}>{children}</div>
  );
};

export const PageTitle = ({ children, className }: IProps) => {
  return <h1 className={`${s.page__title} ${className}`}>{children}</h1>;
};

export const PageDescription = ({ children, className }: IProps) => {
  return <p className={`${s.page__description} ${className}`}>{children}</p>;
};

export const PageActions = ({ children, className }: IProps) => {
  return <div className={`${s.page__actions} ${className}`}>{children}</div>;
};

export const PageContent = ({ children, className }: IProps) => {
  return <div className={`${s.page__content} ${className}`}>{children}</div>;
};
