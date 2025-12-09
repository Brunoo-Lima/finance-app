import s from "./_modal.module.scss";

interface IContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Content = ({ children, className }: IContentProps) => {
  return <div className={`${s.modal__content} ${className}`}>{children}</div>;
};
