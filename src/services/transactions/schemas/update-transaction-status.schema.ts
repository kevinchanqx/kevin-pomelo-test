import { JSONSchemaType } from "ajv";
import { TransactionStatus } from "@shared/databases/postgres/tables/transaction.table";
import { UpdateTransactionStatusBody } from "../types/update-transaction.type";

export const updateTransactionStatusBody: JSONSchemaType<UpdateTransactionStatusBody> =
  {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: Object.values(TransactionStatus),
        nullable: false,
      },
    },
    required: ["status"],
    additionalProperties: false,
  };
