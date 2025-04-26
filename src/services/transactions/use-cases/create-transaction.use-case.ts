import { CreateTransactionBody } from "../types/create-transaction.type";

export const createTransaction = async (
  body: CreateTransactionBody
): Promise<void> => {
  // Mock implementation of create transaction
  console.log("Create Transaction Body:", body);
};
