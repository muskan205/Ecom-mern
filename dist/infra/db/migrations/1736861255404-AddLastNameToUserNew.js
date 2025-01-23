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
exports.AddLastNameToUserNew1736861255404 = void 0;
class AddLastNameToUserNew1736861255404 {
    constructor() {
        this.name = 'AddLastNameToUserNew1736861255404';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" ADD "email" character varying(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying(255) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
            yield queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "email"`);
        });
    }
}
exports.AddLastNameToUserNew1736861255404 = AddLastNameToUserNew1736861255404;
