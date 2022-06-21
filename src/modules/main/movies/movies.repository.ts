import { EntityRepository, Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./entities/movie.entity";

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async saveOne(createMovieDto: CreateMovieDto): Promise<Movie | null> {
    return await this.save(createMovieDto)
  }

  async findOneById(id: number): Promise<Movie | null> {
    return await this.findOne(id)
  }

  async findOneByEmail(email: string): Promise<Movie | null> {
    return await this.findOne({ where: { email } })
  }
}