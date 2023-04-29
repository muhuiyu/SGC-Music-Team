import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { useCallback } from 'react'

import { Availability } from '../../models/service/Availability'
import User from '../../models/user/User'
import { availabilityQueryKey, usersQueryKey, usersReference } from '../constants/FirebaseKeys'
import { availabilityFromSnapshot, db } from './FirebaseProvider'

export default function useAllAvailability(userId: string) {
  const { data: availabilities, isFetching } = useQuery({
    queryKey: [availabilityQueryKey],
    queryFn: async () => {
      const snapshot = await getDoc(doc(db, usersReference, userId))
      if (!snapshot.exists()) return null
      const querySnapshot = await getDocs(collection(db, snapshot.ref.path))
      return querySnapshot.docs.map(availabilityFromSnapshot)
    },
  })

  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: async ({
      userId,
      availabilities,
    }: {
      userId: User['id']
      availabilities: Availability[]
    }) => {
      const snapshot = await getDoc(doc(db, usersReference, userId))
      if (!snapshot.exists()) return null
      const promises = availabilities.map(async (availability) => {
        setDoc(doc(db, snapshot.ref.path, availability.dateTime.toISO() ?? ''), availability)
      })
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
    },
  })

  const addAvailability = useCallback(
    (userId: User['id'], availabilities: Availability[]) => {
      addMutation.mutate({ userId, availabilities })
    },
    [addMutation],
  )

  const updateMutation = useMutation({
    mutationFn: async ({
      userId,
      availabilities,
    }: {
      userId: User['id']
      availabilities: Availability[]
    }) => {
      const snapshot = await getDoc(doc(db, usersReference, userId))
      if (!snapshot.exists()) return null
      const promises = availabilities.map(async (availability) => {
        const data = {
          dateTime: availability.dateTime.toISO() ?? '',
          isAvailable: availability.isAvailable,
        }
        updateDoc(doc(db, snapshot.ref.path, availability.dateTime.toISO() ?? ''), data)
      })
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([usersQueryKey])
    },
  })

  const updateAvailability = useCallback(
    (userId: User['id'], availabilities: Availability[]) => {
      updateMutation.mutate({ userId, availabilities })
    },
    [updateMutation],
  )

  return {
    availabilities: availabilities ?? [],
    isLoading: isFetching,
    updateAvailability,
  }
}
