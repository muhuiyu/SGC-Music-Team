import _ from 'lodash'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'

const monthFormatter = Intl.DateTimeFormat('en', { month: 'short' })
const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()

export default function PlannerPage() {
  const [selectedYear, setYear] = useState(thisYear)
  const [months, setMonths] = useState<[number, number]>(
    new Date().getMonth() % 2 ? [thisMonth - 1, thisMonth] : [thisMonth, thisMonth + 1],
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
      <main className="p-8 flex flex-col flex-1">
        <NavBar title="Planner" user={testUser} />

        <div className="flex flex-row justify-end">
          <form>
            <label htmlFor="year">Year</label>
            <select name="year" value={selectedYear}>
              {_.range(thisYear, thisYear + 10).map((year) => (
                <option>{year}</option>
              ))}
            </select>

            <label htmlFor="months">Months</label>
            <select name="months">
              {_.chunk(_.range(1, 13), 2).map(([firstMonth, secondMonth]) => {
                const firstDate = new Date(
                  `${selectedYear}-${_.padStart(firstMonth.toString(), 2, '0')}-01`,
                )
                const secondDate = new Date(
                  `${selectedYear}-${_.padStart(secondMonth.toString(), 2, '0')}-01`,
                )
                return (
                  <option
                    key={`${firstMonth}_${secondMonth}`}
                    value={`${firstMonth}_${secondMonth}`}
                    onChange={() => setMonths([firstMonth, secondMonth])}
                  >
                    {monthFormatter.format(firstDate)} & {monthFormatter.format(secondDate)}
                  </option>
                )
              })}
            </select>
          </form>
        </div>
      </main>
    </div>
  )
}
