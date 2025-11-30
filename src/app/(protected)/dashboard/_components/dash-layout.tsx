import { Transactions } from "./transactions/transactions";

export const DashLayout = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div></div>

      <Transactions />
    </div>
  );
};
