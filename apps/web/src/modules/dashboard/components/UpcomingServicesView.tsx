import { getMonthString } from '../../../helpers/DateHelpers'
import Service, { getFormattedLocalTimeString } from '../../../models/service/Service'
import User from '../../../models/user/User'
import { Song } from '../../../models/song/Song'
import _ from 'lodash'

interface Props {
  services: Service[]
  users: User[]
  songDictionary: { [id: Song['id']]: Song }
  onClickView(serviceId: Service['id']): void
}

export default function UpcomingServicesView({
  services,
  users,
  songDictionary,
  onClickView,
}: Props) {
  return (
    <div className="w-4/5 pr-8">
      <div className="text-xl pb-4">Upcoming services</div>
      <div className="flex flex-col gap-3 rounded-lg">
        {services.map((service) => (
          <UpcomingServiceCard
            key={service.id}
            {...{ service, users, songDictionary, onClickView }}
          />
        ))}
      </div>
    </div>
  )
}

const UpcomingServiceCard = (props: {
  service: Service
  users: User[]
  songDictionary: { [id: Song['id']]: Song }
  onClickView(serviceId: Service['id']): void
}) => {
  const { service, users, songDictionary, onClickView } = props
  const leadUser: User | undefined = users.filter((user) => user.id === service.lead)[0]

  const songsJoinedText = (): string => {
    if (_.isEmpty(service.songs)) return 'TBD'
    const string = service.songs
      .map((serviceSong) => songDictionary[serviceSong.songId].name)
      .join(', ')
    return string
  }

  return (
    <div className="bg-white p-6 flex flex-row gap-4" onClick={() => onClickView(service.id)}>
      <div className="flex flex-col items-center pr-6 border-r-2">
        <div className="text-xs">{getMonthString(service.dateTime.month)}</div>
        <div className="text-lg">{service.dateTime.day}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium text-lg">{getFormattedLocalTimeString(service.dateTime)}</div>
        <div>{service.topic}</div>
        <div className="text-md text-slate-500">
          Lead: {leadUser === undefined ? 'TBD' : leadUser.firstName + ' ' + leadUser.lastName}
        </div>
        <div className="text-md text-slate-500">Songs: {songsJoinedText()}</div>
      </div>
    </div>
  )
}