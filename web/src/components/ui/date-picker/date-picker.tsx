'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import s from './_date-picker.module.scss';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
}

export function DatePicker({
  label,
  placeholder = 'Selecione uma data',
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate,
  error,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  function handleSelect(date: Date | undefined) {
    setSelected(date);
    onChange?.(date);
    setOpen(false);
  }

  const displayValue = selected ? format(selected, 'dd/MM/yyyy') : '';

  return (
    <div className={s.wrapper} ref={containerRef}>
      {label && <label className={s.label}>{label}</label>}

      <div
        className={`${s.inputWrapper} ${error ? s.hasError : ''} ${disabled ? s.disabled : ''}`}
      >
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          className={s.input}
          onClick={() => !disabled && setOpen((prev) => !prev)}
        />
        <button
          type="button"
          className={s.iconButton}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          aria-label="Abrir calendário"
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      {error && <span className={s.errorMsg}>{error}</span>}

      {open && (
        <div className={s.popover}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={ptBR}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
            classNames={{
              root: s.root,
              months: s.months,
              month: s.month,
              month_caption: s.caption,
              caption_label: s.captionLabel,
              nav: s.nav,
              button_previous: s.navButton,
              button_next: s.navButton,
              month_grid: s.table,
              weekdays: s.headRow,
              weekday: s.headCell,
              week: s.row,
              day: s.cell,
              day_button: s.day,
              selected: s.selected,
              today: s.today,
              outside: s.outside,
              disabled: s.dayDisabled,
              range_middle: s.rangeMiddle,
            }}
          />
        </div>
      )}
    </div>
  );
}
