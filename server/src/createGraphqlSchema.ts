import { buildSchema } from 'type-graphql';
import { PlaylistResolver } from '@playlists/playlists.controller';
import { UserResolver } from '@users/users.controller';
import { SongResolver } from '@songs/songs.controller';

export const schema = buildSchema({
  resolvers: [SongResolver, PlaylistResolver, UserResolver],
});
