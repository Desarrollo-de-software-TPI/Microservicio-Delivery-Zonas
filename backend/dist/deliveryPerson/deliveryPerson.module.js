"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersonModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const deliveryPerson_service_1 = require("./deliveryPerson.service");
const deliveryPerson_controller_1 = require("./deliveryPerson.controller");
const deliveryPerson_entity_1 = require("./deliveryPerson.entity");
const zone_module_1 = require("../zone/zone.module");
let DeliveryPersonModule = class DeliveryPersonModule {
};
exports.DeliveryPersonModule = DeliveryPersonModule;
exports.DeliveryPersonModule = DeliveryPersonModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([deliveryPerson_entity_1.DeliveryPersonEntity]), zone_module_1.ZoneModule],
        controllers: [deliveryPerson_controller_1.DeliveryPersonController],
        providers: [deliveryPerson_service_1.DeliveryPersonService],
        exports: [typeorm_1.TypeOrmModule],
    })
], DeliveryPersonModule);
//# sourceMappingURL=deliveryPerson.module.js.map