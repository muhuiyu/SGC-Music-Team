import { DateTime } from 'luxon'
import User from '../user/User'

export type AvailabilityState = 'yes' | 'no' | 'unknown'

export interface Availability {
  id: string
  userId: User['id']
  dateTime: DateTime
  availabilityState: AvailabilityState
  note: string
}

export interface SupabaseAvailability {
  id: string
  userId: User['id']
  timestamp: string
  availabilityState: AvailabilityState
  note: string
}

export function getDateTimeKey(dateTime: DateTime): string {
  return dateTime.toISO()?.replace(/[^\d]+/g, '') ?? ''
}

export function availabilityFromSupabase(data: SupabaseAvailability): Availability {
  return {
    ...data,
    dateTime: DateTime.fromISO(data.timestamp),
  }
}

export function convertToSupabaseAvailability(availability: Availability): SupabaseAvailability {
  const { dateTime, ...restOfAvailability } = availability
  return {
    ...restOfAvailability,
    timestamp: dateTime.toISO() ?? new Date().toISOString(),
  }
}
