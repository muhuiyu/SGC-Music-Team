import { useState } from 'react'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import useAllServices from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavigationBar from '../../../app/NavigationBar'
import SideBar from '../../../app/SideBar'
import TableHeader from '../../../components/TableHeader'
import { morningServiceTime } from '../../../models/service/Service'
import YearMonthsFilter from '../../common/components/YearMonthsFilter'
import ServiceEmptyView from '../components/ServiceEmptyView'
import ServiceListTable from '../components/ServiceListTable'

const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth() + 1

const ServiceListPage = () => {
  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(
    thisMonth % 2 ? [thisMonth, thisMonth + 1] : [thisMonth - 1, thisMonth],
  )
  const { currentUser } = useCurrentUser()

  // firebase
  const { services, allSundays, updateService, populateDefaultServices, isLoading } =
    useAllServices(
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
        currentPage="serviceList"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1 overflow-x-clip">
        <NavigationBar currentPage="serviceList" user={currentUser} />
        <YearMonthsFilter
          selectedYear={selectedYear}
          thisYear={thisYear}
          months={months}
          onChangeYear={(year) => setYear(year)}
          onChangeMonths={(months) => setMonths(months)}
        />
        <TableHeader
          title="Services"
          isSearchable={false}
          buttonText={services.length === 0 ? '' : 'Add service'}
          onClickButton={() => {}}
          searchQuery={''}
          setSearchQuery={() => {}}
        />
        {/* planner view */}
        {services.length === 0 ? (
          <ServiceEmptyView {...{ populateDefaultServices, allSundays }} />
        ) : (
          <ServiceListTable {...{ services, updateService, isLoading }} />
        )}
      </main>
    </div>
  )
}
export default withRequireAuth(ServiceListPage)
