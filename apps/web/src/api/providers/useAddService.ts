import { useMutation, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useCallback } from 'react'
import Service from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from './SupabaseProvider'

const hookName = 'useAddService'

export default function useUpdateService() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ details }: { details: Omit<Service, 'id'> }) => {
      const { error } = await supabase.from(servicesReference).insert({ ...details, id: uuidv4() })
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
    (details: Service) => {
      mutation.mutate({ details })
    },
    [mutation],
  )
  return {
    addService,
  }
}
