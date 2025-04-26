import { TransactionMethod } from "@shared/databases/postgres/tables/user.table";

export type CreateTransactionBody = {
  currency: string;
  amount: number;
  method: TransactionMethod;
};
