import { catchErrorHandler } from "@utils/error-handler";
import { makeValidator } from "@utils/validator";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HttpStatusCode } from "axios";
import { updateTransactionStatusBody } from "../schemas/update-transaction-status.schema";
import { updateTransactionStatus } from "../use-cases";

export const updateTransactionStatusController = async (
  event: APIGatewayProxyEventV2
) => {
  console.log("[updateTransactionStatusController] event: ", event);
  try {
    const transactionId = event.pathParameters?.transactionId;

    if (!transactionId) {
      return {
        statusCode: HttpStatusCode.UnprocessableEntity,
        body: JSON.stringify({ message: "Missing transactionId" }),
      };
    }

    const updateTranasctionStatusBodyValidator = makeValidator(
      "updateTransactionStatusBody",
      updateTransactionStatusBody
    );
    const body = updateTranasctionStatusBodyValidator.validate(
      JSON.parse(event.body || "{}")
    );

    await updateTransactionStatus(transactionId, body);

    return {
      statusCode: HttpStatusCode.Ok,
      body: JSON.stringify({
        message: "Transaction status updated successfully!",
      }),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
