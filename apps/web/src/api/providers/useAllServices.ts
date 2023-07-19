import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import { supabase } from './SupabaseProvider'
import { serviceFromSupabase } from '../../models/service/Service'

const hookName = 'useAllServices'

// todo: add service time
export default function useAllServices() {
  const { data: services, isFetching } = useQuery({
    queryKey: [servicesQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(servicesReference).select()
      if (error) {
        console.log(`Error: ${hookName} fetchServices `, error)
      }
      if (data === null || _.isEmpty(data)) return []
      const services = data.map((entry) => serviceFromSupabase(entry))
      return _.sortBy(services, (a) => a.dateTime)
    },
  })

  return {
    isFetching,
    services: services ?? [],
  }
}
