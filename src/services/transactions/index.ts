import {
  createTransactionController,
  retrieveTransactionsController,
  updateTransactionStatusController,
} from "./controllers";

export const createTransactionHandler = createTransactionController;
export const retrieveTransactionsHandler = retrieveTransactionsController;
export const updateTransactionStatusHandler = updateTransactionStatusController;
