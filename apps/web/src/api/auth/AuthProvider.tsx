import { User as SupabaseUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from '../providers/SupabaseProvider'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { currentAuthQueryKey } from '../constants/QueryKeys'
import { baseUrl } from '../constants/Environment'
import { useNavigate } from 'react-router-dom'

// Auth Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

  const { data: sessionData, isFetching } = useQuery({
    queryKey: [currentAuthQueryKey],
    queryFn: async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }
      const loggedInUser = sessionData.session?.user ?? null
      setUser(loggedInUser)
      setLoggedIn(!!loggedInUser) // update login status

      return sessionData!
    },
  })

  const queryClient = new QueryClient()

  let signin = async () => {
    supabase.auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: baseUrl + 'login',
        },
      })
      .finally(() => {
        queryClient.invalidateQueries([currentAuthQueryKey])
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  let signout = async () => {
    await supabase.auth.signOut().finally(() => {
      setLoggedIn(false)
      setUser(null)
      queryClient.invalidateQueries([currentAuthQueryKey])
    })
  }

  let value = { sessionData, user, isFetching, isLoggedIn, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
