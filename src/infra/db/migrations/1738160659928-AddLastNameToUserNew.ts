import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1738160659928 implements MigrationInterface {
    name = 'AddLastNameToUserNew1738160659928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" SET NOT NULL`);
    }

}
