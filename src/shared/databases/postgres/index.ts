import { Sequelize } from "sequelize";

let pgClient: Sequelize | null;

export const getPgClient = () => {
  if (!pgClient) {
    // For demo purpose, the credential should be stored in environment variables or a secure vault
    pgClient = new Sequelize("postgres://user:password@localhost:5432/mydb");
    return pgClient;
  }
  return pgClient;
};
