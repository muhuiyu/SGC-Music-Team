import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import User from '../../models/user/User'
import { usersQueryKey, usersReference } from '../constants/FirebaseKeys'
import { db, userFromSnapshot } from './FirebaseProvider'

export default function useAllUsers() {
  const { data: users, isFetching } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: async () => {
      const nextQuery = query(collection(db, usersReference), orderBy('name'))
      const querySnapshot = await getDocs(nextQuery)
      return querySnapshot.docs.map(userFromSnapshot)
    },
  })

  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: ({ user }: { user: User }) => {
      return setDoc(doc(db, usersReference, user.id), user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
    },
  })

  const addUser = useCallback(
    (user: User) => {
      addMutation.mutate({ user })
    },
    [addMutation],
  )

  const updateMutation = useMutation({
    mutationFn: ({ userId, details }: { userId: User['id']; details: Partial<User> }) => {
      return updateDoc(doc(db, usersReference, userId), details)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
    },
  })

  const updateUser = useCallback(
    (userId: User['id'], details: Partial<User>) => {
      updateMutation.mutate({ userId, details })
    },
    [updateMutation],
  )

  return {
    users: users ?? [],
    isLoading: isFetching,
    addUser,
    updateUser,
  }
}
