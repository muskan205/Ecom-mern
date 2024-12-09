import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1733741549260 implements MigrationInterface {
  name = "AddLastNameToUserNew1733741549260";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "muskan_test8" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, CONSTRAINT "PK_55a10da4f7e06b2c46a66a2f0b0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "muskan_test8"`);
  }
}
