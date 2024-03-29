import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { pageInfo } from './models/common/AppPage'
import LoginPage from './modules/auth/pages/LoginPage'
import SignUpPage from './modules/auth/pages/SignUpPage'
import AvailabilityPage from './modules/availability/pages/AvailabilityPage'
import CalendarPage from './modules/calendar/pages/CalendarPage'
import ErrorPage from './modules/common/pages/ErrorPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import ServiceDetailsPage from './modules/dashboard/pages/ServiceDetailPage'
import PlannerPage from './modules/planner/pages/PlannerPage'
import ServiceListPage from './modules/serviceList/pages/ServiceListPage'
import SettingsPage from './modules/settings/pages/SettingsPage'
import SongDetailPage from './modules/songs/pages/SongDetailPage'
import SongsPage from './modules/songs/pages/SongsPage'
import UserDetailPage from './modules/users/pages/UserDetailPage'
import UsersPage from './modules/users/pages/UsersPage'

const router = createBrowserRouter([
  {
    path: pageInfo.login.href,
    Component: () => <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.signup.href,
    Component: () => <SignUpPage />,
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
    path: pageInfo.availability.href,
    Component: () => <AvailabilityPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.songs.href,
    Component: () => <SongsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${pageInfo.songDetail.href}/:id`,
    Component: () => <SongDetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.users.href,
    Component: () => <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${pageInfo.userDetail.href}/:id`,
    Component: () => <UserDetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: pageInfo.settings.href,
    Component: () => <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${pageInfo.serviceDetail.href}/:id`,
    Component: () => <ServiceDetailsPage />,
    errorElement: <ErrorPage />,
  },
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
