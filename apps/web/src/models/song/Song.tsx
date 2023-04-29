import { Key } from './Key'
import { SongTag } from './SongTag'

export interface Song {
  id: string
  name: string
  version: string
  key: Key
  tempo?: number
  songUrlString: string
  sheetUrlString: string
  tags: SongTag[]
}
