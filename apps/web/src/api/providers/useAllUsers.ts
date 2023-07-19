import { useQuery } from '@tanstack/react-query'
import User from '../../models/user/User'
import { usersQueryKey, usersReference } from '../constants/QueryKeys'
import _, { keyBy } from 'lodash'
import { supabase } from './SupabaseProvider'

const hookName = 'useAllUsers'

export default function useAllUsers() {
  const { data: users, isFetching } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(usersReference)
        .select()
        .order('lastName', { ascending: false })

      if (error) {
        console.log(`Error: ${hookName} fetchUsers `, error)
      }
      if (data === null || _.isEmpty(data)) return []

      return data.map((entry) => entry as User)
    },
  })

  const generateUserDictionary = (): { [id: User['id']]: User } => {
    return keyBy(users, 'id')
  }

  return {
    users: users ?? [],
    generateUserDictionary,
    isLoading: isFetching,
  }
}
