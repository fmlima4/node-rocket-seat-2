import knex from "knex";

export const config = {
  client: "better-sqlite3",
  connection: {
    filename: "./tmp/database/data.db",
  },
  useNullAsDefault: true,
};

export const database = knex(config);
