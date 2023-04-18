import { DateTime } from 'luxon'
import UserModel, { UserRole } from './User'

export default interface Service {
  id: string
  dateTime: DateTime
  topic: string
  songs: Song[]
  duty: { [userId: UserModel['id']]: UserRole }
  note: string
  songNotes: { [songId: Song['id']]: string }
}
