import React, { ComponentProps, ComponentType, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { pageInfo } from '../../models/common/AppPage'
import { AuthContext } from './AuthContext'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isFetching, isLoggedIn } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true)

  let location = useLocation()

  useEffect(() => {
    if (!isFetching) {
      setLoading(false)
    }
  }, [isFetching])

  if (isLoading) {
    return <div>Loading... </div>
  }

  if (!isLoggedIn && !user && !isFetching) {
    return <Navigate to={pageInfo.login.href} state={{ from: location }} replace />
  }

  if (!user) {
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
