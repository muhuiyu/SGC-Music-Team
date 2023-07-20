import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Timestamp,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useCallback, useMemo } from 'react'

import _ from 'lodash'
import { DateTime } from 'luxon'
import {
  Availability,
  availabilityFromSnapshot,
  convertToFirebaseAvailability,
  getDateTimeKey,
} from '../../models/service/Availability'
import { availabilityQueryKey, usersQueryKey, usersReference } from '../constants/QueryKeys'

export default function useAllAvailability(userId: string | null, serviceDates: DateTime[]) {
  const [minServiceDate, maxServiceDate] = useMemo(() => {
    let max: DateTime | undefined
    let min: DateTime | undefined
    for (const serviceDate of serviceDates) {
      if (!max || max < serviceDate) {
        max = serviceDate
      }
      if (!min || min > serviceDate) {
        min = serviceDate
      }
    }
    return [min, max]
  }, [serviceDates])

  const { data: availabilities, isFetching } = useQuery({
    queryKey: [availabilityQueryKey],
    queryFn: async () => {
      if (!userId || !minServiceDate || !maxServiceDate) {
        return []
      }

      // todo
      // const servicesQuery = query(
      //   collection(db, usersReference, userId, 'availabilities'),
      //   and(
      //     where('timestamp', '>=', Timestamp.fromDate(minServiceDate.toJSDate())),
      //     where('timestamp', '<=', Timestamp.fromDate(maxServiceDate.toJSDate())),
      //   ),
      // )
      // const snapshot = await getDocs(servicesQuery)
      // const docIdToDoc = _.fromPairs(snapshot.docs.map((doc) => [doc.id, doc]))
      // return serviceDates.map((serviceDate): Availability => {
      //   const dateKey = getDateTimeKey(serviceDate)
      //   const doc = docIdToDoc[dateKey]
      //   if (!doc) {
      //     return {
      //       dateTime: serviceDate,
      //       availabilityState: 'unknown',
      //     }
      //   }
      //   return availabilityFromSnapshot(doc)
      // })
      return []
    },
    enabled: !_.isEmpty(userId) && !!maxServiceDate && !!minServiceDate,
  })

  // const queryClient = useQueryClient()
  // const addMutation = useMutation({
  //   mutationFn: async ({ availabilities }: { availabilities: Availability[] }) => {
  //     if (!userId) {
  //       return
  //     }
  //     return Promise.all(
  //       availabilities.map(async (availability) => {
  //         const path = collection(db, usersReference, userId, 'availabilities').path
  //         setDoc(
  //           doc(db, path, getDateTimeKey(availability.dateTime)),
  //           convertToFirebaseAvailability(availability),
  //         )
  //       }),
  //     )
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([usersQueryKey])
  //   },
  // })

  // const addAvailability = useCallback(
  //   (availabilities: Availability[]) => {
  //     addMutation.mutate({ availabilities })
  //   },
  //   [addMutation],
  // )

  // const updateMutation = useMutation({
  //   mutationFn: async ({ availabilities }: { availabilities: Availability[] }) => {
  //     if (!userId) {
  //       return
  //     }

  //     const snapshot = await getDoc(doc(db, usersReference, userId))
  //     if (!snapshot.exists()) return null
  //     const promises = availabilities.map(async (availability) => {
  //       const data = {
  //         dateTime: availability.dateTime.toISO() ?? '',
  //         isAvailable: availability.availabilityState,
  //       }
  //       updateDoc(doc(db, snapshot.ref.path, availability.dateTime.toISO() ?? ''), data)
  //     })
  //     return Promise.all(promises)
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([usersQueryKey])
  //   },
  // })

  // const updateAvailability = useCallback(
  //   (availabilities: Availability[]) => {
  //     updateMutation.mutate({ availabilities })
  //   },
  //   [updateMutation],
  // )

  return {
    availabilities: availabilities ?? [],
    isLoading: isFetching,
    // addAvailability,
    // updateAvailability,
  }
}
