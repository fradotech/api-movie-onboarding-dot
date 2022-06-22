import { Tag } from "src/modules/main/movies/entities/tag.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateTag implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Tag)().createMany(10)
  }
}