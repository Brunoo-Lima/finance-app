import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: IProps) => {
  return <section className="p-6 flex flex-col gap-y-4">{children}</section>;
};

export const PageHeader = ({ children, className }: IProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">{children}</div>
  );
};

export const PageContent = ({ children, className }: IProps) => {
  return <div className="">{children}</div>;
};
