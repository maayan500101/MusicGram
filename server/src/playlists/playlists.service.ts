import { ORM } from '@ORM';
import { Playlist } from './playlists.entity';

const PlaylistsRepo = ORM.getRepository(Playlist);

export const getPlaylists = async (findRelatedSongs: boolean) => {
  return PlaylistsRepo.find({ relations: { songs: !!findRelatedSongs } });
};

export const getPlaylistsByUser = async (
  findRelatedSongs: boolean,
  userId: string,
) => {
  return PlaylistsRepo.find({
    relations: { songs: !!findRelatedSongs },
    where: { users: { id: userId } },
  });
};

export const getPlaylistById = async (
  findRelatedSongs: boolean,
  id: string,
) => {
  return PlaylistsRepo.findOne({
    relations: { songs: !!findRelatedSongs },
    where: { id },
  });
};
