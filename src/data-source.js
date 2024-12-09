// CommonJS style
var DataSource = require("typeorm").DataSource;
var UserNew = require("./entity/User").UserNew;
module.exports = {
  AppDataSource: new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "geitpl",
    database: "muskan_test",
    synchronize: false,
    entities: [UserNew],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "custom_migration_table",
  }),
};
