import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Service from '../../../models/service/Service'
import User, { UserRole, roleInfo } from '../../../models/user/User'

interface Props {
  service: Service
  user: User
  isEditing: boolean
  onStartEditing(): void
  onEndEditing(): void
  onRoleChange(role: UserRole | undefined): void
}

export default function PlannerTableCell(props: Props) {
  const { service, user, isEditing, onStartEditing, onEndEditing, onRoleChange } = props
  const [currentRole, setCurrentRole] = useState<UserRole | undefined>(service.assignments[user.id])
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
        onClick={handleClick}
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
              className="px-2"
              width={18}
              onClick={() => {
                setCurrentRole(undefined)
                onEndEditing()
                onRoleChange(undefined)
              }}
            />
          ) : (
            <ChevronDownIcon width={18} />
          )}
        </span>
      </button>
      <ul
        ref={dropdownRef}
        className={classNames(
          'absolute z-50 border border-gray-300 rounded-md inset-x-5 bg-white text-start',
          !isEditing && 'hidden',
        )}
      >
        {Object.entries(roleInfo)
          .filter((e) => user.availableRoles.includes(e[0] as UserRole))
          .map(([roleId, role]) => (
            <li key={roleId} className="flex">
              <button
                className="px-3 py-2 hover:bg-gray-200 active:bg-gray-200 cursor-pointer flex flex-1"
                onClick={() => {
                  const role = roleId as UserRole
                  setCurrentRole(role)
                  onEndEditing()
                  onRoleChange(role)
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
