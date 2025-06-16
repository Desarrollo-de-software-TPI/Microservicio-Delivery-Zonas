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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const zone_entity_1 = require("./zone.entity");
let ZoneService = class ZoneService {
    zoneRepository;
    constructor(zoneRepository) {
        this.zoneRepository = zoneRepository;
    }
    async findAll(Pagination) {
        const { limit, offset } = Pagination;
        const [zones, total] = await this.zoneRepository.findAndCount({
            take: limit,
            skip: offset,
        });
        return { zones, total };
    }
    async findOne(id) {
        return this.zoneRepository.findOneOrFail({ where: { id } });
    }
    async findManyByIds(zoneIds) {
        return await this.zoneRepository.find({ where: { id: (0, typeorm_2.In)(zoneIds) } });
    }
    async create(CreateZone) {
        const zone = this.zoneRepository.create(CreateZone);
        return this.zoneRepository.save(zone);
    }
    async update(id, UpdateZone) {
        await this.zoneRepository.update(id, UpdateZone);
        return this.zoneRepository.findOne({ where: { id } });
    }
    async updatePartial(id, UpdateZone) {
        await this.zoneRepository.update(id, UpdateZone);
        return this.zoneRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.zoneRepository.delete(id);
    }
};
exports.ZoneService = ZoneService;
exports.ZoneService = ZoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zone_entity_1.Zone)),
    __metadata("design:paramtypes", [Function])
], ZoneService);
//# sourceMappingURL=zone.service.js.map