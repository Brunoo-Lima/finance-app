import { RefObject, useRef } from "react";

import { useOutside } from "@/hooks/use-outside";

import s from "./_modal.module.scss";

interface IRootProps {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export const Root = ({ children, className, onClose }: IRootProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutside(ref as RefObject<HTMLElement>, onClose);

  return (
    <div ref={ref} className={`${s.modal__root} ${className}`}>
      {children}
    </div>
  );
};
