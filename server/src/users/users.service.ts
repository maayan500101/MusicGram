import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ORM } from '@ORM';
import { getToken } from '@middlewares';
import { User, UserInput } from './users.entity';

const UserRepo = ORM.getRepository(User);

export const getUsers = async (findRelatedPlaylists: boolean) => {
  return UserRepo.find({ relations: { playlists: !!findRelatedPlaylists } });
};

export const findUser = async ({ username, password }: Partial<User>) => {
  const user = await UserRepo.findOne({ where: { username, password } });

  return getToken(user);
};

export const createUser = async (newUser: UserInput) => {
  const formattedUser = plainToInstance(User, newUser);
  const errors = await validate(formattedUser);

  if (errors.length) {
    throw errors[0];
  }

  return getToken(await UserRepo.save(newUser));
};
