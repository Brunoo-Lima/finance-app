import { Transactions } from "./transactions/transactions";
import s from "./_dash.module.scss";

export const DashLayout = () => {
  return (
    <div className={s.dash__wrapper}>
      <div></div>

      <Transactions />
    </div>
  );
};
