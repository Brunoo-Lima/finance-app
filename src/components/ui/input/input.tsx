import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import s from './_input.module.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      onChange,
      containerClassName,
      inputClassName,
      type = 'text',
      value,
      error,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`${s.input__container} ${containerClassName ?? ''}`}>
        {label && <label className={s.label}>{label}</label>}
        <input
          ref={ref}
          className={`${s.input__field} ${inputClassName ?? ''}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...rest}
        />

        {error && <small className={s.error__text}>{error.message}</small>}
      </div>
    );
  },
);

Input.displayName = 'Input';
