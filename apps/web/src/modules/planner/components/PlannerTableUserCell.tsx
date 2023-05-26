import classNames from 'classnames'
import User from '../../../models/user/User'

interface Props {
  user: User
  shouldAddLeftPadding: boolean
}
export default function PlannerTableUserCell(props: Props) {
  const { user, shouldAddLeftPadding } = props
  return (
    <td
      className={classNames(
        'whitespace-nowrap px-5 py-5 text-sm',
        shouldAddLeftPadding ? '' : 'sm:pl-0',
      )}
    >
      <div className="flex items-center">
        <div className="h-11 w-11 flex-shrink-0">
          <img className="h-11 w-11 rounded-full" src={user.imageUrlString ?? ''} alt="" />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="mt-1 text-gray-500">{user.availableRoles.join(', ')}</div>
        </div>
      </div>
    </td>
  )
}
