import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { currentUserQueryKey } from '../constants/QueryKeys'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { getUserProfile } from './SupabaseProvider'

export default function useCurrentUser() {
  const navigate = useNavigate()
  const { user, signout } = useContext(AuthContext)

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
        signout(() => {})
      }
    },
  })

  return {
    currentUser,
    isFetching,
  }
}
