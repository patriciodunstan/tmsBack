import { Test, TestingModule } from '@nestjs/testing';
import { TransportistaController } from './transportista.controller';
import { TransportistaService } from './transportista.service';

describe('TransportistaController', () => {
  let controller: TransportistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportistaController],
      providers: [TransportistaService],
    }).compile();

    controller = module.get<TransportistaController>(TransportistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
