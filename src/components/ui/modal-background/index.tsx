import s from "./_modal-background.module.scss";

export const ModalBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={s.overlay}>{children}</div>;
};
