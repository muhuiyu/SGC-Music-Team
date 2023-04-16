const allKeys: Song['key'][] = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

interface Song {
  id: string
  name: string
  author: string
  key: 'A' | 'Bb' | 'B' | 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab'
  tempo: number
  songUrlString: string
  sheetUrlString: string
}
