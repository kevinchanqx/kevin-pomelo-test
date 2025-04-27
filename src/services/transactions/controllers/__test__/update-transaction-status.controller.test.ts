import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateTransactionStatusController } from "../update-transaction-status.controller";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import _ from "lodash";
import { HttpStatusCode } from "axios";
import { TransactionStatus } from "@shared/databases/postgres/tables/transaction.table";
import { UpdateTransactionStatusBody } from "@services/transactions/types/update-transaction.type";
import { throwError } from "@utils/error-handler";

const mocks = vi.hoisted(() => {
  return {
    mockedTransactionRepo: {
      update: vi.fn(),
    },
  };
});

vi.mock(
  "@shared/databases/postgres/tables/transaction.table",
  async (importOriginal) => ({
    ...(await importOriginal()),
    TransactionRepo: mocks.mockedTransactionRepo,
  })
);

describe("Update Transactions Status API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockBody: UpdateTransactionStatusBody = {
    status: TransactionStatus.PAID,
  };
  const mockEvent = {
    body: JSON.stringify(mockBody),
  } as APIGatewayProxyEventV2;

  it("should update transaction status successfully and return 200 status", async () => {
    mocks.mockedTransactionRepo.update.mockResolvedValueOnce([1]);

    _.set(mockEvent, "pathParameters.transactionId", "1");
    const response = await updateTransactionStatusController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.Ok);
    expect(body).toBe(
      JSON.stringify({ message: "Transaction status updated successfully!" })
    );
  });

  it("should return 404 status and message of Transaction not found", async () => {
    mocks.mockedTransactionRepo.update.mockResolvedValueOnce([0]);

    const response = await updateTransactionStatusController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.NotFound);
    expect(body).toBe(JSON.stringify({ message: "Transaction not found" }));
  });

  it("should return 422 status and message of Missing transactionId", async () => {
    _.set(mockEvent, "pathParameters", {});

    const response = await updateTransactionStatusController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.UnprocessableEntity);
    expect(body).toBe(JSON.stringify({ message: "Missing transactionId" }));
  });

  it("should return 500 status and message of Failed to update transaction status", async () => {
    mocks.mockedTransactionRepo.update.mockRejectedValueOnce({
      catch: () =>
        throwError({
          statusCode: HttpStatusCode.InternalServerError,
          message: "Failed to update transaction status",
        }),
    });

    _.set(mockEvent, "pathParameters.transactionId", "abc");

    const response = await updateTransactionStatusController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.InternalServerError);
    expect(body).toBe(
      JSON.stringify({ message: "Failed to update transaction status" })
    );
  });
});
