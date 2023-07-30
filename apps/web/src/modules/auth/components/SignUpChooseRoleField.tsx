import { UserRole, allRoles, roleInfo } from '../../../models/user/User'
import { labelStyle } from '../styles/styles'

interface Props {
  className?: string
  selectedRoles: UserRole[]
  onAddRole(role: UserRole): void
  onRemoveRole(role: UserRole): void
}

export default function SignUpChooseRoleField({ className, selectedRoles, onAddRole, onRemoveRole }: Props) {
  return (
    <div className={className}>
      <label htmlFor="role" className={labelStyle}>
        What roles would you like to do?
      </label>
      <div className="flex flex-row gap-6">
        <div className="mt-4 divide-gray-200">
          {allRoles.map((role, index) => (
            <div key={index} className="relative flex items-center py-4">
              <input
                id="orange-checkbox"
                type="checkbox"
                name={roleInfo[role].name}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                checked={selectedRoles.includes(role)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onAddRole(role)
                  } else {
                    onRemoveRole(role)
                  }
                }}
              />
              <label htmlFor="orange-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                {roleInfo[role].name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
