import { useState } from 'react'
import Service from '../../../models/Service'
import UserModel, { UserRole, roleInfo } from '../../../models/User'

interface Props {
  service: Service
  user: UserModel
  onRequestEdit: void
}

const configureDropdownClassName = (role?: UserRole): string => {
  const emptyStyle =
    'bg-white border p-3 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
  if (role == null) {
    return emptyStyle
  }
  switch (role) {
    case 'bass':
      return '"bg-yellow border p-3 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"'
    default:
      return emptyStyle
  }
}

export default function PlannerTableCell(props: Props) {
  const { service, user, onRequestEdit } = props
  const [currentRole, setCurrentRole] = useState(service.duty[user.id])

  return (
    <td className="relative whitespace-nowrap px-5 py-5 text-right text-sm font-medium w-30">
      <select id="countries" className={configureDropdownClassName(currentRole)}>
        <option selected>Choose role</option>
        {user.roles.map((item) => (
          <option value="item" onSelect={() => setCurrentRole(item)}>
            {roleInfo[item].name}
          </option>
        ))}
      </select>
    </td>
  )
}
