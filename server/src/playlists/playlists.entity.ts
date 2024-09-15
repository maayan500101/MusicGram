import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { Song } from '@songs/songs.entity';
import { User } from '@users/users.entity';

@Entity()
@ObjectType()
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Field()
  id: string;

  @Column()
  @IsString()
  @Field()
  name: string;

  @Field()
  numOfSongs(): Number {
    return this.songs.length;
  }

  @Field((_type) => [Song], { nullable: true })
  @ManyToMany(() => Song)
  @JoinTable({ name: 'songs_playlists' })
  songs: Song[];

  @ManyToMany(() => User, (user) => user.playlists)
  users: User[];
}
