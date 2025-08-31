import { config } from "./src/database.js";

export default {
  ...config,
  migrations: {
    extension: "js",
    directory: "./tmp/database/migrations",
  },
};