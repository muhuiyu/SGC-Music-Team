import useAllUsers from '../../../api/providers/useAllUsers'
import NavBar from '../../../components/NavBar'
import TableHeader from '../../../components/PageHeader'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
import MemberListTable from '../components/MemberListTable'

export default function MembersPage() {
  const users = useAllUsers()
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
        <MemberListTable users={users} />
      </main>
    </div>
  )
}
