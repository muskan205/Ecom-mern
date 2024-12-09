import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1733751504197 implements MigrationInterface {
    name = 'AddLastNameToUserNew1733751504197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "muskan_new_dummy55656" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_10bb4428da3493732694ea0ed85" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "muskan_new_dummy55656"`);
    }

}
