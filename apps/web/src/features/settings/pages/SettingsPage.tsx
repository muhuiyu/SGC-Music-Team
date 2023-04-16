import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import NavBar from '../../../components/NavBar'
import TableHeader from '../../../components/PageHeader'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
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

export default function SettingsPage() {
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
          <NavBar title="Settings" user={testUser} />
          <TableHeader
            title="Settings"
            onClickButton={function (): void {
              throw new Error('Function not implemented.')
            }}
          />

          <SettingsForm />
        </main>
      </div>
    </>
  )
}
