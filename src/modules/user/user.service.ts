import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './repository/interface';
import { UserRepositorySymbol } from './repository/symbol';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userRepository.create(createUserDto);
      return createdUser;
    } catch (error) {
      throw new BadRequestException('cannot create user');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.find(id);
      return user;
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    try {
      await this.userRepository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('user not found');
    }
  }
}
