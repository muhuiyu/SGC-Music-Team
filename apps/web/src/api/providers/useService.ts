import { useQuery, useQueryClient } from '@tanstack/react-query'
import Service, { serviceFromSnapshot } from '../../models/service/Service'
import { serviceQueryKey, servicesReference } from '../constants/FirebaseKeys'
import { doc, getDoc, query } from 'firebase/firestore'
import { db } from './FirebaseProvider'

export default function useService(serviceId: Service['id']) {
  const { data: service, isFetching } = useQuery({
    queryKey: [serviceQueryKey],
    queryFn: async () => {
      const serviceDocRef = doc(db, servicesReference, serviceId)
      const querySnapshot = await getDoc(serviceDocRef)
      const service = serviceFromSnapshot(querySnapshot)
      return service
    },
  })

  return {
    service,
    isFetching,
  }
}
