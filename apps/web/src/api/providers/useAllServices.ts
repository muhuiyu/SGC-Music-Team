import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Timestamp,
  addDoc,
  and,
  collection,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import Service, {
  FirebaseService,
  HourMinute,
  serviceFromSnapshot,
} from '../../models/service/Service'
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

  // update
  const mutation = useMutation({
    mutationFn: ({
      serviceId,
      details,
    }: {
      serviceId: Service['id']
      details: Partial<Service>
    }) => {
      return updateDoc(doc(db, servicesReference, serviceId), details)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([servicesQueryKey])
    },
  })

  const updateService = useCallback(
    (serviceId: Service['id'], details: Partial<Service>) => {
      mutation.mutate({ serviceId, details })
    },
    [mutation],
  )

  // add service
  const addMutation = useMutation({
    mutationFn: async ({ details }: { details: Omit<Service, 'id'> }) => {
      return await addDoc(collection(db, servicesReference), details)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([servicesQueryKey])
    },
  })

  const addService = useCallback(
    (details: Service) => {
      addMutation.mutate({ details })
    },
    [addMutation],
  )

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
    updateService,
    addService,
    populateDefaultServices,
    allSundays,
    allServiceDates,
  }
}
