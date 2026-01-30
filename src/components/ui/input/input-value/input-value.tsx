import s from './_input.module.scss';
import React, { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Input } from '../input';
import { FieldError } from 'react-hook-form';

interface InputValueProps extends Omit<
  NumericFormatProps,
  'onChange' | 'customInput'
> {
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  label?: string;
  error?: FieldError;
}

export const InputValue = forwardRef<HTMLInputElement, InputValueProps>(
  ({ value, onChange, label = 'Valor', error, ...props }, ref) => {
    const handleValueChange = (values: { floatValue?: number }) => {
      if (onChange) {
        onChange(values.floatValue);
      }
    };

    return (
      <div className={s.input__container}>
        {label && <label className={s.label}>{label}</label>}
        <NumericFormat
          value={value}
          onValueChange={handleValueChange}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          customInput={Input}
          getInputRef={ref}
          placeholder="R$ 0,00"
          {...props}
        />
        {error && <small className={s.error}>{error.message}</small>}
      </div>
    );
  },
);

InputValue.displayName = 'InputValue';
