import {
  CalendarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  TableCellsIcon,
  UsersIcon,
  WrenchIcon,
} from '@heroicons/react/20/solid'

export const allAppPages: AppPage[] = [
  'dashboard',
  'calendar',
  'planner',
  'members',
  'songs',
  'settings',
]

export type AppPage = 'dashboard' | 'planner' | 'calendar' | 'members' | 'songs' | 'settings'

export interface AppPageInfo {
  name: string
  Icon: React.ComponentType<{ className?: string }>
  href: string
}

export const pageInfo: Record<AppPage, AppPageInfo> = {
  dashboard: {
    name: 'Dashboard',
    Icon: HomeIcon,
    href: '/',
  },
  planner: {
    name: 'Planner',
    Icon: TableCellsIcon,
    href: '/planner',
  },
  calendar: {
    name: 'Calendar',
    Icon: CalendarIcon,
    href: '/calendar',
  },
  members: {
    name: 'Members',
    Icon: UsersIcon,
    href: '/members',
  },
  songs: {
    name: 'Songs',
    Icon: DocumentDuplicateIcon,
    href: '/songs',
  },
  settings: {
    name: 'Settings',
    Icon: WrenchIcon,
    href: '/settings',
  },
}
