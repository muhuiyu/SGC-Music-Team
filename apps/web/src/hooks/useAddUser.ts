import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { usersQueryKey, usersReference } from '../constants/QueryKeys'
import User from '../models/user/User'
import { supabase } from './SupabaseProvider'

const hookName = 'useAddUser'

export default function useAllUsers() {
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: async ({ user }: { user: User }) => {
      const { error } = await supabase.from(usersReference).insert(user)
      if (error) {
        console.log(`Error: ${hookName} addUser `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
      // queryClient.invalidateQueries(['userProfile', user.id])
    },
  })

  const addUser = useCallback(
    async (user: User) => {
      return addMutation.mutateAsync({ user })
    },
    [addMutation],
  )

  return {
    addUser,
  }
}
