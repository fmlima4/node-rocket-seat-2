import knex from "knex";
import { env } from "./env/index.js";

export const config = {
  client: "better-sqlite3",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
};

export const database = knex(config);
