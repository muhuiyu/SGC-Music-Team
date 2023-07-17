import { useQuery } from '@tanstack/react-query'
import { userQueryKey, usersReference } from '../constants/FirebaseKeys'
import { doc, getDoc } from 'firebase/firestore'
import { db, userFromSnapshot } from './FirebaseProvider'
import User from '../../models/user/User'

export default function useUser(userId: User['id']) {
  const { data: user, isFetching } = useQuery({
    queryKey: [userQueryKey],
    queryFn: async () => {
      const userDocRef = doc(db, usersReference, userId)
      const querySnapshot = await getDoc(userDocRef)
      const user = userFromSnapshot(querySnapshot)
      return user
    },
  })

  return {
    user,
    isFetching,
  }
}
