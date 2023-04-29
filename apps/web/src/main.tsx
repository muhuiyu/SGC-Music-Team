import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ServiceListPage from './features/serviceList/pages/ServiceListPage'
import CalendarPage from './features/calendar/pages/CalendarPage'
import ErrorPage from './features/common/pages/ErrorPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import LoginPage from './features/login/pages/LoginPage'
import MembersPage from './features/members/pages/MembersPage'
import PlannerPage from './features/planner/pages/PlannerPage'
import SettingsPage from './features/settings/pages/SettingsPage'
import SignUpPage from './features/signup/pages/SignUpPage'
import SongsPage from './features/songs/pages/SongsPage'
import { pageInfo } from './models/common/AppPage'

const router = createBrowserRouter([
  {
    path: pageInfo['login'].href,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['dashboard'].href,
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['planner'].href,
    element: <PlannerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['calendar'].href,
    element: <CalendarPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['songs'].href,
    element: <SongsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['members'].href,
    element: <MembersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['settings'].href,
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo['signup'].href,
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  // TODO: define logout
  {
    path: pageInfo['serviceList'].href,
    element: <ServiceListPage />,
    errorElement: <ErrorPage />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
