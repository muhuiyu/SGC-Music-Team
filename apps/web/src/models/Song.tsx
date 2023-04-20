export type Key = 'A' | 'Bb' | 'B' | 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab'
const allKeys: Key[] = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

export const keyInfo: Record<Key, { name: string }> = {
  A: {
    name: 'A',
  },
  Bb: {
    name: 'Bb',
  },
  B: {
    name: 'B',
  },
  C: {
    name: 'C',
  },
  Db: {
    name: 'Db',
  },
  D: {
    name: 'D',
  },
  Eb: {
    name: 'Eb',
  },
  E: {
    name: 'E',
  },
  F: {
    name: 'F',
  },
  Gb: {
    name: 'Gb',
  },
  G: {
    name: 'G',
  },
  Ab: {
    name: 'Ab',
  },
}

export interface Song {
  id: string
  name: string
  author: string
  key: Key
  tempo: number
  songUrlString: string
  sheetUrlString: string
}
