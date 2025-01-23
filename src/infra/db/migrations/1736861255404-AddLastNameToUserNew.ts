import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1736861255404 implements MigrationInterface {
    name = 'AddLastNameToUserNew1736861255404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "email"`);
    }

}
