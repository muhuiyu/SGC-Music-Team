export type SongTag = 'kidSong' | 'carols' | 'easter' | 'christmas' | 'hymn'

export const allSongTags: SongTag[] = ['kidSong', 'carols', 'easter', 'christmas', 'hymn']

export const keyInfo: Record<SongTag, { name: string }> = {
  kidSong: {
    name: 'Kid song',
  },
  carols: {
    name: 'Carols',
  },
  easter: {
    name: 'Easter',
  },
  christmas: {
    name: 'Christmas',
  },
  hymn: {
    name: 'Hymn',
  },
}
