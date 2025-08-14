import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit_log.dto';
import { UpdateAuditLogDto } from './dto/update-audit_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit_log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>
  ) { }

  async createAuditLog(createAuditLogDto: CreateAuditLogDto, userId: number) {
    const auditLog = this.auditLogRepository.create({
      ...createAuditLogDto,
      user_id: userId,
    });
    return this.auditLogRepository.save(auditLog);
  }

  findAll() {
    return `This action returns all auditLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditLog`;
  }

  update(id: number, updateAuditLogDto: UpdateAuditLogDto) {
    return `This action updates a #${id} auditLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditLog`;
  }
}
