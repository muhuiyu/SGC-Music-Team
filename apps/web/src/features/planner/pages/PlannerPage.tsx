import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
import Service from '../../../models/Service'
import UserModel from '../../../models/User'
import PlannerTable from '../components/PlannerTable'
import PlannerYearMonthsFilter from '../components/PlannerYearMonthsFilter'

const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()

const services: Service[] = [
  {
    id: 'service-1',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 12, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-2',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 19, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 26, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 5, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 10, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 17, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 24, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    duty: {},
    note: 'nothing',
    songNotes: {},
  },
]

const users: UserModel[] = [
  {
    id: 'user-1',
    name: 'Grace Yu',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'James Tomlins',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-1',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    roles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

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
      <main className="p-8 flex flex-col flex-1">
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
