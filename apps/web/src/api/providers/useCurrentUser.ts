import { useQuery } from '@tanstack/react-query'
import { currentUserQueryKey } from '../constants/QueryKeys'
import { getUserProfile } from './SupabaseProvider'
import useAuth from './useAuth'

export default function useCurrentUser() {
  const { user, signOut } = useAuth()

  const { data: currentUser, isFetching } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: async () => {
      if (!user) {
        console.log('get current supabase session as null')
        return null
      }
      console.log('get current supabase session successfully', user)
      const userId = user.id
      return await getUserProfile(userId)
    },
    onSuccess: (user) => {
      if (!user) {
        signOut()
      }
    },
  })

  return {
    currentUser,
    isFetching,
  }
}
