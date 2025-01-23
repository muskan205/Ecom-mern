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
exports.AddLastNameToUserNew1736861569741 = void 0;
class AddLastNameToUserNew1736861569741 {
    constructor() {
        this.name = 'AddLastNameToUserNew1736861569741';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "email" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "email" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
        });
    }
}
exports.AddLastNameToUserNew1736861569741 = AddLastNameToUserNew1736861569741;
