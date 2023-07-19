import { User as SupabaseUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from '../providers/SupabaseProvider'
import { QueryClient, useQuery } from '@tanstack/react-query'

// Auth Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<SupabaseUser | null>(null)

  const { data: sessionData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }
      setUser(sessionData.session?.user ?? null)
      return sessionData!
    },
  })

  const queryClient = new QueryClient()

  let signin = async () => {
    supabase.auth
      .signInWithOAuth({
        provider: 'google',
      })
      .finally(() => {
        queryClient.invalidateQueries(['user'])
      })
  }

  let signout = () => supabase.auth.signOut()

  let value = { sessionData, user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
