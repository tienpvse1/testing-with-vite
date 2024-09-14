import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositorySymbol } from './repository/symbol';
import { mockUserRepository } from '../__test__/mocks';
import { CreateUserDto } from './dto/create-user.dto';
import { vi } from 'vitest';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

const existingUser = {
  id: 1,
  name: 'Test',
  email: '',
};
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositorySymbol,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create user function', async () => {
    vi.spyOn(mockUserRepository, 'create');
    const user: CreateUserDto = {
      name: 'Test',
      email: 'test@gmail.com',
    };
    const expectedResult = {
      id: 1,
      ...user,
    };
    const result = await service.create(user);
    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject(expectedResult);
  });

  it('should find correct user ', async () => {
    vi.spyOn(mockUserRepository, 'find').mockImplementation(async (id) => {
      if (id === 1) {
        return existingUser;
      } else return null;
    });
    vi.spyOn(service, 'findOne');

    try {
      const result = await service.findOne(1);
      expect(result).toMatchObject(existingUser);
    } catch (error) {
      expect(error).not.toBeDefined();
    }

    try {
      await service.findOne(2);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
    expect(service.findOne).toHaveBeenCalledTimes(2);
    expect(mockUserRepository.find).toHaveBeenCalledTimes(2);
  });

  it('should remove user', async () => {
    vi.spyOn(mockUserRepository, 'remove').mockImplementation(async (id) => {
      if (id === 1) {
        return;
      } else {
        throw new Error('User not found');
      }
    });
    try {
      await service.remove(1);
    } catch (error) {}

    try {
      await service.remove(1);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }

    expect(mockUserRepository.remove).toHaveBeenCalledTimes(2);
  });
});
