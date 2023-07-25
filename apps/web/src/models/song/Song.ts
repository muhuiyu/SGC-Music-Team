import { Chart } from './Chart'
import { SongTag } from './SongTag'

export interface Song {
  id: string
  name: string
  version: string
  charts: Chart[]
  lyrics: string
  songUrlString: string
  tags: SongTag[]
}

export const emptySong: Song = {
  id: '',
  name: '',
  version: '',
  charts: [{ key: 'C', type: 'leadSheet', url: '' }],
  lyrics: '',
  songUrlString: '',
  tags: [],
}
