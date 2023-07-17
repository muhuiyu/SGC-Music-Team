import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import Service from '../../../models/service/Service'
import Spinner from '../../common/components/Spinner'
import ServiceListRow from './ServiceListRow'

interface Props {
  services: Service[]
  isLoading: boolean
  onRequestEdit(service: Service): void
}

const headers = [
  {
    name: 'Date',
    key: 'date',
  },
  {
    name: 'Topic',
    key: 'topic',
  },
]

export default function ServiceListTable({ services, onRequestEdit, isLoading }: Props) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<Service['id'][]>([])

  const areAllServicesSelected = useMemo(() => {
    return _.isEmpty(_.difference(_.map(services, 'id'), selectedServiceIds))
  }, [selectedServiceIds, services])

  return (
    <>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <div className="relative">
                {selectedServiceIds.length > 0 && (
                  <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full divide-y divide-gray-300">
                  {/* table header */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={areAllServicesSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServiceIds(_.map(services, 'id'))
                            } else {
                              setSelectedServiceIds([])
                            }
                          }}
                        />
                      </th>
                      {headers.map((header) => (
                        <th
                          key={header.key}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 sm:pl-6
                            text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {header.name}
                        </th>
                      ))}

                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {services.map((service) => (
                      <ServiceListRow
                        key={service.id}
                        service={service}
                        selected={selectedServiceIds.includes(service.id)}
                        onUpdateSelection={(selected) => {
                          setSelectedServiceIds(
                            produce((draft) => {
                              if (selected) {
                                draft.push(service.id)
                              } else {
                                _.pull(draft, service.id)
                              }
                            }),
                          )
                        }}
                        onRequestEdit={() => onRequestEdit(service)}
                      />
                    ))}
                  </tbody>
                </table>
                {/* Loading */}
                <div
                  className={classNames(
                    'absolute inset-0 flex justify-center items-center text-center',
                    {
                      hidden: !isLoading,
                    },
                  )}
                >
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
