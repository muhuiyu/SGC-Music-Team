import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { Song } from '../song/Song'
import User, { UserRole } from '../user/User'

// 10:15
export const morningServiceTime: HourMinute = {
  hour: 10,
  minute: 15,
}

// 17:30
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
  dateFormat: string = 'MMM dd yyyy, HH:mm a',
) => {
  return dateTime.toFormat(dateFormat)
}

export const serviceComparator = (a: Service, b: Service) => {
  return a.dateTime < b.dateTime
}

// service
export interface FirebaseService {
  year: number
  month: number
  timestamp: Timestamp
  topic: string
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: Song['id'][]
  songNotes: { [songId: Song['id']]: string }
  note: string
}

export function convertToFirebaseService(service: Service): FirebaseService {
  const { dateTime, ...restOfService } = service
  return {
    ...restOfService,
    timestamp: Timestamp.fromDate(dateTime.toJSDate()),
  }
}

export function serviceFromSnapshot(snapshot: DocumentSnapshot<DocumentData>): Service {
  const { ...docData } = snapshot.data() as FirebaseService
  return {
    ...docData,
    id: snapshot.id,
    dateTime: DateTime.fromJSDate(docData.timestamp.toDate()),
  }
}

export const emptyService: Service = {
  id: '',
  year: 0,
  month: 0,
  dateTime: DateTime.now(),
  topic: '',
  lead: undefined,
  assignments: {},
  songs: [],
  songNotes: {},
  note: '',
}
