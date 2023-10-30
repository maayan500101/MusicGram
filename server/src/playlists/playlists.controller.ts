import { Arg, Ctx, Info, Query, Resolver } from 'type-graphql';
import { getRequestedFields } from '@services';
import {
  getPlaylistById,
  getPlaylists,
  getPlaylistsByUser,
} from './playlists.service';
import { Playlist } from './playlists.entity';

const RELATED_SONG_COLUMNS = ['songs', 'numOfSongs'];

@Resolver()
export class PlaylistResolver {
  @Query((_returns) => [Playlist])
  async playlists(@Info() info: any) {
    const requestedFields: string[] = getRequestedFields(info);

    return await getPlaylists(
      requestedFields.some((field) => RELATED_SONG_COLUMNS.includes(field)),
    );
  }

  @Query((_returns) => [Playlist])
  async playlistsByUser(@Info() info: any, @Ctx() ctx: any) {
    const requestedFields: string[] = getRequestedFields(info);

    return await getPlaylistsByUser(
      requestedFields.some((field) => RELATED_SONG_COLUMNS.includes(field)),
      ctx.user.id,
    );
  }

  @Query((_returns) => Playlist)
  async playlistsById(@Arg('id') id: string, @Info() info: any) {
    const requestedFields: string[] = getRequestedFields(info);

    return await getPlaylistById(
      requestedFields.some((field) => RELATED_SONG_COLUMNS.includes(field)),
      id,
    );
  }
}
