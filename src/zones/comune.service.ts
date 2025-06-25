import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Zone } from "./entities/zone.entity";


@Injectable()
export class ComuneService {
    constructor(
        @InjectRepository(Zone)
        private readonly zoneRepository: Repository<Zone>
    ) { }

    async findComunaByAddress(address: string) {
        const comunaMatch = address.match(/, ([^,]+),/);
        if (!comunaMatch) {
            return null;
        }

        const comunaName = comunaMatch[1].trim();
        return this.zoneRepository.findOne({
            where: {
                zoneName: comunaName,
                zoneActive: true,
            }
        });
    }

    async initializedComunas() {
        const santiagoCommunes = [
            'Cerrillos',
            'Cerro Navia',
            'Conchalí',
            'El Bosque',
            'Estación Central',
            'Huechuraba',
            'Independencia',
            'La Cisterna',
            'La Florida',
            'La Granja',
            'La Pintana',
            'La Reina',
            'Las Condes',
            'Lo Barnechea',
            'Lo Espejo',
            'Lo Prado',
            'Macul',
            'Maipú',
            'Ñuñoa',
            'Pedro Aguirre Cerda',
            'Peñalolén',
            'Providencia',
            'Pudahuel',
            'Quilicura',
            'Quinta Normal',
            'Recoleta',
            'Renca',
            'San Joaquín',
            'San Miguel',
            'San Ramón',
            'Santiago',
            'Vitacura'
        ];

        for (const comuna of santiagoCommunes) {
            const existingComuna = await this.zoneRepository.findOne({
                where: { zoneName: comuna }
            });

            if (!existingComuna) {
                await this.zoneRepository.save({
                    zoneName: comuna,
                    zoneDescription: `Comuna de ${comuna}`,
                    zoneActive: true,
                    boundaries: {
                        postal_codes: []
                    }
                })
            }
        }
    }
}