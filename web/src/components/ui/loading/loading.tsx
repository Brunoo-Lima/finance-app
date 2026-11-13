import React from "react";

import s from "./_loading.module.scss";

interface ILoadingProps {
  size?: number;
  thickness?: number; // px (borda)
  className?: string;
  ariaLabel?: string;
  overlay?: boolean; // se true, mostra um overlay full-screen
  colorLoading?: string;
}

export const Loading: React.FC<ILoadingProps> = ({
  size = 32,
  thickness = 3,
  className = "",
  ariaLabel = "Carregando",
  overlay = false,
  colorLoading = "#ffffff",
}) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: thickness,
  };

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`${s.spinner} ${className}`}
      style={style}
    >
      <div
        className={s.track}
        style={{
          borderColor: `${colorLoading} transparent transparent transparent`,
        }}
      />
    </div>
  );

  if (overlay) {
    return <div className={s.overlay}>{content}</div>;
  }

  return content;
};

export default Loading;
