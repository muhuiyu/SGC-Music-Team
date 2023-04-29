import { IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
import produce from 'immer'
import { useMemo, useState } from 'react'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import User from '../../../models/user/User'

interface Props {
  service: Service
  editing: boolean
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onRequestEdit(): void
  onCommitEdit(details: Partial<User>): void
  onCancelEdit(): void
}

export default function ServiceListRow({
  service,
  editing,
  selected = false,
  onUpdateSelection,
  onRequestEdit,
  onCommitEdit,
  onCancelEdit,
}: Props) {
  const [editingService, setEditingService] = useState<Partial<Service>>({})

  const resolvedService = useMemo(
    () => ({
      ...service,
      ...editingService,
    }),
    [service, editingService],
  )

  const updateServiceDetail = <K extends keyof Omit<Service, 'id'>>(key: K, value: Service[K]) => {
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

  return (
    <tr key={resolvedService.id}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={resolvedService.id}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {editing ? (
          <input
            type="text"
            name="topic"
            value={resolvedService.topic}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeServiceDetail('topic')}
          />
        ) : (
          resolvedService.topic
        )}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {/* {editing ? <div>something</div> : (resolvedService.dateTime)} */}
        {/* <>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            datepicker
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </> */}
        {getFormattedLocalString(resolvedService.dateTime)}
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {editing ? (
          <div className="flex flex-row">
            <IconButton
              aria-label="cancel"
              onClick={() => {
                onCancelEdit()
                setEditingService({})
              }}
              color="secondary"
            >
              <Close />
            </IconButton>
            <IconButton
              size="small"
              aria-label="save"
              onClick={() => {
                onCommitEdit(editingService)
                setEditingService({})
              }}
              color="primary"
            >
              <Check />
            </IconButton>
          </div>
        ) : (
          <a
            onClick={() => {
              onRequestEdit()
            }}
            className="text-primary hover:text-indigo-900"
          >
            Edit<span className="sr-only">, {resolvedService.id}</span>
          </a>
        )}
      </td>
    </tr>
  )
}
