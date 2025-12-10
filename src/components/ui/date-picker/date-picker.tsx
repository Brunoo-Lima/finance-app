"use client";

import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./_date-picker.module.scss";

interface DateInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
}

export function DateInput({
  control,
  name,
  label,
  placeholder,
}: DateInputProps) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText={placeholder}
              className={`${styles.input} ${fieldState.error ? styles.error : ""}`}
            />

            {fieldState.error && (
              <p className={styles.errorMessage}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
