import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Service from '../../../models/service/Service'
import User from '../../../models/user/User'

interface Props {
  users: User[]
  service: Service
  isEditing: boolean
  onStartEditing(): void
  onEndEditing(): void
  onChangeLead(userId: User['id'] | undefined): void
}

export default function PlannerTableLeadCell(props: Props) {
  const { users, service, isEditing, onStartEditing, onEndEditing, onChangeLead } = props
  const [currentUser, setCurrentUser] = useState<User | undefined>(users.filter((e) => e.id === service.lead)[0])
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onEndEditing()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onEndEditing])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    isEditing ? onEndEditing() : onStartEditing()
  }

  return (
    <td className="relative whitespace-nowrap px-5 py-5 text-right text-sm font-medium">
      <button
        id="dropdownUsersButton"
        data-dropdown-toggle="dropdownUsers"
        data-dropdown-placement="bottom"
        className={classNames(
          'w-full justify-between  focus:ring-4 focus:outline-none focus:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
          currentUser
            ? 'text-white bg-green-700 hover:bg-green-800 focus:bg-green-800'
            : 'text-gray-400 border border-gray-300 hover:bg-gray-100 focus:bg-gray-100',
        )}
        type="button"
        style={
          currentUser
            ? undefined
            : {
                borderStyle: 'dashed',
              }
        }
        onClick={handleClick}
      >
        {currentUser ? currentUser.firstName + ' ' + currentUser.lastName : 'Choose user'}
        {currentUser ? (
          <XMarkIcon
            width={18}
            onClick={() => {
              setCurrentUser(undefined)
              onEndEditing()
              onChangeLead(undefined)
            }}
          />
        ) : (
          <PlusIcon width={18} />
        )}
      </button>

      <div
        id="dropdownUsers"
        className={classNames(
          'z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 absolute',
          isEditing ? '' : 'hidden',
        )}
      >
        <ul
          ref={dropdownRef}
          className="py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUsersButton"
        >
          {users.map((user) => (
            <li key={user.id}>
              <button
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setCurrentUser(user)
                  onEndEditing()
                  onChangeLead(user.id)
                }}
              >
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src={user.imageUrlString}
                  alt={user.firstName + ' ' + user.lastName + ' image'}
                />
                {user.firstName + ' ' + user.lastName}
              </button>
            </li>
          ))}
        </ul>
        {/* <a
          href="#"
          className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
        >
          <svg
            className="w-5 h-5 mr-1"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
          </svg>
          Add new user
        </a> */}
      </div>
    </td>
  )
}
