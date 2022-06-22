import { Tag } from "src/modules/main/movies/entities/tag.entity"
import { define } from "typeorm-seeding"
import * as Faker from 'faker'

define(Tag, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const name = faker.name.firstName(gender)
 
  const tag = new Tag()
  tag.name = `${name}`

  return tag
})