import { User as FirebaseUser, signInWithRedirect, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../providers/FirebaseProvider'
import { AuthContext } from './Auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<FirebaseUser | null>(null)

  let signin = async (callback: VoidFunction) => {
    const user = await signInWithRedirect(auth, googleProvider)
    setUser(user)
    console.log(user)
    callback()
  }

  let signout = async (callback: VoidFunction) => {
    const result = await signOut(auth)
    setUser(null)
    callback()
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
