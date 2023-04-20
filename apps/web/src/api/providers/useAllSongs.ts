import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { songsQueryKey, songsReference } from '../constants/FirebaseKeys'
import { db, songFromSnapshot } from './FirebaseProvider'

export default function useAllSongs() {
  const { data: songs, isFetching } = useQuery({
    queryKey: [songsQueryKey],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, songsReference))
      return querySnapshot.docs.map(songFromSnapshot)
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ songId, details }: { songId: Song['id']; details: Partial<Song> }) => {
      return updateDoc(doc(db, songsReference, songId), details)
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
    songs: songs ?? [],
    isLoading: isFetching,
    updateSong,
  }
}
