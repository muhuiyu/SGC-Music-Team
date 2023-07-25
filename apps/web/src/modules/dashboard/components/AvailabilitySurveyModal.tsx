import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { Availability, AvailabilityState } from '../../../models/service/Availability'
import { getFormattedLocalString } from '../../../models/service/Service'
import Spinner from '../../common/components/Spinner'

interface Props {
  isShowingAvailabilitySurveryModal: boolean
  isFetching: boolean
  responses: Availability[]
  onSubmit(responses: Availability[]): void
  onDismiss(): void
  className?: string
}

const responseOptions: { key: AvailabilityState; title: string }[] = [
  {
    key: 'yes',
    title: 'Yes',
  },
  {
    key: 'no',
    title: 'No',
  },
  {
    key: 'unknown',
    title: 'Not sure',
  },
]

export default function AvailabilitySurveyModal({
  isShowingAvailabilitySurveryModal,
  isFetching,
  responses,
  onSubmit,
  onDismiss,
  className,
}: Props) {
  const [editedResponses, setEditedResponses] = useState<{ [key: number]: Availability }>({})

  const currentResponses = useMemo(() => {
    return responses.map((response) => {
      const miliSeconds = response.dateTime.toMillis()
      if (!miliSeconds || !editedResponses[miliSeconds]) {
        return response
      }
      return { ...response, ...editedResponses[miliSeconds] }
    })
  }, [responses, editedResponses])

  const onChangeAvailability = (dateTime: DateTime, value: AvailabilityState) => {
    const miliSeconds = dateTime.toMillis()
    if (!miliSeconds) return
    setEditedResponses(
      produce((draft) => {
        draft[miliSeconds] = {
          ...(draft[miliSeconds] ?? {}),
          availabilityState: value,
        }
      }),
    )
  }

  const onChangeNote = (dateTime: DateTime, value: string) => {
    const miliSeconds = dateTime.toMillis()
    if (!miliSeconds) return
    setEditedResponses(
      produce((draft) => {
        draft[miliSeconds] = {
          ...(draft[miliSeconds] ?? {}),
          note: value,
        }
      }),
    )
  }

  return (
    <div
      className={classNames(
        'relative w-full max-w-lg max-h-full',
        {
          hidden: !isShowingAvailabilitySurveryModal,
        },
        className,
      )}
    >
      <div className="relative bg-white rounded-lg shadow ">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon className="absolute top-8 right-6" width={24} height={24} onClick={onDismiss} />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Edit Availbility</h3>
          </div>
          <p className="text-md font-normal text-gray-500 pt-4 pb-8">Select all the time you're available to serve</p>
          {isFetching ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-4">
              {currentResponses.map((response) => (
                <div className="flex flex-row items-center" key={response.dateTime.toSeconds()}>
                  <input
                    type="checkbox"
                    size={16}
                    defaultChecked={response.availabilityState === 'yes'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChangeAvailability(response.dateTime, 'yes')
                      } else {
                        onChangeAvailability(response.dateTime, 'no')
                      }
                    }}
                  />
                  <div className="font-bold w-36 pl-4">
                    {getFormattedLocalString(response.dateTime, 'MMM dd, yyyy')}
                  </div>
                  <input
                    type="text"
                    placeholder="Add note..."
                    value={response.note}
                    className="bg-gray-100 rounded-md text-sm flex-1 p-2"
                    onChange={(e) => {
                      onChangeNote(response.dateTime, e.target.value)
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between gap-4 pt-8">
            <button
              key="reset"
              type="reset"
              className="w-1/2 text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                onDismiss()
              }}
            >
              Cancel
            </button>
            <button
              key="submit"
              type="button"
              className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSubmit(currentResponses)
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
