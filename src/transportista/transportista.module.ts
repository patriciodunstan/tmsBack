import { Module } from '@nestjs/common';
import { TransportistaService } from './transportista.service';
import { TransportistaController } from './transportista.controller';

@Module({
  controllers: [TransportistaController],
  providers: [TransportistaService],
})
export class TransportistaModule {}
