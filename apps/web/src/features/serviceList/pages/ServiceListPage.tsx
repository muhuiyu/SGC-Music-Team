import { useState } from 'react'
import useAllServices from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import TableHeader from '../../../components/TableHeader'
import { morningServiceTime } from '../../../models/service/Service'
import YearMonthsFilter from '../../common/components/YearMonthsFilter'
import ServiceEmptyView from '../components/ServiceEmptyView'
import ServiceListTable from '../components/ServiceListTable'

const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()

export default function ServiceListPage() {
  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(
    new Date().getMonth() % 2 ? [thisMonth, thisMonth + 1] : [thisMonth - 1, thisMonth],
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
        <NavBar currentPage="serviceList" user={currentUser} />
        <YearMonthsFilter
          selectedYear={selectedYear}
          thisYear={thisYear}
          thisMonth={thisMonth}
          months={months}
          onChangeYear={(year) => setYear(year)}
          onChangeMonths={(months) => setMonths(months)}
        />
        <TableHeader
          title="Services"
          isSearchable={false}
          buttonText="Add service"
          onClickButton={function (): void {
            throw new Error('Function not implemented.')
          }}
          searchQuery={''}
          setSearchQuery={function (searchQuery: string): void {
            throw new Error('Function not implemented.')
          }}
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
