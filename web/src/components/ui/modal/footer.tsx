import s from "./_modal.module.scss";

interface IFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: IFooterProps) => {
  return <div className={`${s.modal__footer} ${className}`}>{children}</div>;
};
