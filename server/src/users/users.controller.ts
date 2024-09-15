import { Arg, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql';
import { getRequestedFields } from '@services/get-requested-fields';
import { User, Token, UserInput } from './users.entity';
import { getUsers, findUser, createUser } from './users.service';
import { Response } from 'express';

@Resolver()
export class UserResolver {
  @Query((_returns) => [User])
  async users(@Info() info: any) {
    const requestedFields = getRequestedFields(info);

    return await getUsers(requestedFields.includes('playlists'));
  }

  @Mutation((_return) => Token)
  async loginUser(
    @Arg('data') userInput: UserInput,
    @Ctx() { res }: { res: Response },
  ) {
    const token = await findUser(userInput);
    res.cookie('token', token as string);

    return { token };
  }

  @Mutation((_return) => Token)
  async createUser(@Arg('data') newUserInput: UserInput) {
    return { token: await createUser(newUserInput) };
  }
}
