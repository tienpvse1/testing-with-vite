import { Test, TestingModule } from '@nestjs/testing';
import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

let createdUserId: number;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /user', async () => {
    const user: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    const result = await request(app.getHttpServer()).post('/user').send(user);
    createdUserId = result.body.id;
    expect(createdUserId).not.toBeNull();
    expect(result.body).toMatchObject(user);
    expect(result.ok).toBeTruthy();

    const duplicateUser = await request(app.getHttpServer())
      .post('/user')
      .send(user);
    expect(duplicateUser.ok).not.toBeTruthy();
    expect(duplicateUser.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('GET /user/:id', async () => {
    const result = await request(app.getHttpServer()).get(
      `/user/${createdUserId}`,
    );
    expect(result.body.id).toBe(createdUserId);
    expect(result.ok).toBeTruthy();

    const notFoundResult = await request(app.getHttpServer()).get(`/user/0`);

    expect(notFoundResult.ok).not.toBeTruthy();
    expect(notFoundResult.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
