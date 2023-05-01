import { useState } from 'react'
import { withRequireAuth } from '../../../api/auth/Auth'
import useAllServices from '../../../api/providers/useAllServices'
import useAllUsers from '../../../api/providers/useAllUsers'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { morningServiceTime } from '../../../models/service/Service'
import YearMonthsFilter from '../../common/components/YearMonthsFilter'
import PlannerEmptyView from '../components/PlannerEmptyView'
import PlannerTable from '../components/PlannerTable'

const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()

const PlannerPage = () => {
  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()
  const { currentUser } = useCurrentUser()

  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(
    new Date().getMonth() % 2 ? [thisMonth, thisMonth + 1] : [thisMonth - 1, thisMonth],
  )

  const { services, isLoading: isGetServicesLoading } = useAllServices(
    {
      year: selectedYear,
      startMonth: months[0],
      endMonth: months[1],
    },
    morningServiceTime,
  )

  return (
    <div className="flex flex-row flex-1 h-full">
      <SideBar
        currentPage="planner"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1 overflow-x-clip">
        <NavBar currentPage="planner" user={currentUser} />
        <YearMonthsFilter
          selectedYear={selectedYear}
          thisYear={thisYear}
          thisMonth={thisMonth}
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
      </main>
    </div>
  )
}

export default withRequireAuth(PlannerPage)
