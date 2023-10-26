import { Ctx, Info, Query, Resolver } from 'type-graphql';
import { Playlist } from './playlists.entity';
import { getPlaylists, getPlaylistsByUser } from './playlists.service';
import getRequestedFields from '../services/get-requested-fields';

@Resolver()
export class PlaylistResolver {
  @Query((_returns) => [Playlist])
  async playlists(@Info() info: any) {
    const requestedFields = getRequestedFields(info);

    return await getPlaylists(
      requestedFields.includes('songs') ||
        requestedFields.includes('numOfSongs'),
    );
  }

  @Query((_returns) => [Playlist])
  async playlistsByUser(@Info() info: any, @Ctx() ctx: any) {
    const requestedFields = getRequestedFields(info);

    try {
      return await getPlaylistsByUser(
        requestedFields.includes('songs') ||
          requestedFields.includes('numOfSongs'),
        ctx.user.id,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
