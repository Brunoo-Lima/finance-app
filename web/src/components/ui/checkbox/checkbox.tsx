import { Check } from "lucide-react";

import s from "./_checkbox.module.scss";

interface ICheckboxProps {
  label?: string;
  id: string;
  checked?: boolean;
  className?: string;
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  id,
  checked,
  value,
  className,
  onChange,
  ...props
}: ICheckboxProps) => {
  const isChecked = checked ?? value ?? false;

  return (
    <label className={`${s.checkbox} ${className ?? ""}`}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
        className={s.input}
        {...props}
      />
      <div className={`${s.custom} ${isChecked ? s.checked : ""}`}>
        {isChecked && <Check className={s.icon} size={16} />}
      </div>

      {label && <span className={s.label}>{label}</span>}
    </label>
  );
};
