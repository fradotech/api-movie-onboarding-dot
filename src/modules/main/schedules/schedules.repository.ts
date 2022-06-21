import { EntityRepository, Repository } from "typeorm";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { Schedule } from "./entities/schedule.entity";

@EntityRepository(Schedule)
export class SchedulesRepository extends Repository<Schedule> {
  async saveOne(createScheduleDto: CreateScheduleDto): Promise<Schedule | null> {
    return await this.save(createScheduleDto)
  }

  async findOneById(id: number): Promise<Schedule | null> {
    return await this.findOne(id)
  }

  async findOneByEmail(email: string): Promise<Schedule | null> {
    return await this.findOne({ where: { email } })
  }
}