import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'

export default function DashboardPage() {
  return (
    <div className="flex flex-row flex-1 h-full">
      <SideBar
        currentPage="dashboard"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1">
        {/* Navbar */}
        <NavBar title="Dashboard" user={testUser} />
      </main>
    </div>
  )
}
