import {
  Transaction,
  TransactionRepo,
} from "@shared/databases/postgres/tables/transaction.table";
import _ from "lodash";

export const retrieveTransactions = async () => {
  const transactionModels = await TransactionRepo.findAll();
  const transactions = transactionModels.map((transaction) =>
    transaction.toJSON()
  ) as Transaction[];

  return transactions.map((transaction) => ({
    id: transaction.id,
    method: transaction.method,
    amount: transaction.amount,
    currency: transaction.currency,
    createdAt: transaction.createdAt,
  }));
};
