import {
  CalendarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  TableCellsIcon,
  UsersIcon,
  WrenchIcon,
} from '@heroicons/react/20/solid'

export const navigationPages: AppPage[] = [
  'dashboard',
  'calendar',
  'planner',
  'users',
  'songs',
  'serviceList',
]

export const allAppPages: AppPage[] = [
  'dashboard',
  'calendar',
  'planner',
  'users',
  'songs',
  'settings',
  'serviceList',
  'login',
  'signup',
]

export type AppPage =
  | 'dashboard'
  | 'planner'
  | 'calendar'
  | 'users'
  | 'songs'
  | 'settings'
  | 'serviceList'
  | 'login'
  | 'signup'

export interface AppPageInfo {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

export const pageInfo: Record<AppPage, AppPageInfo> = {
  dashboard: {
    name: 'Dashboard',
    icon: HomeIcon,
    href: '/',
  },
  planner: {
    name: 'Planner',
    icon: TableCellsIcon,
    href: '/planner',
  },
  calendar: {
    name: 'Calendar',
    icon: CalendarIcon,
    href: '/calendar',
  },
  users: {
    name: 'Users',
    icon: UsersIcon,
    href: '/users',
  },
  songs: {
    name: 'Songs',
    icon: DocumentDuplicateIcon,
    href: '/songs',
  },
  settings: {
    name: 'Settings',
    icon: WrenchIcon,
    href: '/settings',
  },
  login: {
    name: 'Login',
    icon: QuestionMarkCircleIcon,
    href: '/login',
  },
  serviceList: {
    name: 'Service List',
    icon: ListBulletIcon,
    href: '/serviceList',
  },
  signup: {
    name: 'Sign Up',
    icon: QuestionMarkCircleIcon,
    href: '/signup',
  },
}
