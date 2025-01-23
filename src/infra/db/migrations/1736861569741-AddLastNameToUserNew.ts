import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1736861569741 implements MigrationInterface {
    name = 'AddLastNameToUserNew1736861569741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "email" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
    }

}
