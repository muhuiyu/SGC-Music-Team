import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AvailabilityPage from './features/availability/pages/AvailabilityPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import MembersPage from './features/members/pages/MembersPage'
import PlannerPage from './features/planner/pages/PlannerPage'
import SongsPage from './features/songs/pages/SongsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/planner',
    element: <PlannerPage />,
  },
  {
    path: '/availability',
    element: <AvailabilityPage />,
  },
  {
    path: '/songs',
    element: <SongsPage />,
  },
  {
    path: '/members',
    element: <MembersPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
