import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1733742272302 implements MigrationInterface {
  name = "AddLastNameToUserNew1733742272302";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "muskan_test88" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, CONSTRAINT "PK_d787c756ae08718c29dacd672bc" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "muskan_test88"`);
  }
}
