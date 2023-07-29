import _ from 'lodash'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import TagLabel from '../../common/components/TagLabel'

interface Props {
  service: Service
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onRequestEdit(): void
}

export default function ServiceListRow({ service, selected = false, onUpdateSelection, onRequestEdit }: Props) {
  return (
    <tr key={service.id}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={service.id}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {getFormattedLocalString(service.dateTime)}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div>
          {_.isEmpty(service.title) ? '-' : service.title}
          {service.hasCommunion && <TagLabel title="Communion service" />}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {_.isEmpty(service.theme) ? '-' : service.theme}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {_.isEmpty(service.readings) ? '-' : service.readings}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {_.isEmpty(service.preacher) ? '-' : service.preacher}
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <a
          onClick={() => {
            onRequestEdit()
          }}
          className="text-primary hover:text-indigo-900"
        >
          Edit<span className="sr-only">, {service.id}</span>
        </a>
      </td>
    </tr>
  )
}
