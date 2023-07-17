import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import _ from 'lodash'
import { serviceFromSnapshot } from '../../models/service/Service'
import { servicesQueryKey, servicesReference } from '../constants/FirebaseKeys'
import { db } from './FirebaseProvider'

// todo: add service time
export default function useAllServices() {
  const { data: services, isFetching } = useQuery({
    queryKey: [servicesQueryKey],
    queryFn: async () => {
      const nextQuery = query(collection(db, servicesReference))
      const querySnapshot = await getDocs(nextQuery)
      const services = querySnapshot.docs.map(serviceFromSnapshot)
      return _.sortBy(services, (a) => a.dateTime)
    },
  })

  return {
    isFetching,
    services: services ?? [],
  }
}
