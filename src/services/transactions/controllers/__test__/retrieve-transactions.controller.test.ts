import { beforeEach, describe, expect, it, vi } from "vitest";
import mockTransactions from "./mock-data/transactions.mock-data.json";
import { retrieveTransactionsController } from "../retrieve-transactions.controller";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import _ from "lodash";
import { HttpStatusCode } from "axios";

const mocks = vi.hoisted(() => {
  return {
    mockedTransactionRepo: { findAll: vi.fn() },
  };
});

vi.mock("@shared/databases/postgres/tables/transaction.table", () => ({
  TransactionRepo: mocks.mockedTransactionRepo,
}));

describe("Retrieve Transactions API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockEvent = {
    body: JSON.stringify({}),
  } as APIGatewayProxyEventV2;

  it("should retrieve 4 transactions successfully and return 201 status", async () => {
    const mockedTransactionModels = mockTransactions.map((mockTxn) => ({
      toJSON: () => mockTxn,
    }));
    mocks.mockedTransactionRepo.findAll.mockResolvedValueOnce(
      mockedTransactionModels
    );
    const response = await retrieveTransactionsController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const parsedBody = JSON.parse(_.get(response, "body", ""));
    const transactions = _.get(parsedBody, "transactions");

    expect(statusCode).toBe(HttpStatusCode.Ok);
    expect(transactions).toEqual(mockTransactions);
    expect(transactions.length).toEqual(4);
  });

  it("should return 500 status and message of Internal Server Error", async () => {
    mocks.mockedTransactionRepo.findAll.mockRejectedValueOnce({
      message: "Internal Server Error ",
    });

    const response = await retrieveTransactionsController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.InternalServerError);
    expect(body).toBe(JSON.stringify({ message: "Internal Server Error" }));
  });
});
