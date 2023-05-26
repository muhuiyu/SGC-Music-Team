import { useState } from 'react'
import useAllServices from '../../../api/providers/useAllServices'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import { getCurrentMonths, thisYear } from '../../../helpers/DateHelpers'
import { morningServiceTime } from '../../../models/service/Service'
import YearMonthsFilter from '../../common/components/YearMonthsFilter'
import PlannerEmptyView from './PlannerEmptyView'
import PlannerTable from './PlannerTable'

export default function PlannerPageContent() {
  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()
  const { currentUser } = useCurrentUser()

  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(getCurrentMonths())

  const { services, isLoading: isGetServicesLoading } = useAllServices(
    {
      year: selectedYear,
      startMonth: months[0],
      endMonth: months[1],
    },
    morningServiceTime,
  )

  return (
    <div className="flex flex-col gap-4 h-full">
      <YearMonthsFilter
        selectedYear={selectedYear}
        thisYear={thisYear}
        months={months}
        onChangeYear={(year) => setYear(year)}
        onChangeMonths={(months) => setMonths(months)}
      />
      {/* planner view */}
      {services.length != 0 ? (
        <PlannerTable {...{ users, isLoading: isGetAllUsersLoading, services }} />
      ) : (
        <PlannerEmptyView />
      )}
    </div>
  )
}
