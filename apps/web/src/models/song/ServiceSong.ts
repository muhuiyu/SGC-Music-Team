import { Song } from './Song'
import { SongOccasion } from './SongOccasion'

export interface ServiceSong {
  songId: Song['id']
  occasion: SongOccasion
  note: string
}
