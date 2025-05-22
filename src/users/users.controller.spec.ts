import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    findByRut: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
    deactivateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'Test User',
        rut: '12345678-9',
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.LOGISTICO,
      };

      const mockUser = {
        id: 1,
        ...createUserDto,
        active: true,
        createdAt: new Date(),
      };

      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Test User 1',
          rut: '12345678-9',
          role: UserRole.BODEGA,
          active: true,
        },
        {
          id: 2,
          name: 'Test User 2',
          rut: '98765432-1',
          role: UserRole.BODEGA,
          active: true,
        },
      ];

      mockUsersService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAllUser();

      expect(result).toEqual(mockUsers);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by rut', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        rut: '12345678-9',
        role: UserRole.BODEGA,
        active: true,
      };

      mockUsersService.findByRut.mockResolvedValue(mockUser);

      const result = await controller.findByRut('12345678-9');

      expect(result).toEqual(mockUser);
      expect(usersService.findByRut).toHaveBeenCalledWith('12345678-9');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        name: 'Updated User',
      };

      const mockUser = {
        id: 1,
        name: 'Updated User',
        rut: '12345678-9',
        role: UserRole.ADMIN,
        active: true,
      };

      mockUsersService.updateUser.mockResolvedValue(mockUser);

      const result = await controller.updateUser('12345678-9', updateUserDto);

      expect(result).toEqual(mockUser);
      expect(usersService.updateUser).toHaveBeenCalledWith('12345678-9', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUsersService.removeUser.mockResolvedValue(undefined);

      await controller.removeUser('12345678-9');

      expect(usersService.removeUser).toHaveBeenCalledWith('12345678-9');
    });
  });

  describe('desactivate', () => {
    it('should deactivate a user', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        rut: '12345678-9',
        role: UserRole.LOGISTICO,
        active: false,
      };

      mockUsersService.deactivateUser.mockResolvedValue(mockUser);

      const result = await controller.desactivateUser('12345678-9');

      expect(result).toEqual(mockUser);
      expect(usersService.deactivateUser).toHaveBeenCalledWith('12345678-9');
    });
  });
});
