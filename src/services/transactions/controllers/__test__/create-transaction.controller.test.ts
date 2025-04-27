import { CreateTransactionBody } from "@services/transactions/types/create-transaction.type";
import { TransactionMethod } from "@shared/databases/postgres/tables/transaction.table";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTransactionController } from "../create-transaction.controller";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import _ from "lodash";
import { HttpStatusCode } from "axios";

const mocks = vi.hoisted(() => {
  return {
    mockedCreateTransaction: vi.fn(),
  };
});

vi.mock("@services/transactions/use-cases", () => ({
  createTransaction: mocks.mockedCreateTransaction,
}));

describe("Create Transaction API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  mocks.mockedCreateTransaction.mockResolvedValueOnce(undefined);

  it("should create a transaction successfully and return 201 status", async () => {
    const mockBody: CreateTransactionBody = {
      amount: 100,
      currency: "SGD",
      method: TransactionMethod.CASH,
    };
    const mockEvent = {
      body: JSON.stringify(mockBody),
    } as APIGatewayProxyEventV2;

    const response = await createTransactionController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.Created);
    expect(body).toBe(
      JSON.stringify({ message: "Transaction created successfully" })
    );
  });

  it("should throw a meaningful error message and return 422 status", async () => {
    const mockBody: Omit<CreateTransactionBody, "currency"> = {
      amount: 100,
      method: TransactionMethod.CARD,
    };
    const mockEvent = {
      body: JSON.stringify(mockBody),
    } as APIGatewayProxyEventV2;

    const response = await createTransactionController(mockEvent);
    const statusCode = _.get(response, "statusCode");
    const body = _.get(response, "body");

    expect(statusCode).toBe(HttpStatusCode.UnprocessableEntity);
    expect(body).toBe(
      JSON.stringify({
        message: "Invalid data",
        data: [{ message: "must have required property 'currency'" }],
      })
    );
  });
});
