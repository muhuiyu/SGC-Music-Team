import { useQuery } from '@tanstack/react-query'
import { Song } from '../../models/song/Song'
import { songsQueryKey, songsReference } from '../constants/QueryKeys'
import _, { keyBy } from 'lodash'
import { supabase } from './SupabaseProvider'

export interface SongFilter {
  order: 'id' | 'version' | 'name' | 'key' | 'tempo'
}

export const defaultLimitPerPage = 10

const hookName = 'useAllSongs'

export default function useAllSongs(filter: SongFilter) {
  const { data: songs, isFetching } = useQuery({
    queryKey: [songsQueryKey, filter.order],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(songsReference)
        .select()
        .order(filter.order, { ascending: false })

      if (error) {
        console.log(`Error: ${hookName} fetchServices `, error)
      }
      if (data === null || _.isEmpty(data)) return []

      return data.map((entry) => entry as Song)
    },
  })

  const generateSongDictionary = (): { [id: Song['id']]: Song } => {
    return keyBy(songs, 'id')
  }

  return {
    songs: songs ?? [],
    isLoading: isFetching,
    generateSongDictionary,
  }
}
