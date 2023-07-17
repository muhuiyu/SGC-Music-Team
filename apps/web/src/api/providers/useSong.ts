import { useQuery } from '@tanstack/react-query'
import { songQueryKey, songsReference } from '../constants/FirebaseKeys'
import { doc, getDoc } from 'firebase/firestore'
import { db, songFromSnapshot } from './FirebaseProvider'
import { Song } from '../../models/song/Song'

export default function useSong(songId: Song['id']) {
  const { data: song, isFetching } = useQuery({
    queryKey: [songQueryKey],
    queryFn: async () => {
      const songDocRef = doc(db, songsReference, songId)
      const querySnapshot = await getDoc(songDocRef)
      const song = songFromSnapshot(querySnapshot)
      return song
    },
  })

  return {
    song,
    isFetching,
  }
}
