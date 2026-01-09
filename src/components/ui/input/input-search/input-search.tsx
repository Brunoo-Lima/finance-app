import React, { forwardRef } from "react";
import s from "./_input-search.module.scss";
import { SearchIcon } from "lucide-react";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ containerClassName, className, ...props }, ref) => {
    return (
      <div className={`${s.container__input} ${containerClassName ?? ""}`}>
        <SearchIcon size={20} color="#a7a7a7" className={s.icon} />
        <input
          ref={ref}
          type="search"
          className={`${s.input__field} ${className ?? ""}`}
          {...props}
        />
      </div>
    );
  },
);

InputSearch.displayName = "InputSearch";
