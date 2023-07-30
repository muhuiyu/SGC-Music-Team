import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import _ from 'lodash'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { availabilityQueryKey, availabilityReference } from '../constants/QueryKeys'
import { Availability, availabilityFromSupabase } from '../models/service/Availability'
import { supabase } from './SupabaseProvider'

const hookName = 'useAllAvailability'

export default function useAllAvailability(userId: string | null, serviceDates: DateTime[]) {
  const [minServiceDate, maxServiceDate] = useMemo(() => {
    let max: DateTime | undefined
    let min: DateTime | undefined
    for (const serviceDate of serviceDates) {
      if (!max || max < serviceDate) {
        max = serviceDate
      }
      if (!min || min > serviceDate) {
        min = serviceDate
      }
    }
    return [min, max]
  }, [serviceDates])

  const { data: availabilities, isFetching } = useQuery({
    queryKey: [availabilityQueryKey],
    queryFn: async () => {
      if (!userId || !minServiceDate || !maxServiceDate) {
        return []
      }

      // 1. Fetch all responses
      const { data, error } = await supabase
        .from(availabilityReference)
        .select()
        .eq('userId', userId)
        .gte('timestamp', minServiceDate)
        .lte('timestamp', maxServiceDate)

      if (error) {
        console.log(`Error: ${hookName} fetchAvailabilities `, error)
      }

      // 2. Map data to responses
      let currentResponses: Record<number, Availability> = {}
      if (data !== null && !_.isEmpty(data)) {
        currentResponses = _.keyBy(
          data.map((entry) => availabilityFromSupabase(entry)),
          (availability) => availability.dateTime.toMillis(),
        )
      }

      // 3. Add dates that haven't been responsed yet
      serviceDates.forEach((dateTime) => {
        const timestamp = dateTime.toMillis()
        let response = currentResponses[timestamp]
        if (!response) {
          currentResponses[timestamp] = {
            id: uuidv4(),
            userId: userId,
            availabilityState: 'unknown',
            dateTime: dateTime,
            note: '',
          }
        }
      })

      console.log('response', currentResponses)

      // 4. Convert the map back to array
      return _.sortBy(_.values(currentResponses), (a) => a.dateTime)
    },
    enabled: !_.isEmpty(userId) && !!maxServiceDate && !!minServiceDate,
  })

  return {
    availabilities: availabilities ?? [],
    isLoading: isFetching,
  }
}
