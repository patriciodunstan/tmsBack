/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { UserActivity } from './entities/user-activity.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  let activityRepository: Repository<UserActivity>;

  const mockUsersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockActivityRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(UserActivity),
          useValue: mockActivityRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    activityRepository = module.get<Repository<UserActivity>>(getRepositoryToken(UserActivity));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const createUserDto = {
        name: 'Test User',
        rut: '12345678-9',
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.CLIENT,
      };

      mockUsersRepository.findOne.mockResolvedValueOnce(null); // rut
      mockUsersRepository.findOne.mockResolvedValueOnce(null); // email
      mockUsersRepository.create.mockImplementation(dto => dto);
      mockUsersRepository.save.mockImplementation(user => ({ ...user, id: 1 }));
      mockActivityRepository.create.mockReturnValue({});
      mockActivityRepository.save.mockResolvedValue({});

      const result = await service.createUser(createUserDto);

      expect(result).toHaveProperty('id');
      expect(mockUsersRepository.create).toHaveBeenCalled();
      expect(mockUsersRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if rut exists', async () => {
      mockUsersRepository.findOne.mockResolvedValueOnce({ id: 1 });

      await expect(
        service.createUser({
          name: 'Test User',
          rut: '12345678-9',
          email: 'test@example.com',
          password: 'password123',
        } as CreateUserDto)
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if email exists', async () => {
      mockUsersRepository.findOne.mockResolvedValueOnce(null); // rut
      mockUsersRepository.findOne.mockResolvedValueOnce({ id: 1 }); // email

      await expect(
        service.createUser({
          name: 'Test User',
          rut: '12345678-9',
          email: 'test@example.com',
          password: 'password123',
        } as CreateUserDto)
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findByRut', () => {
    it('should return user if found', async () => {
      const user = { id: 1, rut: '12345678-9', name: 'Test User' };
      mockUsersRepository.findOne.mockResolvedValue(user);

      const result = await service.findByRut('12345678-9');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.findByRut('12345678-9')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return user if found', async () => {
      const user = { id: 1, email: 'test@example.com', name: 'Test User' };
      mockUsersRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const user = { id: 1, rut: '12345678-9', name: 'Test User' };
      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.save.mockResolvedValue({ ...user, name: 'Updated' });
      mockActivityRepository.create.mockReturnValue({});
      mockActivityRepository.save.mockResolvedValue({});

      const result = await service.updateUser('12345678-9', { name: 'Updated' } as UpdateUserDto);
      expect(result.name).toBe('Updated');
    });
  });

  describe('activateUser', () => {
    it('should activate the user', async () => {
      const user = { id: 1, rut: '12345678-9', active: false };
      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.save.mockResolvedValue({ ...user, active: true });
      mockActivityRepository.create.mockReturnValue({});
      mockActivityRepository.save.mockResolvedValue({});

      const result = await service.activateUser('12345678-9');
      expect(result.active).toBe(true);
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate the user', async () => {
      const user = { id: 1, rut: '12345678-9', active: true };
      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.save.mockResolvedValue({ ...user, active: false });
      mockActivityRepository.create.mockReturnValue({});
      mockActivityRepository.save.mockResolvedValue({});

      const result = await service.deactivateUser('12345678-9');
      expect(result.active).toBe(false);
    });
  });

  describe('remove', () => {
    it('should remove the user', async () => {
      const user = { id: 1, rut: '12345678-9' };
      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.delete.mockResolvedValue({ affected: 1 });
      mockActivityRepository.create.mockReturnValue({});
      mockActivityRepository.save.mockResolvedValue({});

      await expect(service.removeUser('12345678-9')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue({ id: 1, rut: '12345678-9' });
      mockUsersRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.removeUser('12345678-9')).rejects.toThrow(NotFoundException);
    });
  });
});
