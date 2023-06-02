import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import User, { emptyUser } from '../../../models/user/User'
import SearchBar from '../../common/components/SearchBar'
import EditUserModal from './EditUserModal'
import UserListTable from './UserListTable'

export default function UsersPageContent() {
  // User and search
  const { users, updateUser, isLoading } = useAllUsers()
  const { currentUser } = useCurrentUser()
  const [searchQuery, setSearchQuery] = useState('')

  const keyedUsers = useMemo(() => {
    return _.keyBy(users, 'id')
  }, [users])

  const searchableUsers = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      key: [user.firstName, user.lastName, user.email].map((e) => e.toLowerCase()).join(' '),
    }))
  }, [users])

  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return users
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    const userIds = searchableUsers
      .filter(({ key }) => key.includes(lowercasedQuery))
      .map(({ id }) => id)
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

  // Editing
  const [isShowingEditUserModal, setShowingEditUserModal] = useState(false)
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(null)

  function onRequestEdit(user: User) {
    setCurrentEditingUser(user)
    setShowingEditUserModal(true)
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingEditUserModal(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4">
        <TableHeader
          title="Users"
          searchElement={searchBar}
          onClickButton={() => {}}
          {...{ searchQuery, setSearchQuery }}
        />
        <UserListTable {...{ updateUser, isLoading, onRequestEdit }} users={filteredData} />
      </div>
      {/* edit user */}
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingEditUserModal },
        )}
      >
        <EditUserModal
          {...{ isShowingEditUserModal: isShowingEditUserModal }}
          user={currentEditingUser ?? emptyUser}
          onSaveUser={(user) => {
            updateUser(user.id, user)
          }}
          onDismiss={() => {
            setShowingEditUserModal(false)
            setCurrentEditingUser(null)
          }}
        />
      </div>
    </>
  )
}
