import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import User from '../../../models/user/User'
import Spinner from '../../common/components/Spinner'
import MemberListRow from './MemberListRow'

interface Props {
  users: User[]
  updateUser(userId: User['id'], details: Partial<User>): void
  isLoading: boolean
}

export default function MemberListTable({ users, updateUser, isLoading }: Props) {
  const [editingUserId, setEditingUserId] = useState<User['id'] | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<User['id'][]>([])

  const areAllUsersSelected = useMemo(() => {
    return _.isEmpty(_.difference(_.map(users, 'id'), selectedUserIds))
  }, [selectedUserIds, users])

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="relative">
              {selectedUserIds.length > 0 && (
                <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Bulk edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Delete all
                  </button>
                </div>
              )}
              <table className="min-w-full divide-y divide-gray-300">
                {/* table header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                        // className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300  focus:ring-indigo-600"
                        checked={areAllUsersSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUserIds(_.map(users, 'id'))
                          } else {
                            setSelectedUserIds([])
                          }
                        }}
                      />
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Phone number
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      In Singpaore
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 items-end">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user, index) => (
                    <MemberListRow
                      key={user.id}
                      user={user}
                      // editing={user.id === editingUserId}
                      selected={selectedUserIds.includes(user.id)}
                      onUpdateSelection={(selected) => {
                        setSelectedUserIds(
                          produce((draft) => {
                            if (selected) {
                              draft.push(user.id)
                            } else {
                              _.pull(draft, user.id)
                            }
                          }),
                        )
                      }}
                      onRequestEdit={() => setEditingUserId(user.id)}
                      // onCommitEdit={(details) => {
                      //   updateUser(user.id, details)
                      //   setEditingUserId(null)
                      // }}
                      // onCancelEdit={() => setEditingUserId(null)}
                    />
                  ))}
                </tbody>
              </table>
              {/* Loading */}
              <div
                className={classNames(
                  'absolute inset-0 flex justify-center items-center text-center',
                  {
                    hidden: !isLoading,
                  },
                )}
              >
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
