import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { Package } from '../package/entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Package])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule { }
