import React, { ComponentProps, ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import useAuth from '../providers/useAuth'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()

  let location = useLocation()

  console.log('call require auth', 'user', user)

  if (!user) {
    console.log('not loggedin')
    return <Navigate to={pageInfo.login.href} state={{ from: location }} replace />
  }

  return children
}

export function withRequireAuth<C extends ComponentType<any>>(Component: C): React.ComponentType<ComponentProps<C>> {
  return (props) => (
    <RequireAuth>
      <Component {...props} />
    </RequireAuth>
  )
}
