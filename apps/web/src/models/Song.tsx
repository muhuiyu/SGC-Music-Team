const allKeys: Song['key'][] = ['a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab']

interface Song {
  id: string
  name: string
  author: string
  key: 'a' | 'bb' | 'b' | 'c' | 'db' | 'd' | 'eb' | 'e' | 'f' | 'gb' | 'g' | 'ab'
  tempo: number
  songLinkURL: string
  sheetLinkURL: string
}
