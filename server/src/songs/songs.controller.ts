import { Arg, Info, Query, Resolver } from 'type-graphql';
import { Song, SongWithFile } from './songs.entity';
import { getSongWithFileBufferById, getSongs } from './songs.service';
import { getRequestedFields } from '@services/get-requested-fields';

@Resolver()
export class SongResolver {
  @Query((_returns) => [Song])
  async songs() {
    return await getSongs();
  }

  @Query((_returns) => SongWithFile)
  async songById(@Arg('id') id: string, @Info() info: any) {
    //check if file field is selected
    const requestedFields = getRequestedFields(info);

    return await getSongWithFileBufferById(
      id,
      requestedFields.includes('file'),
    );
  }
}
