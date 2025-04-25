import { Client } from "pg";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "user",
  password: "password",
  database: "mydb",
});

(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");

    const pathArray = dirname(fileURLToPath(import.meta.url)).split("/");
    pathArray.pop();

    const sqlFilePath = path.join(pathArray.join("/"), "mock/transaction.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");

    await client.query(sql);
    console.log("SQL script executed successfully");
  } catch (err) {
    console.error("Error running SQL script", err);
  } finally {
    await client.end();
    console.log("Disconnected from PostgreSQL database");
  }
})();
