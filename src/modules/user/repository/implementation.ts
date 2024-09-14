import { NewUser, UserUpdate } from '../../../database/tables/user';
import { IUserRepository } from './interface';
import { db } from '../../../database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  async find(id: number) {
    const user = await db
      .selectFrom('user')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
    return user;
  }

  async create(user: NewUser) {
    const createdUser = await db
      .insertInto('user')
      .values(user)
      .returningAll()
      .executeTakeFirst();
    return createdUser;
  }

  async update(id: number, user: UserUpdate) {
    return db
      .updateTable('user')
      .set(user)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async remove(id: number) {
    db.deleteFrom('user').where('id', '=', id).execute();
    return;
  }
}
