import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

enum Genre {
  pop = 'פופ',
  rock = 'רוק',
  rap = 'ראפ',
  hiphop = 'היפ-הופ',
}

registerEnumType(Genre, {
  name: 'Genre',
});

@Entity()
@ObjectType()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Field()
  id: string;

  @Column()
  @IsString()
  @Field()
  name: string;

  @Column()
  @IsString()
  @Field()
  artist: string;

  @Column({ type: 'enum', enum: Genre })
  @IsEnum(Genre)
  @Field((_type) => Genre)
  genre: Genre;

  @Column({ default: 0 })
  @IsNumber()
  @Field()
  views: Number;

  @Column()
  @IsString()
  url: string;
}

@ObjectType()
export class SongWithFile extends Song {
  @Field()
  file: string;
}
