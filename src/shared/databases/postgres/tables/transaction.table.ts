import { DataTypes, Model } from "sequelize";
import { getPgClient } from "..";

const pgClient = getPgClient();

export enum TransactionMethod {
  CASH = "cash",
  CARD = "card",
  VOUCHER = "voucher",
}

type TransactionAttributes = {
  id: string;
  method: TransactionMethod;
  amount: number;
  currency: string;
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
    id: { type: DataTypes.STRING, primaryKey: true },
    method: {
      type: DataTypes.ENUM("cash", "card", "voucher"),
      allowNull: false,
    },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "transaction",
    freezeTableName: true,
    timestamps: true,
  }
);
