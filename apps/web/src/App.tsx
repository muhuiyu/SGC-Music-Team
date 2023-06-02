import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/auth/AuthProvider'
import { pageInfo } from './models/common/AppPage'
import LoginPage from './modules/authentication/pages/LoginPage'
import CalendarPage from './modules/calendar/pages/CalendarPage'
import TestPage from './modules/common/TestPage'
import ErrorPage from './modules/common/pages/ErrorPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import PlannerPage from './modules/planner/pages/PlannerPage'
import ServiceListPage from './modules/serviceList/pages/ServiceListPage'
import SettingsPage from './modules/settings/pages/SettingsPage'
import SignUpPage from './modules/signup/pages/SignUpPage'
import SongsPage from './modules/songs/pages/SongsPage'
import UsersPage from './modules/users/pages/UsersPage'

const router = createBrowserRouter([
  {
    path: '/test',
    Component: () => <TestPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.login.href,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.signup.href,
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.dashboard.href,
    Component: () => <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.planner.href,
    Component: () => <PlannerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.calendar.href,
    Component: () => <CalendarPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.songs.href,
    Component: () => <SongsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.users.href,
    Component: () => <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.settings.href,
    Component: () => <SettingsPage />,
    errorElement: <ErrorPage />,
  },

  // TODO: define logout
  {
    path: pageInfo.serviceList.href,
    Component: () => <ServiceListPage />,
    errorElement: <ErrorPage />,
  },
])

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
