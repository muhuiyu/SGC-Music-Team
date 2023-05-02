import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'
import { DateTime } from 'luxon'

export type AvailabilityState = 'yes' | 'no' | 'unknown'

export interface Availability {
  dateTime: DateTime
  availabilityState: AvailabilityState
}

export interface FirebaseAvailability {
  timestamp: Timestamp
  availabilityState: AvailabilityState
}

export function getDateTimeKey(dateTime: DateTime): string {
  return dateTime.toISO()?.replace(/[^\d]+/g, '') ?? ''
}

export function convertFromFirebaseAvailability(availability: FirebaseAvailability): Availability {
  const { timestamp, ...restOfAvailability } = availability
  return {
    ...restOfAvailability,
    dateTime: DateTime.fromJSDate(availability.timestamp.toDate()),
  }
}

export function convertToFirebaseAvailability(availability: Availability): FirebaseAvailability {
  const { dateTime, ...restOfAvailability } = availability
  return {
    ...restOfAvailability,
    timestamp: Timestamp.fromDate(dateTime.toJSDate()),
  }
}

export function availabilityFromSnapshot(snapshot: DocumentSnapshot<DocumentData>): Availability {
  const { ...docData } = snapshot.data() as FirebaseAvailability
  return convertFromFirebaseAvailability(docData)
}
