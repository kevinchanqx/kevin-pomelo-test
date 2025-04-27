import { JSONSchemaType } from "ajv";
import { CreateTransactionBody } from "../types/create-transaction.type";
import {
  TransactionCurrency,
  TransactionMethod,
} from "@shared/databases/postgres/tables/transaction.table";

export const createTransactionBodySchema: JSONSchemaType<CreateTransactionBody> =
  {
    type: "object",
    properties: {
      method: {
        type: "string",
        nullable: false,
        enum: Object.values(TransactionMethod),
      },
      currency: {
        type: "string",
        nullable: false,
        enum: Object.values(TransactionCurrency),
      },
      amount: { type: "number", nullable: false },
    },
    required: ["method", "amount", "currency"],
    additionalProperties: false,
  };
