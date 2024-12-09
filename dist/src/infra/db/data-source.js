"use strict";
// CommonJS style
const { DataSource } = require("typeorm");
const { UserNew } = require("./entity/User");
const { Student } = require("./entity/Student");
module.exports = {
    AppDataSource: new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "geitpl",
        database: "muskan_test",
        synchronize: false,
        entities: ["src/entity/*.ts"],
        migrations: ["src/infra/db/migrations/*.ts"],
        migrationsTableName: "custom_migration_table",
    }),
};
