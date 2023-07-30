import { MouseEventHandler } from 'react'
import User, { roleInfo } from '../../../models/user/User'

interface Props {
  user: User
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onClick?: MouseEventHandler | undefined
}

export default function UserListRow(props: Props) {
  const { user, selected = false, onUpdateSelection, onClick } = props

  return (
    <tr key={user.email} onClick={onClick}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={user.email}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">{user.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm flex flex-row gap-1">
        {user.availableRoles.map((role) => (
          <span
            key={role}
            className="inline-flex rounded-full px-2 text-xs font-medium leading-5 items-center"
            style={{
              backgroundColor: roleInfo[role].colorCode,
              color: roleInfo[role].textColorCode,
            }}
          >
            {role}
          </span>
        ))}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">{user.email}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
        {user.countryCode} {user.phoneNumber}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
        <div className="flex items-center">
          {user.isInSingapore ? (
            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" />
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
          )}
          {user.isInSingapore ? 'yes' : 'no'}
        </div>
      </td>
    </tr>
  )
}
