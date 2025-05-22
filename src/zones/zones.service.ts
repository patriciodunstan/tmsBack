import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>
  ) { }

  /**
   * Crea una nueva zona
   * @param createZoneDto Datos para crear la zona
   * @returns La zona creada
   * @throws ConflictException si ya existe una zona con ese nombre
   */
  async createZone(createZoneDto: CreateZoneDto): Promise<Zone> {
    const existingZone = await this.zonesRepository.findOne({
      where: { zone_name: createZoneDto.zone_name }
    });

    if (existingZone) {
      throw new ConflictException('Ya existe una zona con ese nombre');
    }

    const zone = this.zonesRepository.create(createZoneDto);
    return this.zonesRepository.save(zone);
  }

  /**
   * Obtiene todas las zonas
   * @returns Array con todas las zonas
   */
  findAllZones(): Promise<Zone[]> {
    return this.zonesRepository.find();
  }

  /**
   * Busca una zona por su ID
   * @param id ID de la zona
   * @returns La zona encontrada
   * @throws NotFoundException si no se encuentra la zona
   */
  async findZoneById(id: number): Promise<Zone> {
    const zone = await this.zonesRepository.findOne({
      where: { id }
    });

    if (!zone) {
      throw new NotFoundException(`No se encontró la zona con ID ${id}`);
    }

    return zone;
  }

  /**
   * Actualiza una zona
   * @param id ID de la zona
   * @param updateZoneDto Datos para actualizar la zona
   * @returns La zona actualizada
   * @throws NotFoundException si no se encuentra la zona
   * @throws ConflictException si se intenta usar un nombre que ya existe
   */
  async updateZone(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone> {
    const zone = await this.findZoneById(id);

    if (updateZoneDto.zone_name) {
      const existingZone = await this.zonesRepository.findOne({
        where: { zone_name: updateZoneDto.zone_name }
      });

      if (existingZone && existingZone.id !== id) {
        throw new ConflictException('Ya existe una zona con ese nombre');
      }
    }

    Object.assign(zone, updateZoneDto);
    return this.zonesRepository.save(zone);
  }

  /**
   * Cambia el estado activo de una zona
   * @param id ID de la zona
   * @returns La zona actualizada
   * @throws NotFoundException si no se encuentra la zona
   */
  async toggleZoneStatus(id: number): Promise<Zone> {
    const zone = await this.findZoneById(id);
    zone.zone_active = !zone.zone_active;
    return this.zonesRepository.save(zone);
  }

  /**
   * Reasigna paquetes de una zona a otra
   * @param sourceZoneId ID de la zona origen
   * @param targetZoneId ID de la zona destino
   * @returns Objeto con el número de paquetes reasignados
   * @throws NotFoundException si no se encuentra alguna de las zonas
   */
  async reassignZonePackages(sourceZoneId: number, targetZoneId: number): Promise<{ reassignedCount: number }> {
    // Verificar que ambas zonas existan
    await this.findZoneById(sourceZoneId);
    await this.findZoneById(targetZoneId);

    const result = await this.zonesRepository
      .createQueryBuilder()
      .update('packages')
      .set({ zone_id: targetZoneId })
      .where('zone_id = :sourceZoneId', { sourceZoneId })
      .execute();

    return { reassignedCount: result.affected || 0 };
  }

  /**
   * Elimina una zona
   * @param id ID de la zona a eliminar
   * @throws NotFoundException si no se encuentra la zona
   */
  async deleteZone(id: number): Promise<void> {
    const result = await this.zonesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró la zona con ID ${id}`);
    }
  }
}
