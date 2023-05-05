import { withRequireAuth } from '../../../api/auth/RequireAuth'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavigationBar from '../../../app/NavigationBar'
import SideBar from '../../../app/SideBar'

const CalendarPage = () => {
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
        <NavigationBar currentPage="calendar" user={currentUser} />
      </main>
    </div>
  )
}

export default withRequireAuth(CalendarPage)
