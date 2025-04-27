import { TransactionRepo } from "@shared/databases/postgres/tables/transaction.table";
import { UpdateTransactionStatusBody } from "../types/update-transaction.type";
import { throwError } from "@utils/error-handler";
import { HttpStatusCode } from "axios";

export const updateTransactionStatus = async (
  transactionId: string,
  body: UpdateTransactionStatusBody
) => {
  const { status } = body;

  console.log(
    `[updateTransactionStatus] Start updating transaction status for ${transactionId} to ${status}`
  );

  const updatedTransaction = await TransactionRepo.update(
    { status },
    { where: { id: transactionId }, returning: true }
  ).catch((error) => {
    console.error(
      `[updateTransactionStatus] Error updating transaction status: ${error}`
    );

    return throwError({
      statusCode: HttpStatusCode.InternalServerError,
      message: "Failed to update transaction status",
    });
  });

  if (updatedTransaction[0] === 0) {
    return throwError({
      statusCode: HttpStatusCode.NotFound,
      message: "Transaction not found",
    });
  }
};
