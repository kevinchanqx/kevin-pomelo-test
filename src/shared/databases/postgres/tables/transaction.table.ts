import { DataTypes, Model } from "sequelize";
import { getPgClient } from "..";

const pgClient = getPgClient();

export enum TransactionMethod {
  CASH = "cash",
  CARD = "card",
  VOUCHER = "voucher",
}

export enum TransactionStatus {
  NEW = "new",
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export enum TransactionCurrency {
  MYR = "MYR",
  SGD = "SGD",
}

type TransactionAttributes = {
  id: number;
  method: TransactionMethod;
  amount: number;
  currency: string;
  status: TransactionStatus;
};

type TransactionCreationAttributes = TransactionAttributes;

type TransactionModel = Model<
  TransactionAttributes,
  TransactionCreationAttributes
>;

export type Transaction = TransactionAttributes & {
  createdAt: Date;
  updatedAt: Date;
};

export const TransactionRepo = pgClient.define<TransactionModel>(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM(...Object.values(TransactionMethod)),
      allowNull: false,
    },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: {
      type: DataTypes.ENUM(...Object.values(TransactionCurrency)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TransactionStatus)),
      allowNull: false,
    },
  },
  {
    tableName: "transaction",
    freezeTableName: true,
    timestamps: true,
  }
);
