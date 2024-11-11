"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "dam_app",
    entities: ["src/entities/*.ts"],
    synchronize: true,
};
exports.default = config;
