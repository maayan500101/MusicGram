import { Field, InputType, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UniqueFieldValidator } from '@services';
import { Playlist } from '@playlists/playlists.entity';

@Entity()
@ObjectType()
export class User {
  @IsOptional()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @UniqueFieldValidator()
  @Column({ unique: true })
  @IsString()
  @Field()
  username: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Field((_type) => [Playlist], { nullable: true })
  @ManyToMany(() => Playlist, (Playlist) => Playlist.users)
  @JoinTable({ name: 'users_playlists' })
  playlists: Playlist[];
}

@ObjectType()
export class Token {
  @Field((_type) => String, { nullable: true })
  token: string | null;
}

@InputType()
export class UserInput {
  @IsString()
  @Field()
  username: string;
  @Field()
  @IsString()
  password: string;
}
