import { useQuery } from '@tanstack/react-query'
import { currentUserQueryKey } from '../constants/FirebaseKeys'
import { auth, getUserProfile } from './FirebaseProvider'

export default function useCurrentUser() {
  const { data: currentUser, isFetching } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: async () => {
      const userId = auth.currentUser?.uid
      return await getUserProfile(userId ?? '')
    },
  })

  return {
    currentUser,
    isFetching,
  }
}
