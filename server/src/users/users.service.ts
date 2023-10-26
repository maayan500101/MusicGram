import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ORM } from '../ORM';
import { getToken } from '../middlewares/authenticateJWT';
import { User } from './users.entity';

const UserRepo = ORM.getRepository(User);

export const getUsers = async (findRelatedPlaylists: boolean) => {
  return UserRepo.find({ relations: { playlists: !!findRelatedPlaylists } });
};

export const findUser = async ({ username, password }: Partial<User>) => {
  const user = await UserRepo.findOne({ where: { username, password } });

  return getToken(user);
};

export const createUser = async (newUser: User) => {
  const formatedUser = plainToInstance(User, newUser);
  const errors = await validate(formatedUser);

  if (errors.length) {
    throw errors;
  }

  return getToken(await UserRepo.save(newUser));
};
