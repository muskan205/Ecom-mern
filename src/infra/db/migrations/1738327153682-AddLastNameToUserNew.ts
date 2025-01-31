import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUserNew1738327153682 implements MigrationInterface {
    name = 'AddLastNameToUserNew1738327153682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test-seller1" ("id" SERIAL NOT NULL, "username" text NOT NULL, "shopName" character varying(255), "accountId" integer, CONSTRAINT "REL_79d611898b172965c00bf56670" UNIQUE ("accountId"), CONSTRAINT "PK_34703958274d4d5626431918a0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying(255) NOT NULL, "role" "public"."account_role_enum" NOT NULL DEFAULT 'user', "accessToken" text, "refreshToken" text, "otp" text, "otpExpires" TIMESTAMP, "lastOtpSentAt" TIMESTAMP, "active" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "sellerAccount" integer, "accountId" integer, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "REL_2d089b79815e853857b77af412" UNIQUE ("sellerAccount"), CONSTRAINT "REL_b1a9fdd281787a66a213f5b725" UNIQUE ("accountId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-test" ("id" SERIAL NOT NULL, "username" text NOT NULL, "accountId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_754ba5773f9d972164808b6bde" UNIQUE ("accountId"), CONSTRAINT "PK_cd30ffe0649cea91f1f148c4ef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "test-seller1" ADD CONSTRAINT "FK_79d611898b172965c00bf566705" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_2d089b79815e853857b77af4123" FOREIGN KEY ("sellerAccount") REFERENCES "test-seller1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_b1a9fdd281787a66a213f5b725b" FOREIGN KEY ("accountId") REFERENCES "user-test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-test" ADD CONSTRAINT "FK_754ba5773f9d972164808b6bded" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-test" DROP CONSTRAINT "FK_754ba5773f9d972164808b6bded"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_b1a9fdd281787a66a213f5b725b"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_2d089b79815e853857b77af4123"`);
        await queryRunner.query(`ALTER TABLE "test-seller1" DROP CONSTRAINT "FK_79d611898b172965c00bf566705"`);
        await queryRunner.query(`DROP TABLE "user-test"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "test-seller1"`);
    }

}
