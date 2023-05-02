import { createContext } from 'react'

export interface AuthContextType {
  user: any
  signin: (callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>(null!)
