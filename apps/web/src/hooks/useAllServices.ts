import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { servicesQueryKey, servicesReference } from '../constants/QueryKeys'
import Service, { serviceFromSupabase } from '../models/service/Service'
import { Song } from '../models/song/Song'
import { supabase } from './SupabaseProvider'

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

  function getLastServiceWithSong(songId: Song['id']): Service | null {
    if (!services) return null
    const servicesWithSong = services.filter((service) => service.songs.some((song) => song.songId === songId))
    const sortedServices = _.sortBy(servicesWithSong, (a) => a.dateTime)
    if (_.isEmpty(servicesWithSong)) {
      return null
    } else {
      return sortedServices[0]
    }
  }

  return {
    isFetching,
    services: services ?? [],
    getLastServiceWithSong,
  }
}
