import { File } from 'megajs';
import { ORM } from '../ORM';
import { Song } from './songs.entity';

const SongsRepo = ORM.getRepository(Song);

export const getSongWithFileBufferById = async (
  id: string,
  withFile?: boolean,
) => {
  const song = await SongsRepo.findOne({ where: { id } });

  if (!withFile) return song;

  const file = File.fromURL(song?.url ?? '');
  const audioBuffer = (await file.downloadBuffer({})).toString('base64');

  return { file: audioBuffer, ...song };
};

export const getSongs = async () => {
  return SongsRepo.find();
};
