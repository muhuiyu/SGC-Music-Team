export type SongOccasion =
  | 'worship'
  | 'kids'
  | 'response'
  | 'communion'
  | 'closing'
  | 'after'
  | 'others'

export const songOccasionInfo: Record<SongOccasion, { name: string; order: number }> = {
  worship: {
    name: 'Worship',
    order: 1,
  },
  kids: {
    name: 'Kids song',
    order: 2,
  },
  response: {
    name: 'Response',
    order: 3,
  },
  communion: {
    name: 'Communion',
    order: 4,
  },
  closing: {
    name: 'Closing',
    order: 5,
  },
  after: {
    name: 'After service',
    order: 6,
  },
  others: {
    name: 'Others',
    order: 7,
  },
}
