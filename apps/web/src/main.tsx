import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CalendarPage from './features/calendar/pages/CalendarPage'
import ErrorPage from './features/common/pages/ErrorPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import LoginPage from './features/login/pages/LoginPage'
import MembersPage from './features/members/pages/MembersPage'
import PlannerPage from './features/planner/pages/PlannerPage'
import SettingsPage from './features/settings/pages/SettingsPage'
import SignUpPage from './features/signup/pages/SignUpPage'
import SongsPage from './features/songs/pages/SongsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/planner',
    element: <PlannerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/songs',
    element: <SongsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/members',
    element: <MembersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  // TODO: define logout
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
