import { ReactNode } from "react";
import s from "./_button.module.scss";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "cancel";
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
}

export const Button = ({
  children,
  className,
  onClick,
  variant = "default",
  type = "button",
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${s.button} ${s[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
