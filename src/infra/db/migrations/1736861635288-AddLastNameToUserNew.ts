import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1736861635288 implements MigrationInterface {
    name = 'AddLastNameToUserNew1736861635288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seller" ("id" SERIAL NOT NULL, "shopName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."seller_role_enum" NOT NULL DEFAULT 'seller', "userId" integer, CONSTRAINT "REL_af49645e98a3d39bd4f3591b33" UNIQUE ("userId"), CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user1" ADD CONSTRAINT "FK_f11c4bee8dec6788971c375cf69" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "FK_af49645e98a3d39bd4f3591b334" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "FK_af49645e98a3d39bd4f3591b334"`);
        await queryRunner.query(`ALTER TABLE "user1" DROP CONSTRAINT "FK_f11c4bee8dec6788971c375cf69"`);
        await queryRunner.query(`DROP TABLE "seller"`);
    }

}
