import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { songQueryKey, songsQueryKey, songsReference } from '../constants/QueryKeys'
import { Song } from '../models/song/Song'
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
      console.log('update song', details)
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([songsQueryKey])
      queryClient.invalidateQueries([songQueryKey])
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
