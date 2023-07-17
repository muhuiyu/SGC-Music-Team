import {
  CalendarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  TableCellsIcon,
  UserIcon,
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
  'userDetail',
  'songs',
  'songDetail',
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
  | 'userDetail'
  | 'songs'
  | 'songDetail'
  | 'settings'
  | 'serviceList'
  | 'serviceDetail'
  | 'login'
  | 'signup'

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
  userDetail: {
    name: 'User Details',
    icon: UserIcon,
    href: '/user',
    isBackButtonAvailable: true,
  },
  songs: {
    name: 'Songs',
    icon: DocumentDuplicateIcon,
    href: '/songs',
    isBackButtonAvailable: false,
  },
  songDetail: {
    name: 'Song Details',
    icon: DocumentDuplicateIcon,
    href: '/song',
    isBackButtonAvailable: true,
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
    href: '/service',
    isBackButtonAvailable: true,
  },
  signup: {
    name: 'Sign Up',
    icon: QuestionMarkCircleIcon,
    href: '/signup',
    isBackButtonAvailable: false,
  },
}
