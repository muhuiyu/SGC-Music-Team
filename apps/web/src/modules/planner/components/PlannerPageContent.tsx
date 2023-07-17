import { useEffect, useState } from 'react'
import useAllServicesWithFilter from '../../../api/providers/useAllServicesWithFilter'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import { getCurrentMonths, thisYear } from '../../../helpers/DateHelpers'
import Service, { HourMinute, morningServiceTime } from '../../../models/service/Service'
import YearMonthsTimeFilter from '../../common/components/YearMonthsFilter'
import PlannerEmptyView from './PlannerEmptyView'
import PlannerTable from './PlannerTable'

import User, { UserRole } from '../../../models/user/User'
import useUpdateService from '../../../api/providers/useUpdateService'

export default function PlannerPageContent() {
  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()
  const { currentUser } = useCurrentUser()

  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(getCurrentMonths())

  const [time, setTime] = useState<HourMinute>(morningServiceTime)
  const { services } = useAllServicesWithFilter(
    {
      year: selectedYear,
      startMonth: months[0],
      endMonth: months[1],
    },
    time,
  )

  const { updateServiceUserAssignment, updateServiceLead } = useUpdateService()

  const onChangeUserAssignment = (
    serviceId: Service['id'],
    userId: User['id'],
    role: UserRole | undefined,
  ) => {
    updateServiceUserAssignment(serviceId, userId, role)
  }

  const onChangeLead = (serviceId: Service['id'], userId: User['id'] | undefined) => {
    updateServiceLead(serviceId, userId)
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <YearMonthsTimeFilter
        selectedYear={selectedYear}
        thisYear={thisYear}
        months={months}
        selectedTime={time}
        onChangeYear={(year) => setYear(year)}
        onChangeMonths={(months) => setMonths(months)}
        onChangeTime={(time) => setTime(time)}
      />
      {/* planner view */}
      {services.length != 0 ? (
        <PlannerTable
          {...{
            users,
            isLoading: isGetAllUsersLoading,
            services,
            onChangeUserAssignment,
            onChangeLead,
          }}
        />
      ) : (
        <PlannerEmptyView />
      )}
    </div>
  )
}
