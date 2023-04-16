import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'

export default function CalendarPage() {
  return (
    <div className="flex flex-row flex-1 h-full">
      {/* sidebar */}
      <SideBar
        currentPage="calendar"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1">
        {/* Navbar */}
        <NavBar title="Calender" user={testUser} />
      </main>
    </div>
  )
}
