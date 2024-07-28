import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/scheme/index.ts",
  out: "./src/lib/drizzle",
  dialect: "sqlite",
  driver: "expo",
  verbose: true,
} satisfies Config;
