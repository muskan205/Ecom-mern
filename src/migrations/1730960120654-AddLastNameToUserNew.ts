import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1730960120654 implements MigrationInterface {
    name = 'AddLastNameToUserNew1730960120654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_date"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_name"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
    }

}
