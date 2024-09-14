import { IUserRepository } from '../user/repository/interface';
import { vi } from 'vitest';

export const mockUserRepository: IUserRepository = {
  create: vi.fn().mockImplementation((body) => {
    return { ...body, id: 1 };
  }),
  update: vi.fn(),
  find: vi.fn(),
  remove: vi.fn(),
};

export const mockUserService = {
  create: vi.fn(),
  update: vi.fn(),
  findOne: vi.fn(),
  remove: vi.fn(),
};
