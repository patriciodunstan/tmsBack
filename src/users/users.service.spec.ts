import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: Repository<User>;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'Patricio' }]),
    findOneBy: jest.fn().mockImplementation(({ id }) => Promise.resolve({ id, name: 'Olivia' })),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'Olivia' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, name: 'Olivia' });
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(dto);
  });
});
