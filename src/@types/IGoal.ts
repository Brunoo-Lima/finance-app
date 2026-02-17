export interface IGoal {
  id: number;
  name: string;
  category: string;
  contributionMonthly: number;
  remainingAmount: number;
  valueAchieved: number;
  valueTotal: number;
  remainingPeriod: number;
  dateFinal: string;
  status: string;
}
