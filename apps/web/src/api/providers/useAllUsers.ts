import { useQuery } from '@tanstack/react-query'

import { collection, getDocs } from 'firebase/firestore'
import { db, userFromSnapshot } from './FirebaseProvider'

// Reference names
const usersReference = 'users'

export default function useAllUsers() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, usersReference))
      return querySnapshot.docs.map(userFromSnapshot)
    },
  })
  return users ?? []
}
