import { DateTime } from 'luxon'

export function getMonthName(monthIndex: number, shouldReturnLongName: boolean = true) {
  const monthObject = DateTime.local().set({ month: monthIndex })
  return shouldReturnLongName ? monthObject.monthLong : monthObject.monthShort
}

export const thisYear = new Date().getFullYear()
export const thisMonth = new Date().getMonth() + 1

export function getCurrentMonths(): [number, number] {
  return thisMonth % 2 ? [thisMonth, thisMonth + 1] : [thisMonth - 1, thisMonth]
}

export const getMonthString = (monthNumber: number) => {
  const dateTime = DateTime.local().set({ month: monthNumber })
  return dateTime.toLocaleString({ month: 'long' })
}
