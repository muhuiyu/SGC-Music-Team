import { useMutation, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useCallback } from 'react'
import Service, { SupabaseService, convertToSupabaseService } from '../../models/service/Service'
import { serviceQueryKey, servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { supabase } from './SupabaseProvider'

const hookName = 'useUpdateService'

export default function useUpdateService() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ serviceId, details }: { serviceId: Service['id']; details: Partial<Service> }) => {
      let supabaseService: any = details

      const { dateTime, ...restOfService } = details
      if (dateTime !== undefined) {
        supabaseService = {
          ...restOfService,
          timestamp: dateTime.toISO() ?? new Date().toISOString(),
        }
      }

      console.log(supabaseService)

      const { error } = await supabase.from(servicesReference).update(supabaseService).eq('id', serviceId)
      if (error) {
        console.log(`Error: ${hookName} updateService `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([servicesQueryKey])
      queryClient.invalidateQueries([serviceQueryKey])
    },
  })

  const updateService = useCallback(
    (serviceId: Service['id'], details: Partial<Service>) => {
      mutation.mutate({ serviceId, details })
    },
    [mutation],
  )

  return {
    updateService,
  }
}
