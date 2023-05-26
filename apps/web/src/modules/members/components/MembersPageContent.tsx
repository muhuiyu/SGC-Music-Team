import _ from 'lodash'
import { useMemo, useState } from 'react'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import SearchBar from '../../common/components/SearchBar'
import MemberListTable from './MemberListTable'

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

  const searchBar = (
    <SearchBar
      className="w-1/3"
      placeholder="Search name, email..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e)}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      <TableHeader
        title="Members"
        searchElement={searchBar}
        onClickButton={() => {}}
        {...{ searchQuery, setSearchQuery }}
      />
      <MemberListTable {...{ updateUser, isLoading }} users={filteredData} />
    </div>
  )
}
