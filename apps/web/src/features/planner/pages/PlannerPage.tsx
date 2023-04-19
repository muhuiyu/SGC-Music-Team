import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { services, testUser, users } from '../../../mock/MockData'
import PlannerTable from '../components/PlannerTable'
import PlannerYearMonthsFilter from '../components/PlannerYearMonthsFilter'

const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()

export default function PlannerPage() {
  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(
    new Date().getMonth() % 2 ? [thisMonth, thisMonth + 1] : [thisMonth - 1, thisMonth],
  )

  const allServiceDays = useMemo(() => {
    let firstSunday = DateTime.fromObject({ year: selectedYear, month: months[0], day: 1 })
    while (firstSunday.weekday !== 7) {
      firstSunday = firstSunday.plus({ day: 1 })
    }
    const allSundays: DateTime[] = []
    while (firstSunday.month <= months[1]) {
      allSundays.push(firstSunday)
      firstSunday = firstSunday.plus({ week: 1 })
    }
    return allSundays
  }, [selectedYear, months[0], months[1]])

  return (
    <div className="flex flex-row flex-1 h-full">
      <SideBar
        currentPage="planner"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1 overflow-x-clip">
        <NavBar title="Planner" user={testUser} />
        <PlannerYearMonthsFilter
          selectedYear={selectedYear}
          thisYear={thisYear}
          thisMonth={thisMonth}
          months={months}
          onChangeYear={(year) => setYear(year)}
          onChangeMonths={(months) => setMonths(months)}
        />
        {/* planner view */}
        <div className="flex flex-row pt-8">
          {/* <PlannerUserList users={users} /> */}
          <PlannerTable users={users} services={services} />
        </div>
      </main>
    </div>
  )
}
