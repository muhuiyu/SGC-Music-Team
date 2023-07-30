import React, { ComponentProps, ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { pageInfo } from '../models/common/AppPage'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { sessionData, user, isFetching } = useAuth()
  let location = useLocation()

  if (isFetching) {
    console.log('isFetching')
    // return <div>Loading</div>
  }

  console.log('requireAuth session:', sessionData.session, 'user:', user)

  if (!isFetching && !sessionData.session) {
    console.log('not loggedin')
    // return <div>not logged in</div>
    return <Navigate to={pageInfo.login.href} state={{ from: location }} replace />
  }

  if (!isFetching && !user) {
    // Fetched auth data but the user hasn't created a profile in the database yet
    console.log('children.key', children.key)
    // return <div>need signup</div>
    return <Navigate to={pageInfo.signup.href} state={{ from: location }} replace />
  }
  // Fetched auth session and user data from the database
  return children
}

export function withRequireAuth<C extends ComponentType<any>>(Component: C): React.ComponentType<ComponentProps<C>> {
  return (props) => (
    <RequireAuth>
      <Component {...props} />
    </RequireAuth>
  )
}
