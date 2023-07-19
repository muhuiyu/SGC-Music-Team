import React, { ComponentProps, ComponentType, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { AuthContext } from './AuthContext'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext)
  let location = useLocation()

  if (user === null) {
    // User value is still being fetched, show loading state or spinner
    return <div></div>
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
