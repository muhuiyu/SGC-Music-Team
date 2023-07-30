import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { userQueryKey, usersQueryKey, usersReference } from '../constants/QueryKeys'
import User from '../models/user/User'
import { supabase } from './SupabaseProvider'

const hookName = 'useUpdateUser'

export default function useUpdateUser() {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: async ({ userId, details }: { userId: User['id']; details: Partial<User> }) => {
      const { error } = await supabase.from(usersReference).update(details).eq('id', userId)
      if (error) {
        console.log(`Error: ${hookName} updateUser `, error)
      }
      return
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
      queryClient.invalidateQueries([userQueryKey])
    },
  })

  const updateUser = useCallback(
    (userId: User['id'], details: Partial<User>) => {
      updateMutation.mutate({ userId, details })
    },
    [updateMutation],
  )

  return {
    updateUser,
  }
}
