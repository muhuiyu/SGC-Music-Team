import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import User from '../../../models/User'
import MemberListTable from '../components/MemberListTable'

export default function MembersPage() {
  const members: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '123-456-7890',
      roles: ['bass', 'drums', 'guitar'],
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phoneNumber: '123-456-7890',
      roles: ['lead', 'piano'],
    },
    {
      id: '3',
      name: 'Bob Smith',
      email: 'bob@example.com',
      phoneNumber: '123-456-7890',
      roles: ['pa', 'vocal'],
    },
  ]

  return (
    <div className="flex flex-row flex-1 h-full">
      <SideBar />
      <main className="p-8 flex flex-col flex-1">
        {/* Navbar */}
        <NavBar title="Members" />
        {/* table */}
        <MemberListTable users={members} />
      </main>
    </div>
  )
}
