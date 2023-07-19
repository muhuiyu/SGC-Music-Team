import { useMutation, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useCallback } from 'react'
import Service from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { supabase } from './SupabaseProvider'

const hookName = 'useUpdateService'

export default function useUpdateService() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({
      serviceId,
      details,
    }: {
      serviceId: Service['id']
      details: Partial<Service>
    }) => {
      const { error } = await supabase.from(servicesReference).update(details).eq('id', serviceId)
      if (error) {
        console.log(`Error: ${hookName} updateService `, error)
      }
      return
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

  return {
    updateService,
  }
}
