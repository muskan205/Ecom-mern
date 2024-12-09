import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1730879709303 implements MigrationInterface {
    name = 'AddLastNameToUserNew1730879709303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "muskan_new" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "muskan_new" ADD "firstName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "muskan_new" ADD "lastName" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "muskan_new" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "muskan_new" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "description"`);
    }

}
