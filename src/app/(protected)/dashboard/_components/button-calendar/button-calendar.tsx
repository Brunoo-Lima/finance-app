'use client';

import { CalendarIcon } from 'lucide-react';
import { parseAsIsoDate, useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button/button';

import s from './_button-calendar.module.scss';
import { useDashboard } from '@/hooks/use-dashboard';
import { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import { MONTHS, YEARS } from './_constants';

export const ButtonCalendar = () => {
  const now = new Date();
  const [, setFromUrl] = useQueryState(
    'from',
    parseAsIsoDate
      .withDefault(startOfMonth(now))
      .withOptions({ scroll: false, shallow: false }),
  );
  const [, setToUrl] = useQueryState(
    'to',
    parseAsIsoDate
      .withDefault(endOfMonth(now))
      .withOptions({ scroll: false, shallow: false }),
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    setFrom,
    setTo,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  } = useDashboard();

  const handleApply = (month: number, year: number) => {
    const from = startOfMonth(new Date(year, month, 1));
    const to = endOfMonth(new Date(year, month, 1));

    setFromUrl(from);
    setToUrl(to);
    setFrom(from);
    setTo(to);
    setIsExpanded(false);
  };

  useEffect(() => {
    handleApply(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    handleApply(month, selectedYear);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    handleApply(selectedMonth, year);
  };

  const label = `${MONTHS[selectedMonth].label} / ${selectedYear}`;

  return (
    <div className={s.button__container}>
      <Button
        variant="ghost"
        className={s.button}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CalendarIcon />
        <p>{label}</p>
      </Button>

      {isExpanded && (
        <div className={s.calendar__container}>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className={s.select__custom}
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className={s.select__custom}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
