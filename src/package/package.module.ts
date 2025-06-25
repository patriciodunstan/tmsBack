import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
  imports: [ClientsModule, ZonesModule],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule { }
