import { useMutation, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useCallback } from 'react'
import Service, { yearMonthConverter } from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from './SupabaseProvider'

const hookName = 'useAddService'

export default function useAddService() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ details }: { details: Omit<Service, 'id'> }) => {
      // year and month check
      let supabaseService: any = yearMonthConverter(details)

      const { dateTime, ...restOfService } = details
      if (dateTime !== undefined) {
        supabaseService = {
          ...restOfService,
          timestamp: dateTime.toISO() ?? new Date().toISOString(),
        }
      }

      console.log('supabaseService', supabaseService)
      const { error } = await supabase.from(servicesReference).insert({ ...supabaseService, id: uuidv4() })
      if (error) {
        console.log(`Error: ${hookName} addService `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([servicesQueryKey])
    },
  })

  const addService = useCallback(
    (details: Omit<Service, 'id'>) => {
      mutation.mutate({ details })
    },
    [mutation],
  )
  return {
    addService,
  }
}
