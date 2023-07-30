import _ from 'lodash'
import { useMemo, useState } from 'react'

import useAllUsers from '../../../hooks/useAllUsers'
import SearchBar from '../../common/components/SearchBar'
import TableHeader from '../../common/components/TableHeader'
import { pageContentDivStyle } from '../../common/styles/ComponentStyles'
import UserListTable from './UserListTable'

export default function UsersPageContent() {
  const { users, isLoading } = useAllUsers()
  const [searchQuery, setSearchQuery] = useState('')

  const keyedUsers = useMemo(() => {
    return _.keyBy(users, 'id')
  }, [users])

  const searchableUsers = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      key: [user.name, user.email].map((e) => e.toLowerCase()).join(' '),
    }))
  }, [users])

  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return users
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    const userIds = searchableUsers.filter(({ key }) => key.includes(lowercasedQuery)).map(({ id }) => id)
    return _.compact(userIds.map((id) => keyedUsers[id]))
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
    <>
      <div className={pageContentDivStyle}>
        <TableHeader
          title="Users"
          filterElement={searchBar}
          onClickButton={() => {}}
          {...{ searchQuery, setSearchQuery }}
        />
        <UserListTable {...{ users: filteredData, isLoading }} />
      </div>
    </>
  )
}
