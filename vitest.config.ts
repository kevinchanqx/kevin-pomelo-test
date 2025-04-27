import { defineConfig } from "vitest/config";
import tsconfig from "./tsconfig.json";
import path from "path";

const alias = Object.fromEntries(
  // For Each Path in tsconfig.json
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
    // Remove the "/*" from the key and resolve the path
    key.replace("/*", ""),
    // Remove the "/*" from the value Resolve the relative path
    path.resolve(__dirname, value.replace("/*", "")),
  ])
);

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      reporter: ["text"],
    },
    include: ["src/**/*.test.{js,ts}"],
  },
  resolve: {
    alias,
  },
});
