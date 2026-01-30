import { Category } from './ITransaction';

export interface IGoal {
  title: string;
  amountTarget: number;
  amountSaved: number;
  contributionMonthly: number;
  category: Category;
  termDate: string;
}
