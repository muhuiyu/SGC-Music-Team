import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/auth/AuthProvider'
import CalendarPage from './features/calendar/pages/CalendarPage'
import ErrorPage from './features/common/pages/ErrorPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import LoginPage from './features/login/pages/LoginPage'
import MembersPage from './features/members/pages/MembersPage'
import PlannerPage from './features/planner/pages/PlannerPage'
import ServiceListPage from './features/serviceList/pages/ServiceListPage'
import SettingsPage from './features/settings/pages/SettingsPage'
import SignUpPage from './features/signup/pages/SignUpPage'
import SongsPage from './features/songs/pages/SongsPage'
import { pageInfo } from './models/common/AppPage'

const router = createBrowserRouter([
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
    path: pageInfo.members.href,
    Component: () => <MembersPage />,
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
