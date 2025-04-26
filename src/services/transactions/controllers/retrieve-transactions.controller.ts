import { catchErrorHandler } from "@utils/error-handler";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { retrieveTransactions } from "../use-cases/retrieve-transactions.use-case";

export const retrieveTransactionsController = async (
  event: APIGatewayProxyEventV2
) => {
  console.log("[retrieveTransactionsController] event: ", event);
  try {
    const transactions = await retrieveTransactions();
    return {
      statusCode: 200,
      body: JSON.stringify({
        transactions,
      }),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
