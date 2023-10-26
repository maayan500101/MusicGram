import { Field, InputType, ObjectType } from 'type-graphql';
import { UniqueFieldValidator } from '../services';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { Playlist } from '../playlists/playlists.entity';

@Entity()
@ObjectType()
export class User {
  @IsOptional()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @IsString()
  @UniqueFieldValidator(User)
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

@InputType()
export class UserLogin extends User {
  @IsString()
  @Field()
  username: string;
  @Field()
  @IsString()
  password: string;
}

@ObjectType()
export class Token {
  @Field()
  token: String;
}
