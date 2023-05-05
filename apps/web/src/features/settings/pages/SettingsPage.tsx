import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavigationBar from '../../../app/NavigationBar'
import SideBar from '../../../app/SideBar'
import TableHeader from '../../../components/TableHeader'
import SettingsForm from '../components/SettingsForm'

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: true },
]
const teams = [
  { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
  { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]

const SettingsPage = () => {
  const { currentUser } = useCurrentUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="flex flex-row flex-1 h-full">
        <SideBar
          currentPage="settings"
          onUpdateSelection={function (selected: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
        <main className="p-8 flex flex-col flex-1">
          <NavigationBar currentPage="settings" user={currentUser} />
          <TableHeader
            title="Settings"
            onClickButton={function (): void {
              throw new Error('Function not implemented.')
            }}
            isSearchable={false}
            searchQuery={''}
            setSearchQuery={function (searchQuery: string): void {
              throw new Error('Function not implemented.')
            }}
          />

          <SettingsForm />
        </main>
      </div>
    </>
  )
}
export default withRequireAuth(SettingsPage)
