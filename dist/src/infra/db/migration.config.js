"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
// Set paths for your TypeORM CLI and DataSource file
const dataSourcePath = path_1.default.resolve(__dirname, "data-source.ts");
const migrationsDir = path_1.default.resolve(__dirname, "migrations"); // Adjust if needed
// 1. Generate migration
const generateMigration = (migrationName) => {
    try {
        console.log(`Generating migration: ${migrationName}...`);
        (0, child_process_1.execSync)(`npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -d ${dataSourcePath} ${migrationsDir}/${migrationName}`, { stdio: "inherit" });
        console.log("Migration generated successfully.");
    }
    catch (error) {
        console.error("Error generating migration:", error.message);
        process.exit(1); // Exit if migration generation fails
    }
};
// 2. Run migrations (apply them to the database)
const runMigrations = () => {
    try {
        console.log("Running migrations...");
        (0, child_process_1.execSync)(`npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d ${dataSourcePath}`, { stdio: "inherit" });
        console.log("Migrations ran successfully.");
    }
    catch (error) {
        console.error("Error running migrations:", error.message);
        process.exit(1); // Exit if running migrations fails
    }
};
// Usage example: First generate migration, then run it
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const migrationName = "AddLastNameToUserNew"; // Replace with your migration name
    generateMigration(migrationName);
    runMigrations();
});
// Execute the script
main();
