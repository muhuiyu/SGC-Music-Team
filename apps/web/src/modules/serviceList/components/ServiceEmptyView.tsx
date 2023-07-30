import { DateTime } from 'luxon'
import { getFormattedLocalString } from '../../../models/service/Service'
import PrimaryButton from '../../common/components/PrimaryButton'

interface Props {
  allSundays: DateTime[]
  populateDefaultServices(): void
}

export default function ServiceEmptyView({ allSundays: sundays, populateDefaultServices }: Props) {
  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        There's no data yet, would you like to add default service dates (Sundays)?
      </h3>
      <p className="mt-1 pt-4 text-sm text-gray-500">This will generate services on</p>
      <ul className="py-4 text-sm text-gray-500">
        {sundays.map((sunday) => (
          <li key={sunday.toISODate()} className="py-1">
            {getFormattedLocalString(sunday)}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <PrimaryButton
          className="inline-flex items-center"
          title="+ Populate services"
          onClick={populateDefaultServices}
        />
      </div>
    </div>
  )
}
