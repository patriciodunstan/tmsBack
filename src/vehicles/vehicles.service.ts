import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { transportista_id, zone_id, ...vehicleData } = createVehicleDto;
    
    const vehicle = this.vehicleRepository.create({
      ...vehicleData,
      transportista: { id: transportista_id } as any,
      zone: zone_id ? { id: zone_id } as any : null,
    });
    
    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find({
      relations: ['transportista', 'zone'],
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['transportista', 'zone'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const { transportista_id, zone_id, ...vehicleData } = updateVehicleDto;
    const vehicle = await this.findOne(id);
    
    Object.assign(vehicle, vehicleData);
    if (transportista_id) {
      vehicle.transportista = { id: transportista_id } as any;
    }
    if (zone_id !== undefined) {
      vehicle.zone = zone_id ? { id: zone_id } as any : null;
    }
    
    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }
}
