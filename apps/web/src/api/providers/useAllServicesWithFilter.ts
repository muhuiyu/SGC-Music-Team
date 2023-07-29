import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { HourMinute, SupabaseService, serviceFromSupabase } from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { supabase } from './SupabaseProvider'

const hookName = 'useAllServicesWithFilter'
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
export default function useAllServicesWithFilter(filter: ServiceYearMonths, serviceTime: HourMinute) {
  const { data: services, isFetching } = useQuery({
    queryKey: [servicesQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(servicesReference)
        .select()
        .eq('year', filter.year)
        .or(`month.eq.${filter.startMonth},month.eq.${filter.endMonth}`)

      if (error) {
        console.log(`Error: ${hookName} fetchServices `, error)
      }
      if (data === null || _.isEmpty(data)) return []
      const services = data.map((entry) => serviceFromSupabase(entry))
      return _.sortBy(services, (a) => a.dateTime)
    },
  })

  const queryClient = useQueryClient()

  // populate default services
  const populateDefaultServicesMutation = useMutation({
    mutationFn: async () => {
      const promises = allSundays.map(async (sunday) => {
        const newService: SupabaseService = {
          id: uuidv4(),
          year: sunday.year,
          month: sunday.month,
          timestamp: sunday.toISO() ?? new Date().toISOString(),
          title: '',
          theme: '',
          readings: '',
          preacher: '',
          hasCommunion: false,
          lead: '',
          assignments: {},
          songs: [],
          note: '',
        }
        const { error } = await supabase.from(servicesReference).insert(newService)
        if (error) {
          console.log(`Error: ${hookName} populateDefaultServices `, error)
        }
        return
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
