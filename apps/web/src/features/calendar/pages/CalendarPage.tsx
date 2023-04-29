import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'

export default function CalendarPage() {
  const { currentUser } = useCurrentUser()
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
        <NavBar currentPage="calendar" user={currentUser} />
      </main>
    </div>
  )
}
