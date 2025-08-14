import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Package } from './entities/package.entity';
import { Client } from '../clients/entities/client.entity';
import { Zone } from '../zones/entities/zone.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Package, Client, Zone]),
    ClientsModule, 
    ZonesModule
  ],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule { }
