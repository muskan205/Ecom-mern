import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1733751113687 implements MigrationInterface {
    name = 'AddLastNameToUserNew1733751113687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "muskan_new_dummy9" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f0baa14904218398ad1c4009cdf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "muskan_new_dummy9"`);
    }

}
