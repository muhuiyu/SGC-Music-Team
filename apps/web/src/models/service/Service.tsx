import { DateTime } from 'luxon'
import { Song } from '../song/Song'
import User, { UserRole } from '../user/User'

export const morningServiceTime: HourMinute = {
  hour: 10,
  minute: 15,
}

export const eveningServiceTime: HourMinute = {
  hour: 17,
  minute: 30,
}

export interface HourMinute {
  hour: number
  minute: number
}

// service id = date & time
export default interface Service {
  id: string
  year: number
  month: number
  dateTime: DateTime
  topic: string
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: Song['id'][]
  songNotes: { [songId: Song['id']]: string }
  note: string
}

export const getFormattedLocalString = (
  dateTime: DateTime,
  dateFormat: string = 'MMM dd yyyy, HH:mm',
) => {
  return dateTime.toFormat(dateFormat)
}

export const serviceComparator = (a: Service, b: Service) => {
  return a.dateTime < b.dateTime
}
