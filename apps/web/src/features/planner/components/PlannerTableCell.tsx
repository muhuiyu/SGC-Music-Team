import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useState } from 'react'
import Service from '../../../models/Service'
import User, { UserRole, roleInfo } from '../../../models/User'

interface Props {
  service: Service
  user: User
  isEditing: boolean
  onStartEditing(): void
  onEndEditing(): void
}

export default function PlannerTableCell(props: Props) {
  const { service, user, isEditing, onStartEditing, onEndEditing } = props
  const [currentRole, setCurrentRole] = useState<UserRole | undefined>(undefined)

  return (
    <td className="relative whitespace-nowrap px-5 py-5 text-right text-sm font-medium">
      <button
        className="px-3 py-2 border border-gray-300 rounded-md w-full flex flex-row justify-between items-center"
        style={
          currentRole
            ? {
                borderColor: roleInfo[currentRole].colorCode,
                backgroundColor: roleInfo[currentRole].colorCode,
                color: roleInfo[currentRole].textColorCode,
              }
            : undefined
        }
        onClick={() => (isEditing ? onEndEditing() : onStartEditing())}
      >
        {currentRole ? roleInfo[currentRole].name : 'Choose a role'}&nbsp;
        <span
          style={
            currentRole
              ? { color: roleInfo[currentRole].textColorCode }
              : { color: 'text-gray-400' }
          }
        >
          {currentRole && isEditing ? (
            <XMarkIcon
              width={18}
              onClick={() => {
                setCurrentRole(undefined)
                onEndEditing()
              }}
            />
          ) : (
            <ChevronDownIcon width={18} />
          )}
        </span>
      </button>
      <ul
        className={classNames(
          'absolute z-50 border border-gray-300 rounded-md inset-x-5 bg-white text-start',
          !isEditing && 'hidden',
        )}
      >
        {Object.entries(roleInfo).map(([roleId, role]) => (
          <li key={roleId} className="flex">
            <button
              className="px-3 py-2 hover:bg-gray-200 active:bg-gray-200 cursor-pointer flex flex-1"
              onClick={() => {
                setCurrentRole(roleId as UserRole)
                onEndEditing()
              }}
            >
              {role.name}
            </button>
          </li>
        ))}
      </ul>
    </td>
  )
}
