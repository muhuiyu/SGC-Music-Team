import { useQuery } from '@tanstack/react-query'
import { songQueryKey, songsReference } from '../constants/QueryKeys'
import { Song } from '../../models/song/Song'
import { supabase } from './SupabaseProvider'
import _ from 'lodash'

const hookName = 'useSong'

export default function useSong(songId: Song['id']) {
  const { data: song, isFetching } = useQuery({
    queryKey: [songQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(songsReference).select().eq('id', songId)
      if (error) {
        console.log(`Error: ${hookName} fetchSong `, error)
      }
      if (data === null || _.isEmpty(data)) return null
      return data[0] as Song
    },
  })

  return {
    song,
    isFetching,
  }
}
