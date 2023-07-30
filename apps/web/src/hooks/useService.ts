import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { serviceQueryKey, servicesReference } from '../constants/QueryKeys'
import Service, { SupabaseService, serviceFromSupabase } from '../models/service/Service'
import { supabase } from './SupabaseProvider'

const hookName = 'useService'

export default function useService(serviceId: Service['id']) {
  const { data: service, isFetching } = useQuery({
    queryKey: [serviceQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(servicesReference).select().eq('id', serviceId)
      if (error) {
        console.log(`Error: ${hookName} fetchService `, error)
      }
      if (data === null || _.isEmpty(data)) return null
      const supabaseService = data[0] as SupabaseService
      return serviceFromSupabase(supabaseService)
    },
  })

  return {
    service,
    isFetching,
  }
}
