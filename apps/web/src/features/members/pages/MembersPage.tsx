import NavBar from '../../../components/NavBar'
import TableHeader from '../../../components/PageHeader'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
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
      <SideBar
        currentPage="members"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1">
        <NavBar title="Members" user={testUser} />
        <TableHeader
          title="Members"
          buttonText="Add member"
          onClickButton={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
        {/* table */}
        <MemberListTable users={members} />
      </main>
    </div>
  )
}
