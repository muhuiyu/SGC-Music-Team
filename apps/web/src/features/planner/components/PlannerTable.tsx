import Service from '../../../models/Service'
import UserModel from '../../../models/User'
import PlannerTableCell from './PlannerTableCell'

interface Props {
  users: UserModel[]
  services: Service[]
}

export default function PlannerTable(props: Props) {
  const { users, services } = props
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-scroll">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x">
                <th
                  scope="col"
                  className="px-5 py-5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  User
                </th>
                {services.map((item) => (
                  <th
                    scope="col"
                    className="px-5 py-5 text-left text-sm font-semibold text-gray-900 w-30"
                  >
                    {item.dateTime.monthShort} {item.dateTime.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((item, index) => (
                <tr className="divide-x" key={item.email}>
                  {/* user row */}
                  <td className={'whitespace-nowrap px-5 py-5 text-sm sm:pl-0 sticky'}>
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img
                          className="h-11 w-11 rounded-full"
                          src={item.imageUrlString ?? ''}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="mt-1 text-gray-500">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  {services.map((item) => (
                    <PlannerTableCell
                      service={item}
                      user={users[index]}
                      onRequestEdit={undefined}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
