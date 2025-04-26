import {
  createTransactionController,
  retrieveTransactionsController,
} from "./controllers";

export const createTransactionHandler = createTransactionController;
export const retrieveTransactionsHandler = retrieveTransactionsController;
