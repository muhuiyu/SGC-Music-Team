import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Song } from '../../models/song/Song'
import { songsQueryKey, songsReference } from '../constants/QueryKeys'
import _ from 'lodash'
import { supabase } from './SupabaseProvider'

const hookName = 'useUpdateSong'

export default function useUpdateSong() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ songId, details }: { songId: Song['id']; details: Partial<Song> }) => {
      const { error } = await supabase.from(songsReference).update(details).eq('id', songId)
      if (error) {
        console.log(`Error: ${hookName} updateSong `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([songsQueryKey])
    },
  })

  const updateSong = useCallback(
    (songId: Song['id'], details: Partial<Song>) => {
      mutation.mutate({ songId, details })
    },
    [mutation],
  )

  return {
    updateSong,
  }
}
