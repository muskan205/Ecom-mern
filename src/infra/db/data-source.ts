// CommonJS style
const { DataSource } = require("typeorm");


module.exports = {
  AppDataSource: new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "geitpl",
    database: "muskan_eommerce",
    synchronize: false,
    entities: ["src/entity/*.ts","src/modules/seller/entity/*ts","src/modules/seller/entity/shopEntity/*ts"],
    migrations: ["src/infra/db/migrations/*.ts"],
    migrationsTableName: "custom_migration_table",
  }),
};
