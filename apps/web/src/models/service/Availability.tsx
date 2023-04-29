import { DateTime } from 'luxon'

export interface Availability {
  dateTime: DateTime
  isAvailable: boolean
}
