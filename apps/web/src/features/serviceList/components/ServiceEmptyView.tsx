import { DateTime } from 'luxon'
import { getFormattedLocalString } from '../../../models/service/Service'

interface Props {
  allSundays: DateTime[]
  populateDefaultServices(): void
}

export default function ServiceEmptyView({ allSundays: sundays, populateDefaultServices }: Props) {
  return (
    <div className="flex flex-col justify-center relative py-8 px-7 sm:px-6 text-center items-center">
      <span className="text-gray-800">
        There's no data yet, would you like to add default service dates (Sundays)?
      </span>
      <span>This will generate services on</span>
      <ul className="py-4">
        {sundays.map((sunday) => (
          <li>{getFormattedLocalString(sunday)}</li>
        ))}
      </ul>
      <button
        type="button"
        className="block rounded-md w-auto bg-primary px-3 py-1.5 text-center text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={populateDefaultServices}
      >
        Populate services
      </button>
    </div>
  )
}
