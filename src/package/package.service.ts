import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Zone } from 'src/zones/entities/zone.entity';

@Injectable()
export class PackageService {

  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>,
  ) { }

  async create(createPackageDto: CreatePackageDto) {
    const { clientId, zoneId, ...packageData } = createPackageDto;

    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`)
    }

    const zone = await this.zoneRepository.findOne({ where: { id: zoneId } });
    if (!zone) {
      throw new NotFoundException(`Zone with id ${zoneId} not found`);
    }

    const pkg = this.packageRepository.create({ ...packageData, client, zone });
    return this.packageRepository.save(pkg);
  }

  findAll() {
    return `This action returns all package`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
