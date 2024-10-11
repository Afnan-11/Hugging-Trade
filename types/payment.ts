export type LastPaymentRequest = {
  id: number;
  created_time: Date;
  user_id: number;
  month_start: Date;
  month_end: Date;
  profit_start: number;
  profit_end: number | null;
  owed_amount: number | null;
  payment_status: string | null;
};
