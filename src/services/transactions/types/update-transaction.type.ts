import { TransactionStatus } from "@shared/databases/postgres/tables/transaction.table";

export type UpdateTransactionStatusBody = {
  status: TransactionStatus;
};
