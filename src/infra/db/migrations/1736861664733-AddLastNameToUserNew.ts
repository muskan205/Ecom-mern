import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1736861664733 implements MigrationInterface {
    name = 'AddLastNameToUserNew1736861664733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "seller_userId_fkey"`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "role" "public"."seller_role_enum" NOT NULL DEFAULT 'seller'`);
        await queryRunner.query(`ALTER TABLE "user1" ADD CONSTRAINT "FK_f11c4bee8dec6788971c375cf69" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "FK_af49645e98a3d39bd4f3591b334" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "FK_af49645e98a3d39bd4f3591b334"`);
        await queryRunner.query(`ALTER TABLE "user1" DROP CONSTRAINT "FK_f11c4bee8dec6788971c375cf69"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "role" character varying(255) DEFAULT 'seller'`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
