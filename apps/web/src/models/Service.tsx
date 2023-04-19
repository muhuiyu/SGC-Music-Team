import { DateTime } from 'luxon'
import User, { UserRole } from './User'

export default interface Service {
  id: string
  dateTime: DateTime
  topic: string
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: Song[]
  songNotes: { [songId: Song['id']]: string }
  note: string
}
