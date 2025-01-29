"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Seller = class Seller {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Seller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", Object)
], Seller.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], Seller.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255, nullable: false }),
    __metadata("design:type", Object)
], Seller.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], Seller.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["admin", "seller", "user"],
        default: "seller",
    }),
    __metadata("design:type", Object)
], Seller.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.seller),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Seller.prototype, "user", void 0);
Seller = __decorate([
    (0, typeorm_1.Entity)("seller")
], Seller);
exports.Seller = Seller;
