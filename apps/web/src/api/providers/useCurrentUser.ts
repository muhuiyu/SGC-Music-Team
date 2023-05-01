import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { currentUserQueryKey } from '../constants/FirebaseKeys'
import { auth, getUserProfile } from './FirebaseProvider'

export default function useCurrentUser() {
  const navigate = useNavigate()
  const { data: currentUser, isFetching } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: async () => {
      const userId = auth.currentUser?.uid
      if (!userId) {
        return null
      }
      return await getUserProfile(userId)
    },
    onSuccess: (user) => {
      if (user === null) {
        auth.signOut()
        navigate(pageInfo.login.href)
      }
    },
  })

  return {
    currentUser,
    isFetching,
  }
}
