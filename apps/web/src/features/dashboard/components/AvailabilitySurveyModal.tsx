import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import { DateTime } from 'luxon'
import { useState } from 'react'
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

export default function AvailabilitySurveyModal({
  isShowingAvailabilitySurveryModal,
  isFetching,
  responses,
  onSubmit,
  onDismiss,
  className,
}: Props) {
  const [currentResponses, setCurrentResponses] = useState<Availability[]>(responses)

  const onChangeAvailability = (dateTime: DateTime, value: AvailabilityState) => {
    // todo
    const index = currentResponses.findIndex((e) => e.dateTime == dateTime)
    setCurrentResponses(
      produce((draft) => {
        draft[index] = { dateTime: dateTime, isAvailable: value }
      }),
    )
  }

  // console.log(responses)

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
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={onDismiss}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Edit Availbility</h3>
          </div>
          <p className="text-md font-normal text-gray-500 pt-4 pb-8">
            Select all the time you're available to serve
          </p>
          {isFetching ? (
            <Spinner />
          ) : (
            currentResponses.map((response) => (
              <button
                key={response.dateTime.toISO()}
                type="button"
                className={classNames(
                  'py-2.5 px-5 mr-2 mb-2 text-sm font-medium rounded-lg ',
                  response.isAvailable == 'yes'
                    ? 'text-white bg-blue-700 border border-blue-800 hover:bg-blue-800 '
                    : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ',
                )}
                onClick={() => {
                  if (response.isAvailable === 'no' || response.isAvailable === 'unknown')
                    onChangeAvailability(response.dateTime, 'yes')
                  else if (response.isAvailable === 'yes')
                    onChangeAvailability(response.dateTime, 'no')
                }}
              >
                {getFormattedLocalString(response.dateTime, 'MMM dd, yyyy')}
              </button>
            ))
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
