import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsController } from './audit_logs.controller';
import { AuditLogsService } from './audit_logs.service';

describe('AuditLogsController', () => {
  let controller: AuditLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditLogsController],
      providers: [
        AuditLogsService,
        {
          provide: 'AuditLogRepository',
          useValue: {}, // Provide a mock implementation if needed
        },
      ],
    }).compile();

    controller = module.get<AuditLogsController>(AuditLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
