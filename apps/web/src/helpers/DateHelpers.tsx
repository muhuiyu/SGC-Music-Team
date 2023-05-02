import { DateTime } from 'luxon'

export function getMonthName(monthIndex: number, shouldReturnLongName: boolean = true) {
  const monthObject = DateTime.local().set({ month: monthIndex })
  return shouldReturnLongName ? monthObject.monthLong : monthObject.monthShort
}
