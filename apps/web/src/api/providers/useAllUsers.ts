import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import User from '../../models/User'
import { usersQueryKey, usersReference } from '../constants/FirebaseKeys'
import { db, userFromSnapshot } from './FirebaseProvider'

export default function useAllUsers() {
  const { data: users, isFetching } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, usersReference))
      return querySnapshot.docs.map(userFromSnapshot)
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ userId, details }: { userId: User['id']; details: Partial<User> }) => {
      return updateDoc(doc(db, usersReference, userId), details)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
    },
  })
  

  const updateUser = useCallback(
    (userId: User['id'], details: Partial<User>) => {
      mutation.mutate({ userId, details })
    },
    [mutation],
  )

  return {
    users: users ?? [],
    isLoading: isFetching,
    updateUser,
  }
}
