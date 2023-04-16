import { DateTime } from 'luxon'
import User, { UserRole } from './User'

export default interface Service {
  id: string
  dateTime: DateTime
  topic: string
  songs: Song[]
  duty: { [userId: User['id']]: UserRole }
  note: string
  songNotes: { [songId: Song['id']]: string }
}
