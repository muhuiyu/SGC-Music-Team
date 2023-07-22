import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import Service from '../../../models/service/Service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
  isShowingAddServiceModal: boolean
  service: Service
  onSaveService(id: Service['id'], details: Service): void
  onAddService(details: Omit<Service, 'id'>): void
  onRemoveService(id: Service['id']): void
  onDismiss(): void
  className?: string
}

export default function AddServiceModal({
  isShowingAddServiceModal: isShowingAddServiceModal,
  service: service,
  onSaveService,
  onAddService,
  onRemoveService,
  onDismiss,
  className,
}: Props) {
  const [editingService, setEditingService] = useState<Partial<Service>>({})
  const resolvedService = useMemo(
    () => ({
      ...service,
      ...editingService,
    }),
    [service, editingService],
  )

  const clearResolvedService = () => {
    setEditingService({})
  }

  useEffect(() => {
    if (isShowingAddServiceModal) {
      return
    }
    setEditingService({})
  }, [isShowingAddServiceModal])

  const updateServiceDetail = <K extends keyof Service>(key: K, value: Service[K]) => {
    setEditingService(
      produce((draft) => {
        draft[key] = value
      }),
    )
  }

  const onChangeServiceDetail =
    <K extends keyof Omit<Service, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateServiceDetail(key, e.target.value as Service[K])
    }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedService.dateTime)
  }, [resolvedService])

  return (
    <div
      className={classNames(
        'relative w-full max-w-lg max-h-full',
        {
          hidden: !isShowingAddServiceModal,
        },
        className,
      )}
    >
      <div className="relative bg-white rounded-lg shadow ">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={() => {
              clearResolvedService()
              onDismiss()
            }}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
              {service.id === '' ? 'Add service' : 'Edit service'}
            </h3>
          </div>

          <form className="space-y-6 text-left pt-6" action="#">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Alive"
                required
                value={resolvedService.dateTime.toISODate() ?? ''}
                onChange={onChangeServiceDetail('dateTime')}
              />
            </div>
            {/* Time */}
            <div>
              <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 ">
                Date
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Alive"
                required
                value={resolvedService.dateTime.toFormat('HH:mm') ?? ''}
                onChange={onChangeServiceDetail('dateTime')}
              />
            </div>
            {/* title */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Mark 1:1-10"
                required
                value={resolvedService.title}
                onChange={onChangeServiceDetail('title')}
              />
            </div>
            {/* theme */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Theme
              </label>
              <input
                type="text"
                name="theme"
                id="theme"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Mark 1:1-10"
                required
                value={resolvedService.theme}
                onChange={onChangeServiceDetail('theme')}
              />
            </div>
            {/* reading */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Readings
              </label>
              <input
                type="text"
                name="readings"
                id="readings"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Mark 1:1-10"
                required
                value={resolvedService.readings}
                onChange={onChangeServiceDetail('readings')}
              />
            </div>
            {/* preacher */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Preacher
              </label>
              <input
                type="text"
                name="preacher"
                id="preacher"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Pastor Jacob"
                required
                value={resolvedService.preacher}
                onChange={onChangeServiceDetail('preacher')}
              />
            </div>

            <div className="flex justify-between gap-4 pt-8">
              <button
                type="reset"
                className="w-1/4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  // todo: add confirmation
                  onRemoveService(resolvedService.id)
                  clearResolvedService()
                  onDismiss()
                }}
              >
                Delete
              </button>
              <div className="w-1/4"></div>
              <button
                type="reset"
                className="w-1/4 text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  clearResolvedService()
                  onDismiss()
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (resolvedService.id === '') {
                    onAddService(resolvedService)
                  } else {
                    onSaveService(resolvedService.id, resolvedService)
                  }
                  clearResolvedService()
                }}
                disabled={!areDetailsValid}
              >
                {service.id === '' ? 'Add' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
