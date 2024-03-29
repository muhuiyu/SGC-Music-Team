import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { userQueryKey, usersReference } from '../constants/QueryKeys'
import User from '../models/user/User'
import { supabase } from './SupabaseProvider'

const hookName = 'useUser'

export default function useUser(userId: User['id']) {
  const { data: user, isFetching } = useQuery({
    queryKey: [userQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(usersReference).select().eq('id', userId)
      if (error) {
        console.log(`Error: ${hookName} fetchUser `, error)
        throw error
      }
      if (data === null || _.isEmpty(data)) {
        throw new Error('User data not found')
      }
      return data[0] as User
    },
  })

  // ...return loading state
  if (isFetching || user === null) {
    return {
      user: null,
      isFetching,
    }
  }

  return {
    user,
    isFetching,
  }
}
