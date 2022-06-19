import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.findOne(createUserDto)
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.findOne(id)
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } })
  }
}