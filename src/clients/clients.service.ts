import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { Package } from '../packages/entities/package.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>
  ) { }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    // Actualizar datos básicos
    Object.assign(client, updateClientDto);

    // Si hay direcciones favoritas, asegurarse de que solo una sea default
    if (updateClientDto.favoriteAddresses) {
      const hasDefault = updateClientDto.favoriteAddresses.some(addr => addr.isDefault);
      if (hasDefault) {
        updateClientDto.favoriteAddresses = updateClientDto.favoriteAddresses.map(addr => ({
          ...addr,
          isDefault: addr.isDefault || false
        }));
      }
    }

    return this.clientsRepository.save(client);
  }

  async getClientPackages(id: number): Promise<Package[]> {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['packages']
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return client.packages;
  }

  async getClientPackagesWithOrders(id: number): Promise<Package[]> {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['packages', 'packages.order']
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return client.packages;
  }
}