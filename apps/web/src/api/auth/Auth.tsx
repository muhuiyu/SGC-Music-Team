import { ComponentProps, ComponentType, createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useLocation } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { auth } from '../providers/FirebaseProvider'

interface AuthContextType {
  user: any
  signin: (callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user] = useAuthState(auth)
  let location = useLocation()
  if (!user) {
    return <Navigate to={pageInfo.login.href} state={{ from: location }} replace />
  }
  return children
}

export function withRequireAuth<C extends ComponentType<any>>(
  Component: C,
): React.ComponentType<ComponentProps<C>> {
  return (props) => (
    <RequireAuth>
      <Component {...props} />
    </RequireAuth>
  )
}
