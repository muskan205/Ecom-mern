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
exports.AddLastNameToUserNew1730879709303 = void 0;
class AddLastNameToUserNew1730879709303 {
    constructor() {
        this.name = 'AddLastNameToUserNew1730879709303';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "muskan_new" ADD "description" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "firstName"`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" ADD "firstName" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "lastName"`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" ADD "lastName" text NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "lastName"`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" ADD "lastName" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "firstName"`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" ADD "firstName" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "muskan_new" DROP COLUMN "description"`);
        });
    }
}
exports.AddLastNameToUserNew1730879709303 = AddLastNameToUserNew1730879709303;
