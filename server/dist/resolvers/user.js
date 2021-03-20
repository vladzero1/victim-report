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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../class/User");
const validation_1 = require("../utils/validation");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let PhoneNumberPasswordInput = class PhoneNumberPasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PhoneNumberPasswordInput.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PhoneNumberPasswordInput.prototype, "password", void 0);
PhoneNumberPasswordInput = __decorate([
    type_graphql_1.InputType()
], PhoneNumberPasswordInput);
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    user({ firestore }) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    register(options, username, { firestore }) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = validation_1.validatePhoneNumber(options.password);
            if (errors) {
                return { errors };
            }
            errors = validation_1.validatePasswordLength(options.password, "password");
            if (errors) {
                return { errors };
            }
            let user = null;
            const hash = yield argon2_1.default.hash(options.password);
            try {
                yield firestore.collection("User").doc(options.phoneNumber).set({
                    username: username,
                    password: hash,
                });
                user = {
                    username: username,
                    password: hash,
                    phoneNumber: options.phoneNumber,
                };
            }
            catch (err) {
                console.log(err);
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email is already exist!",
                        },
                    ],
                };
            }
            return { user: user };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Arg("username")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PhoneNumberPasswordInput, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map