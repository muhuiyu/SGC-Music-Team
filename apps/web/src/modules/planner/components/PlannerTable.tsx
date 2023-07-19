import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Service from '../../../models/service/Service'
import User from '../../../models/user/User'
import Spinner from '../../common/components/Spinner'
import PlannerTableCell from './PlannerTableCell'
import PlannerTableLeadCell from './PlannerTableLeadCell'
import PlannerTableUserCell from './PlannerTableUserCell'

interface Props {
  users: User[]
  services: Service[]
  isLoading: boolean
  onUpdateService(service: Service): void
}

export default function PlannerTable({ users, services, isLoading, onUpdateService }: Props) {
  const [editingLeadService, setEditingLeadService] = useState<Service['id'] | null>(null)
  const [editingUserService, setEditingUserService] = useState<
    [userId: User['id'], serviceId: Service['id']] | null
  >(null)

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setEditingLeadService(null)
        setEditingUserService(null)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  })

  const getUpdatedServiceDetail = <K extends keyof Service>(
    prevService: Service,
    key: K,
    value: Service[K] | ((prevValue: Service[K] | undefined) => Service[K]),
  ) => {
    return {
      ...prevService,
      [key]: typeof value === 'function' ? value(prevService[key]) : value,
    }
  }

  return (
    <div className="mt-8 flow-root overflow-x-scroll overflow-y-scroll h-[900px]">
      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 h-full">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-scroll h-full">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x">
                {/* empty leading cell */}
                <th></th>
                {services.map((item) => (
                  <th
                    key={item.id}
                    scope="col"
                    className="px-5 py-5 text-left text-sm font-semibold text-gray-900 w-[500px]"
                  >
                    {item.dateTime.monthShort} {item.dateTime.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x">
                <td className="whitespace-nowrap px-4 py-5 text-sm font-bold">Music team lead</td>
                {services.map((service) => (
                  <PlannerTableLeadCell
                    key={service.id}
                    users={users}
                    service={service}
                    isEditing={
                      editingUserService === null &&
                      editingLeadService !== null &&
                      editingLeadService === service.id
                    }
                    onStartEditing={() => {
                      setEditingLeadService(service.id)
                      setEditingUserService(null)
                    }}
                    onEndEditing={() => {
                      setEditingLeadService((prev) => {
                        if (prev && prev === service.id) {
                          return null
                        } else {
                          return prev
                        }
                      })
                    }}
                    onChangeLead={(userId) => {
                      const updatedService = getUpdatedServiceDetail(
                        service,
                        'lead',
                        userId === undefined ? '' : userId,
                      )
                      onUpdateService(updatedService)
                    }}
                  />
                ))}
                <td className="whitespace-nowrap px-5 py-5 text-sm font-bold">Music team lead</td>
              </tr>
              {users.map((user, index) => (
                <tr
                  className={classNames('divide-x', index === 0 ? 'divide-y-8' : '')}
                  key={user.email}
                >
                  {/* user row */}
                  <PlannerTableUserCell user={user} shouldAddLeftPadding={false} />
                  {services.map((service) => (
                    <PlannerTableCell
                      key={service.id}
                      service={service}
                      user={users[index]}
                      isEditing={
                        editingUserService !== null &&
                        editingUserService[0] === user.id &&
                        editingUserService[1] === service.id
                      }
                      onStartEditing={() => {
                        setEditingUserService([user.id, service.id])
                        setEditingLeadService(null)
                      }}
                      onEndEditing={() => {
                        setEditingUserService((prev) => {
                          if (prev && prev[0] === user.id && prev[1] === service.id) {
                            return null
                          } else {
                            return prev
                          }
                        })
                      }}
                      onRoleChange={(newRole) => {
                        if (newRole === undefined) {
                          const { [user.id]: _, ...updatedAssignments } = service.assignments
                          const updatedService = getUpdatedServiceDetail(
                            service,
                            'assignments',
                            updatedAssignments,
                          )
                          onUpdateService(updatedService)
                        } else {
                          const updatedAssignments = {
                            ...service.assignments,
                            [user.id]: newRole,
                          }
                          const updatedService = getUpdatedServiceDetail(
                            service,
                            'assignments',
                            updatedAssignments,
                          )
                          onUpdateService(updatedService)
                        }
                      }}
                    />
                  ))}
                  <PlannerTableUserCell user={user} shouldAddLeftPadding={true} />
                </tr>
              ))}
            </tbody>
          </table>
          {/* Loading */}
          <div
            className={classNames('absolute inset-0 flex justify-center items-center text-center', {
              hidden: !isLoading,
            })}
          >
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  )
}
