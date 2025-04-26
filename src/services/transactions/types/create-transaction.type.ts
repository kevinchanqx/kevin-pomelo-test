import { TransactionMethod } from "@shared/databases/postgres/tables/transaction.table";

export type CreateTransactionBody = {
  currency: string;
  amount: number;
  method: TransactionMethod;
};
