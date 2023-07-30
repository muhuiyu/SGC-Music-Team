import { useState } from 'react'
import useAllServicesWithFilter from '../../../hooks/useAllServicesWithFilter'
import useAllUsers from '../../../hooks/useAllUsers'
import Service, { HourMinute, morningServiceTime } from '../../../models/service/Service'
import YearMonthsTimeFilter from '../../common/components/YearMonthsFilter'
import { getCurrentMonths, thisYear } from '../../common/helpers/DateHelpers'
import PlannerEmptyView from './PlannerEmptyView'
import PlannerTable from './PlannerTable'

import classNames from 'classnames'
import useUpdateService from '../../../hooks/useUpdateService'
import { pageContentDivStyle } from '../../common/styles/ComponentStyles'

export default function PlannerPageContent() {
  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()

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

  const { updateService } = useUpdateService()

  const onUpdateService = (service: Service) => {
    updateService(service.id, service)
  }

  return (
    <div className={classNames(pageContentDivStyle, 'h-full')}>
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
            onUpdateService,
          }}
        />
      ) : (
        <PlannerEmptyView />
      )}
    </div>
  )
}
