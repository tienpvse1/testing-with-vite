import { NewUser, UserUpdate } from '../../../database/tables/user';
import { User } from '../entities/user.entity';

export type IUserRepository = {
  find: (id: number) => Promise<User | null>;
  create: (user: NewUser) => Promise<User>;
  update: (id: number, user: UserUpdate) => Promise<User>;
  remove: (id: number) => Promise<void>;
};
