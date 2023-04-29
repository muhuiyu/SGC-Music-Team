import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { Song } from '../../models/song/Song'
import { songsQueryKey, songsReference } from '../constants/FirebaseKeys'
import { db, songFromSnapshot } from './FirebaseProvider'

export interface SongFilter {
  order: 'id' | 'version' | 'name' | 'key' | 'tempo'
}

export const defaultLimitPerPage = 10

export default function useAllSongs(filter: SongFilter) {
  const { data: songs, isFetching } = useQuery({
    queryKey: [songsQueryKey, filter.order],
    queryFn: async () => {
      const nextQuery = query(collection(db, songsReference), orderBy(filter.order))
      const querySnapshot = await getDocs(nextQuery)
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
  const addMutation = useMutation({
    mutationFn: ({ details }: { details: Omit<Song, 'id'> }) => {
      return addDoc(collection(db, songsReference), details)
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

  const addSong = useCallback(
    (details: Omit<Song, 'id'>) => {
      addMutation.mutate({ details })
    },
    [addMutation],
  )

  return {
    songs: songs ?? [],
    isLoading: isFetching,
    addSong,
    updateSong,
  }
}
