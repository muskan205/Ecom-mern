"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastNameToUserNew1736861664733 = void 0;
class AddLastNameToUserNew1736861664733 {
    constructor() {
        this.name = 'AddLastNameToUserNew1736861664733';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "seller_userId_fkey"`);
            yield queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "role"`);
            yield queryRunner.query(`ALTER TABLE "seller" ADD "role" "public"."seller_role_enum" NOT NULL DEFAULT 'seller'`);
            yield queryRunner.query(`ALTER TABLE "user1" ADD CONSTRAINT "FK_f11c4bee8dec6788971c375cf69" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "FK_af49645e98a3d39bd4f3591b334" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "FK_af49645e98a3d39bd4f3591b334"`);
            yield queryRunner.query(`ALTER TABLE "user1" DROP CONSTRAINT "FK_f11c4bee8dec6788971c375cf69"`);
            yield queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "role"`);
            yield queryRunner.query(`ALTER TABLE "seller" ADD "role" character varying(255) DEFAULT 'seller'`);
            yield queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "shopName" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AddLastNameToUserNew1736861664733 = AddLastNameToUserNew1736861664733;
