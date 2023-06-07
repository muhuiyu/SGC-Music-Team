export type SongTag = 'kidSong' | 'carols' | 'easter' | 'christmas' | 'hymn'

export const allSongTags: SongTag[] = ['kidSong', 'carols', 'easter', 'christmas', 'hymn']

export const songTagInfo: Record<SongTag, { name: string; code: string }> = {
  kidSong: {
    name: 'Kid song',
    code: 'kidSong',
  },
  carols: {
    name: 'Carols',
    code: 'carols',
  },
  easter: {
    name: 'Easter',
    code: 'easter',
  },
  christmas: {
    name: 'Christmas',
    code: 'christmas',
  },
  hymn: {
    name: 'Hymn',
    code: 'hymn',
  },
}
