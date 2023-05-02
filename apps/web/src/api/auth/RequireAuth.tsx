import React, { ComponentProps, ComponentType } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useLocation } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { auth } from '../providers/FirebaseProvider'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, isLoading] = useAuthState(auth)
  let location = useLocation()

  if (isLoading) {
    return null
  }
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
