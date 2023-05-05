import _ from 'lodash'
import { useMemo, useState } from 'react'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import MemberListTable from '../components/MemberListTable'

export default function MembersPageContent() {
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
    <div className="m-1">
      <TableHeader
        isSearchable={true}
        title="Members"
        searchPlaceholder="Search name, email..."
        onClickButton={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...{ searchQuery, setSearchQuery }}
      />
      <MemberListTable {...{ updateUser, isLoading }} users={filteredData} />
    </div>
  )
}
