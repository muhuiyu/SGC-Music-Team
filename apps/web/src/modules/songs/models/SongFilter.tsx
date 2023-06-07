import { Key } from '../../../models/song/Key'
import { SongTag } from '../../../models/song/SongTag'

interface SongFilter {
  keys: Key[]
  tags: SongTag[]
}
