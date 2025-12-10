"use client";

import { RefObject, useRef, useState } from "react";

import s from "./_dropdown.module.scss";
import { useOutside } from "@/hooks/use-outside";
import { ChevronDownIcon } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  value?: string | null;
  onChange?: (value: string) => void;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  classNameWrapper?: string;
  classNameTrigger?: string;
  classNameMenu?: string;
}

export const Dropdown = ({
  value = "",
  onChange,
  options = [],
  label,
  placeholder = "Selecione",
  classNameWrapper,
  classNameTrigger,
  classNameMenu,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutside(dropdownRef as RefObject<HTMLElement>, () => setIsOpen(false));

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div className={`${s.container} ${classNameWrapper}`} ref={dropdownRef}>
      {label && <label className={s.label}>{label}</label>}

      <div className={s.dropdown__wrapper}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${s.trigger} ${classNameTrigger}`}
        >
          <span className={value ? s.trigger__text : s.trigger__placeholder}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDownIcon size={24} />
        </button>

        {isOpen && (
          <div className={`${s.content} ${classNameMenu}`}>
            <div className={s.content__inner}>
              {options.length > 0 ? (
                <div className={s.list}>
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onChange?.(option.value);
                        setIsOpen(false);
                      }}
                      className={`${s.item} ${
                        value === option.value ? s.item__selected : ""
                      }`}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className={s.empty__message}>Nenhuma opção disponível</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
