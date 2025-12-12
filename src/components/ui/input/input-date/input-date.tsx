import React, { useState, useEffect } from "react";
import s from "./_input.module.scss";
import { FieldError } from "react-hook-form";

interface InputDateProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: FieldError;
  placeholder?: string;
}

export const InputDate: React.FC<InputDateProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder = "DD/MM/AAAA",
}) => {
  const [displayValue, setDisplayValue] = useState("");

  const formatDate = (input: string): string => {
    const numbers = input.replace(/\D/g, "");

    const limited = numbers.slice(0, 8);

    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else {
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4, 8)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatDate(rawValue);

    setDisplayValue(formatted);
    onChange(formatted);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  useEffect(() => {
    if (value) {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        setDisplayValue(value);
      } else {
        const formatted = formatDate(value.replace(/\D/g, ""));
        setDisplayValue(formatted);
      }
    } else {
      setDisplayValue("");
    }
  }, [value]);

  return (
    <div className={s.input__container}>
      {label && <label className={s.label}>{label}</label>}

      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={10}
        className={`${s.input__field} ${error ? s.error : ""}`}
        aria-invalid={!!error}
      />

      {error?.message && <span className={s.error__text}>{error.message}</span>}
    </div>
  );
};
