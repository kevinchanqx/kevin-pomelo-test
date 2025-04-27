import { APIGatewayProxyEventV2 } from "aws-lambda";
import { createTransaction } from "../use-cases";
import { makeValidator } from "@utils/validator";
import { createTransactionBodySchema } from "../schemas/create-transaction.schema";
import { catchErrorHandler } from "@utils/error-handler";
import { HttpStatusCode } from "axios";

export const createTransactionController = async (
  event: APIGatewayProxyEventV2
) => {
  console.log("[createTransactionController] event: ", event);
  try {
    const createTransactionBodyValidator = makeValidator(
      "createTransactionBody",
      createTransactionBodySchema
    );

    const body = createTransactionBodyValidator.validate(
      JSON.parse(event.body ?? "{}")
    );

    // Mock calling createTransactionService
    await createTransaction(body);

    return {
      statusCode: HttpStatusCode.Created,
      body: JSON.stringify({ message: "Transaction created successfully" }),
    };
  } catch (err) {
    console.error("Error creating transaction:", err);
    return catchErrorHandler(err);
  }
};
