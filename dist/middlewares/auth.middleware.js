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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const axios_1 = require("axios");
const process = require("node:process");
let AuthGuard = class AuthGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.replace('Bearer ', '');
            const permissions = this.reflector.get('permissions', context.getHandler());
            const baseURL = process.env.JWT_SERVICE_URL || 'http://localhost:3001';
            const requests = permissions.map((permission) => axios_1.default.get(`${baseURL}/can-do/${permission}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }));
            const results = await Promise.allSettled(requests);
            const atLeastOneAllowed = results.some(result => result.status === 'fulfilled' && result.value.data);
            if (atLeastOneAllowed) {
                return true;
            }
            else {
                throw new common_1.UnauthorizedException("error");
            }
        }
        catch (error) {
            let errorMessage = error?.message;
            if (error.isAxiosError && error.response) {
                errorMessage = error.response.data?.message || error.response.data || error.message;
                throw new common_1.UnauthorizedException({
                    message: errorMessage,
                    error: error.response.data.error,
                    status: error.response.status
                });
            }
            throw new common_1.UnauthorizedException(errorMessage);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.middleware.js.map