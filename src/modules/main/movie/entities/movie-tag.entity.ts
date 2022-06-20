import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'movie_tags' })
export class MovieTag {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Movie, movie => movie.id)
  movie: Movie

  @ManyToOne(type => Tag, tag => tag.id, { eager: true })
  tag: Tag

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
