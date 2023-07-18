import { User as FirebaseUser, signInWithRedirect, signOut } from 'firebase/auth'
import { User as SupabaseUser } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { auth, googleProvider } from '../providers/FirebaseProvider'
import { AuthContext } from './AuthContext'
import { supabase } from '../providers/SupabaseProvider'
import { useQuery } from '@tanstack/react-query'

// Auth Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // let [user, setUser] = useState<FirebaseUser | null>(null)

  // let signin = async (callback: VoidFunction) => {
  //   const user = await signInWithRedirect(auth, googleProvider)
  //   setUser(user)
  //   console.log(user)
  //   callback()
  // }

  // let signout = async (callback: VoidFunction) => {
  //   const result = await signOut(auth)
  //   setUser(null)
  //   callback()
  // }

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }
      return sessionData!
    },
  })

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
