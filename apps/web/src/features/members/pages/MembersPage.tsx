import _ from 'lodash'
import { useMemo, useState } from 'react'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import TableHeader from '../../../components/TableHeader'
import MemberListTable from '../components/MemberListTable'

export default function MembersPage() {
  const { users, updateUser, isLoading } = useAllUsers()
  const { currentUser } = useCurrentUser()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return users
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery)
      )
    })
  }, [users, searchQuery])

  return (
    <>
      <div className="flex flex-row flex-1 h-full">
        <SideBar
          currentPage="members"
          onUpdateSelection={function (selected: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
        <main className="p-8 flex flex-col flex-1">
          <NavBar currentPage="members" user={currentUser} />
          <TableHeader
            isSearchable={true}
            title="Members"
            searchPlaceholder="Search name, email..."
            onClickButton={function (): void {
              throw new Error('Function not implemented.')
            }}
            {...{ searchQuery, setSearchQuery }}
          />
          {/* table */}
          <MemberListTable {...{ updateUser, isLoading }} users={filteredData} />
        </main>
      </div>
    </>
  )
}
