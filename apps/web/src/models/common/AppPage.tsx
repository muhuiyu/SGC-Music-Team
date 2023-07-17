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
  'serviceDetail',
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
  | 'serviceDetail'

export interface AppPageInfo {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  isBackButtonAvailable: boolean
}

export const pageInfo: Record<AppPage, AppPageInfo> = {
  dashboard: {
    name: 'Dashboard',
    icon: HomeIcon,
    href: '/',
    isBackButtonAvailable: false,
  },
  planner: {
    name: 'Planner',
    icon: TableCellsIcon,
    href: '/planner',
    isBackButtonAvailable: false,
  },
  calendar: {
    name: 'Calendar',
    icon: CalendarIcon,
    href: '/calendar',
    isBackButtonAvailable: false,
  },
  users: {
    name: 'Users',
    icon: UsersIcon,
    href: '/users',
    isBackButtonAvailable: false,
  },
  songs: {
    name: 'Songs',
    icon: DocumentDuplicateIcon,
    href: '/songs',
    isBackButtonAvailable: false,
  },
  settings: {
    name: 'Settings',
    icon: WrenchIcon,
    href: '/settings',
    isBackButtonAvailable: false,
  },
  login: {
    name: 'Login',
    icon: QuestionMarkCircleIcon,
    href: '/login',
    isBackButtonAvailable: false,
  },
  serviceList: {
    name: 'Service List',
    icon: ListBulletIcon,
    href: '/serviceList',
    isBackButtonAvailable: false,
  },
  serviceDetail: {
    name: 'Service Details',
    icon: ListBulletIcon,
    href: '/serviceDetails',
    isBackButtonAvailable: true,
  },
  signup: {
    name: 'Sign Up',
    icon: QuestionMarkCircleIcon,
    href: '/signup',
    isBackButtonAvailable: false,
  },
}
