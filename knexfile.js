import { config } from "./src/database.js";
export default {
    ...config,
    migrations: {
        extension: "ts",
        directory: "./tmp/database/migrations",
    },
};
//# sourceMappingURL=knexfile.js.map