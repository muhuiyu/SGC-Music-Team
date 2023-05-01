import { Timestamp } from 'firebase/firestore'
import { DateTime } from 'luxon'

export type AvailabilityState = 'yes' | 'no' | 'unknown'

export interface Availability {
  dateTime: DateTime
  isAvailable: AvailabilityState
}

export interface FirebaseAvailability {
  timestamp: Timestamp
  isAvailable: AvailabilityState
}

export function getAvailabilityKey(dateTime: DateTime): string {
  return dateTime.toISO()?.replace(/[^\d]+/g, '') ?? ''
}

export function convertFromFirebaseAvailability(availability: FirebaseAvailability): Availability {
  return {
    ...availability,
    dateTime: DateTime.fromJSDate(availability.timestamp.toDate()),
  }
}

export function convertToFirebaseAvailability(availability: Availability): FirebaseAvailability {
  return {
    ...availability,
    timestamp: Timestamp.fromDate(availability.dateTime.toJSDate()),
  }
}
