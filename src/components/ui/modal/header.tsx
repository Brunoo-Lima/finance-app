import { XIcon } from "lucide-react";

import s from "./_modal.module.scss";

interface IHeaderProps {
  title: string;
  onClose: () => void;
  className?: string;
  actions?: React.ReactNode;
}

export const Header = ({
  title,
  onClose,
  className,
  actions,
}: IHeaderProps) => {
  return (
    <div className={`${s.modal__header} ${className}`}>
      <h2>{title}</h2>

      <div className={s.actions__container}>
        {actions}

        <button type="button" className={s.button__close} onClick={onClose}>
          <XIcon size={24} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};
