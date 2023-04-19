import { useQuery } from '@tanstack/react-query'

import { collection, getDocs } from 'firebase/firestore'
import { db, songFromSnapshot } from './FirebaseProvider'

// Reference names
const songsReference = 'songs'

export default function useAllSongs() {
  const { data: songs } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, songsReference))
      return querySnapshot.docs.map(songFromSnapshot)
    },
  })
  return songs ?? []
}
