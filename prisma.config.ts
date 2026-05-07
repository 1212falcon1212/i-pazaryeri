import "dotenv/config";
import { defineConfig } from "prisma/config";

// Allow swapping the schema file via env (e.g. PRISMA_SCHEMA=prisma/schema.prod.prisma on VPS).
const schema = process.env.PRISMA_SCHEMA ?? "prisma/schema.prisma";

export default defineConfig({
  schema,
  migrations: {
    path: "prisma/migrations"
  },
  datasource: {
    url: process.env["DATABASE_URL"]
  }
});
