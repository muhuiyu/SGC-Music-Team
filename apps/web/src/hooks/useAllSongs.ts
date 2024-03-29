import { useQuery } from '@tanstack/react-query'
import _, { keyBy } from 'lodash'
import { songsQueryKey, songsReference } from '../constants/QueryKeys'
import { Song } from '../models/song/Song'
import { supabase } from './SupabaseProvider'

export interface SongFilter {
  order: 'id' | 'version' | 'name'
}

export const defaultLimitPerPage = 10

const hookName = 'useAllSongs'

// todo: add pagination
export default function useAllSongs(filter: SongFilter) {
  const { data: songs, isFetching } = useQuery({
    queryKey: [songsQueryKey, filter.order],
    queryFn: async () => {
      const { data, error } = await supabase.from(songsReference).select().order(filter.order, { ascending: true })

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
