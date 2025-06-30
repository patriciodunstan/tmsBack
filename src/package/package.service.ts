import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import { PackageStatus } from './dto/package-status.dto';


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

  async findAll(): Promise<Package[]> {
    return this.packageRepository.find({
      relations: ['client', 'zone', 'order'],
      order: { createdAt: 'DESC' }
    })
  }

  async findOne(id: number): Promise<Package> {
    const pkg = await this.packageRepository.findOne({
      where: { id },
      relations: ['client', 'zone', 'order'],
    })

    if (!pkg) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }
    return pkg;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto): Promise<Package> {
    const pkg = await this.packageRepository.findOne({ where: { id } });
    if (!pkg) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }

    if (pkg.packageStatus !== PackageStatus.PENDING) {
      throw new BadRequestException('Package is not pending');
    }

    if (updatePackageDto.clientId) {
      const client = await this.clientRepository.findOne({
        where: { id: updatePackageDto.clientId }
      });
      if (!client) {
        throw new NotFoundException(`Client with id ${updatePackageDto.clientId} not found`);
      }
    }

    Object.assign(pkg, updatePackageDto);
    return this.packageRepository.save(pkg);
  }

  async remove(id: number): Promise<void> {
    const pkg = await this.findOne(id);
    if (pkg.packageStatus !== PackageStatus.PENDING) {
      throw new BadRequestException('Package is not pending');
    }
    await this.packageRepository.remove(pkg);
  }


  async findByClientId(clientId: number): Promise<Package[]> {
    return this.packageRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'zone', 'order'],
      order: { createdAt: 'DESC' }
    })
  }

  async findByStatus(status: PackageStatus): Promise<Package[]> {
    return this.packageRepository.find({
      where: { packageStatus: status },
      relations: ['client', 'zone', 'order'],
      order: { createdAt: 'DESC' }
    })
  }

  async updateStatus(id: number, status: PackageStatus): Promise<Package> {
    const pkg = await this.findOne(id);
    if (!pkg) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }
    pkg.packageStatus = status;
    return this.packageRepository.save(pkg);
  }
}
