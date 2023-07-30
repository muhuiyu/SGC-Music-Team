import { Session, SignInWithOAuthCredentials } from '@supabase/supabase-js'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../constants/Environment'
import { currentAuthQueryKey } from '../constants/QueryKeys'
import { pageInfo } from '../models/common/AppPage'
import User from '../models/user/User'
import { getUserProfile, supabase } from './SupabaseProvider'

type AuthMutationPayload = ({ type: 'signInWithOAuth' } & SignInWithOAuthCredentials) | { type: 'signOut' }

export interface UseAuthOptions {
  onFetchUser?(session: Session | null, user: User | null): void
}

export default function useAuth(options?: UseAuthOptions) {
  const {
    data: { sessionData, user },
    isFetching,
  } = useQuery({
    queryKey: [currentAuthQueryKey],
    queryFn: async (): Promise<{ sessionData: { session: Session | null }; user: User | null }> => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }

      // No supabase session, return null
      if (!sessionData.session) {
        return { sessionData, user: null }
      }

      // Get user profile saved in /users database
      const user = await getUserProfile(sessionData.session.user.id)
      console.log('useAuth, sessionData', sessionData.session, 'user', user)
      return { sessionData, user }
    },
    onSuccess: (data) => {
      options?.onFetchUser?.(sessionData.session, data.user)
    },
    onError: (error: Error) => {
      alert(error.message)
    },
    initialData: { sessionData: { session: null }, user: null },
  })

  const isLoggedIn = !!user
  const userMetadata = sessionData.session?.user.user_metadata

  const queryClient = new QueryClient()
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: AuthMutationPayload) => {
      switch (payload.type) {
        case 'signInWithOAuth':
          return supabase.auth.signInWithOAuth(_.omit(payload, 'type'))

        case 'signOut':
          return supabase.auth.signOut()
      }
    },
    onMutate: async (payload: AuthMutationPayload) => {
      switch (payload.type) {
        case 'signOut':
          await queryClient.setQueryData([currentAuthQueryKey], () => null)
          break
      }
    },
    onSuccess: (_data, payload) => {
      switch (payload.type) {
        case 'signOut':
          navigate(pageInfo.login.href, { replace: true })
      }
      queryClient.invalidateQueries([currentAuthQueryKey])
    },
  })

  const signIn = async () => {
    await mutateAsync({
      type: 'signInWithOAuth',
      provider: 'google',
      options: {
        redirectTo: baseUrl,
      },
    })
  }

  const signOut = async () => {
    await mutateAsync({ type: 'signOut' })
  }

  return { sessionData, user, userMetadata, isFetching, isLoggedIn, signIn, signOut }
}
