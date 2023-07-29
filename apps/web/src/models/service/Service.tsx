import { DateTime } from 'luxon'
import { ServiceSong } from '../song/ServiceSong'
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
  title: string
  theme: string
  readings: string
  preacher: string
  hasCommunion: boolean
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: ServiceSong[]
  note: string
}

export const getFormattedLocalString = (dateTime: DateTime, dateFormat: string = 'MMM dd yyyy, HH:mm a') => {
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

export const yearMonthConverter = (serviceDetails: Omit<Service, 'id'>) => {
  return { ...serviceDetails, year: serviceDetails.dateTime.year, month: serviceDetails.dateTime.month }
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
  title: string
  theme: string
  readings: string
  preacher: string
  hasCommunion: boolean
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
  year: DateTime.now().year,
  month: DateTime.now().month,
  dateTime: DateTime.now(),
  title: '',
  theme: '',
  readings: '',
  preacher: '',
  hasCommunion: false,
  lead: undefined,
  assignments: {},
  songs: [],
  note: '',
}
