import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { songsQueryKey, songsReference } from '../constants/QueryKeys'
import { Song } from '../models/song/Song'
import { supabase } from './SupabaseProvider'

const hookName = 'useAddSong'

export default function useAddSong() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ details }: { details: Omit<Song, 'id'> }) => {
      const { error } = await supabase.from(songsReference).insert({ ...details, id: uuidv4() })
      if (error) {
        console.log(`Error: ${hookName} addSong `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([songsQueryKey])
    },
  })

  const addSong = useCallback(
    (details: Omit<Song, 'id'>) => {
      mutation.mutate({ details })
    },
    [mutation],
  )

  return {
    addSong,
  }
}
