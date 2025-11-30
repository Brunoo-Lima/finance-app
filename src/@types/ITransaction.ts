export interface ITransaction {
  id: number;
  description: string;
  payment: string;
  value: number;
  type: string;
  status: string;
  created_at: string;
}
