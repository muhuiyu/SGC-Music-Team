import User from '../../../models/user/User'

interface Props {
  users: User[]
}

export default function PlannerUserList(props: Props) {
  const { users } = props
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md px-4">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.email} className="flex py-4 items-center justify-between w-[300px]">
            <div className="flex flex-row">
              <img className="h-10 w-10 rounded-full" src={user.imageUrlString ?? ''} alt="" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.availableRoles.join(', ')}</p>
              </div>
            </div>
            <div className="text-sm text-blue-600">0/8 weeks</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
