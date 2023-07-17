import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Timestamp, addDoc, and, collection, getDocs, or, query, where } from 'firebase/firestore'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { FirebaseService, HourMinute, serviceFromSnapshot } from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/FirebaseKeys'
import { db } from './FirebaseProvider'

export interface ServiceYearMonths {
  year: number
  startMonth: number
  endMonth: number
}

export function getCurrentServiceYearMonths(): ServiceYearMonths {
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  return {
    year: today.getFullYear(),
    startMonth: currentMonth % 2 ? currentMonth : currentMonth - 1,
    endMonth: currentMonth % 2 ? currentMonth + 1 : currentMonth,
  }
}

// todo: add service time
export default function useAllServices(filter: ServiceYearMonths, serviceTime: HourMinute) {
  const { data: services, isFetching } = useQuery({
    queryKey: [servicesQueryKey, filter.year, filter.startMonth, filter.endMonth],
    queryFn: async () => {
      const nextQuery = query(
        collection(db, servicesReference),
        and(
          where('year', '==', filter.year),
          or(where('month', '==', filter.startMonth), where('month', '==', filter.endMonth)),
        ),
      )
      const querySnapshot = await getDocs(nextQuery)
      const services = querySnapshot.docs.map(serviceFromSnapshot)
      return _.sortBy(services, (a) => a.dateTime)
    },
  })

  const queryClient = useQueryClient()

  // populate default services
  const populateDefaultServicesMutation = useMutation({
    mutationFn: async () => {
      const promises = allSundays.map(async (sunday) => {
        const newService: FirebaseService = {
          year: sunday.year,
          month: sunday.month,
          timestamp: Timestamp.fromDate(sunday.toJSDate()),
          topic: '',
          lead: '',
          assignments: {},
          songs: [],
          songNotes: {},
          note: '',
        }
        return addDoc(collection(db, servicesReference), newService)
      })
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([servicesQueryKey])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const populateDefaultServices = useCallback(() => {
    populateDefaultServicesMutation.mutate()
  }, [populateDefaultServicesMutation])

  const allServiceDates = services?.map((service) => service.dateTime) ?? []

  const allSundays = useMemo(() => {
    let firstSunday = DateTime.fromObject({
      year: filter.year,
      month: filter.startMonth,
      day: 1,
      hour: serviceTime.hour,
      minute: serviceTime.minute,
    })
    while (firstSunday.weekday !== 7) {
      firstSunday = firstSunday.plus({ day: 1 })
    }
    const allSundays: DateTime[] = []
    while (firstSunday.month <= filter.endMonth) {
      allSundays.push(firstSunday)
      firstSunday = firstSunday.plus({ week: 1 })
    }
    return allSundays
  }, [filter.year, filter.startMonth, filter.endMonth, serviceTime])

  return {
    isFetching,
    services: services ?? [],
    isLoading: isFetching,
    populateDefaultServices,
    allSundays,
    allServiceDates,
  }
}
