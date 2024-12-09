import { execSync } from 'child_process';
import path from 'path';

// Set paths for your TypeORM CLI and DataSource file
const dataSourcePath = path.resolve(__dirname, 'src/data-source.ts');
const migrationsDir = path.resolve(__dirname, 'src/migrations');  // Adjust if needed

// 1. Generate migration
const generateMigration = (migrationName: string) => {
  try {
    console.log(`Generating migration: ${migrationName}...`);
    execSync(
      `npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -d ${dataSourcePath} ${migrationsDir}/${migrationName}`,
      { stdio: 'inherit' } // This makes the output appear in your terminal
    );
    console.log('Migration generated successfully.');
  } catch (error:any) {
    console.error('Error generating migration:', error.message);
    process.exit(1); // Exit if migration generation fails
  }
};

// 2. Run migrations (apply them to the database)
const runMigrations = () => {
  try {
    console.log('Running migrations...');
    execSync(
      `npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d ${dataSourcePath}`,
      { stdio: 'inherit' } // This makes the output appear in your terminal
    );
    console.log('Migrations ran successfully.');
  } catch (error:any) {
    console.error('Error running migrations:', error.message);
    process.exit(1); // Exit if running migrations fails
  }
};

// Usage example: First generate migration, then run it
const main = async () => {
  const migrationName = 'AddLastNameToUserNew'; // Replace with your migration name
  generateMigration(migrationName);
  runMigrations();
};

// Execute the script
main();
