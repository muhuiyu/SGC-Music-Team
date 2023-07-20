import { DateTime } from 'luxon'
import User, { UserRole } from '../user/User'
import { ServiceSong } from '../song/ServiceSong'

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

export const hourMinuteToString = (hourMinute: HourMinute): string => {
  const time = DateTime.fromObject({ hour: hourMinute.hour, minute: hourMinute.minute })
  return time.toFormat('HH:mm a')
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
  songs: ServiceSong[]
  note: string
}

export const getFormattedLocalString = (
  dateTime: DateTime,
  dateFormat: string = 'MMM dd yyyy, HH:mm a',
) => {
  return dateTime.toFormat(dateFormat)
}

export const getFormattedLocalTimeString = (dateTime: DateTime, dateFormat: string = 'HH:mm a') => {
  return dateTime.toFormat(dateFormat)
}

export const serviceComparator = (a: Service, b: Service) => {
  return a.dateTime < b.dateTime
}

export const isUserOnDuty = (service: Service, userId: User['id']) => {
  if (service.lead === userId) {
    return true
  }
  if (userId in service.assignments) {
    return true
  }
  return false
}

export interface ServiceYearMonths {
  year: number
  startMonth: number
  endMonth: number
}

export interface SupabaseService {
  id: string
  year: number
  month: number
  timestamp: string
  topic: string
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: ServiceSong[]
  note: string
}

export function convertToSupabaseService(service: Service): SupabaseService {
  const { dateTime, ...restOfService } = service
  return {
    ...restOfService,
    timestamp: dateTime.toISO() ?? new Date().toISOString(),
  }
}

export function serviceFromSupabase(data: SupabaseService): Service {
  return {
    ...data,
    dateTime: DateTime.fromISO(data.timestamp),
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
  note: '',
}
