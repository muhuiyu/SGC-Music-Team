import Service from '../../../models/service/Service'

interface Props {
  services: Service[]
}

function UpcomingServiceCard(service: Service) {
  return <div>something</div>
}

export default function UpcomingServicesView({ services }: Props) {
  return (
    <div className="w-4/5 pr-8">
      <div className="text-xl pb-4">Upcoming services</div>
      <div className="flex flex-col gap-3 rounded-lg">
        {services.map((service) => (
          <div>
            <div className="bg-white p-4">{service.dateTime.toISODate()}</div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
