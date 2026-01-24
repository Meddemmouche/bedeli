import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // 1. Path to your schema file
  schema: "./lib/schema.ts",
  
  // 2. Where Drizzle will store migration history
  out: "./drizzle",
  
  // 3. The type of database
  dialect: "sqlite",
  
  // 4. Connection details
  dbCredentials: {
    url: "file:local.db",
  },
});