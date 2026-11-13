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

export interface IGoalData {
  id: number;
  name: string;
  category: string;
  contributionMonthly: number;
  valueAchieved: number;
  valueTotal: number;
  dateFinal: string;
}
