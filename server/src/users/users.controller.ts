import { Arg, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql';
import getRequestedFields from '../services/get-requested-fields';
import { User, UserLogin, Token } from './users.entity';
import { getUsers, findUser, createUser } from './users.service';

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() ctx: any) {
    return ctx.user;
  }

  @Query((_returns) => [User])
  async users(@Info() info: any) {
    const requestedFields = getRequestedFields(info);

    return await getUsers(requestedFields.includes('playlists'));
  }

  @Mutation((_return) => Token)
  async loginUser(@Arg('data') userInput: UserLogin) {
    return { token: await findUser(userInput) };
  }

  @Mutation((_return) => Token)
  async createUser(@Arg('data') newUserInput: UserLogin) {
    return { token: await createUser(newUserInput) };
  }
}
