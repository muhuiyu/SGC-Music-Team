import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { DateTime, Duration } from 'luxon'
import { useMemo, useState } from 'react'
import Service from '../../../models/service/Service'
import { getMonthName } from '../../common/helpers/DateHelpers'

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    start: '1:00 PM',
    startDatetime: '2022-01-21T13:00',
    end: '2:30 PM',
    endDatetime: '2022-01-21T14:30',
  },
]

const today = new Date()
const todayObject = DateTime.fromObject({
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDay(),
})

interface Props {
  services: Service[]
}

export default function CalendarView({ services }: Props) {
  const [displayingDate, setDisplayingDate] = useState<DateTime>(
    DateTime.fromObject({ year: today.getFullYear(), month: today.getMonth(), day: 1 }),
  )
  const [selectedDate, setSelectedDate] = useState<DateTime>(todayObject)

  const days: DateTime[] = useMemo(() => {
    const days = []
    // if the first day is not sunday, we need to add days from the previous month
    if (displayingDate.weekday !== 7) {
      for (let i = displayingDate.weekday; i > 0; i--) {
        days.push(displayingDate.minus(Duration.fromObject({ day: i })))
      }
    }
    for (let i = 1; i <= (displayingDate.daysInMonth ?? 0); i++) {
      days.push(displayingDate.set({ day: i }))
    }

    const lastDay = displayingDate.plus(Duration.fromObject({ month: 1 })).minus(Duration.fromObject({ day: 1 }))
    // if the last day is not saturday, we need to add days from the next month
    if (lastDay.weekday === 7) {
      for (let i = 1; i < 7; i++) {
        days.push(lastDay.plus(Duration.fromObject({ day: i })))
      }
    } else {
      for (let i = lastDay.weekday; i < 6; i++) {
        days.push(lastDay.plus(Duration.fromObject({ day: i })))
      }
    }
    return days
  }, [displayingDate])

  function isSelected(dateTime: DateTime): boolean {
    return dateTime === selectedDate
  }

  function isToday(dateTime: DateTime): boolean {
    return dateTime === todayObject
  }

  function isCurrentMonth(dateTime: DateTime): boolean {
    return dateTime.month === displayingDate.month
  }

  return (
    <div>
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">
          {getMonthName(displayingDate.month)} {displayingDate.year}
        </h2>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => {
            setDisplayingDate(displayingDate.minus(Duration.fromObject({ months: 1 })))
          }}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => {
            setDisplayingDate(displayingDate.plus(Duration.fromObject({ months: 1 })))
          }}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <div key={day.toISODate() ?? ''} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
            <button
              type="button"
              className={classNames(
                isSelected(day) && 'text-white',
                !isSelected(day) && isToday(day) && 'text-indigo-600',
                !isSelected(day) && !isToday(day) && isCurrentMonth(day) && 'text-gray-900',
                !isSelected(day) && !isToday(day) && !isCurrentMonth(day) && 'text-gray-400',
                isSelected(day) && isToday(day) && 'bg-indigo-600',
                isSelected(day) && !isToday(day) && 'bg-gray-900',
                !isSelected(day) && 'hover:bg-gray-200',
                (isSelected(day) || isToday(day)) && 'font-semibold',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
              )}
              onClick={() => {
                setSelectedDate(day)
              }}
            >
              <time dateTime={day.toISODate() ?? ''}>{day.day}</time>
            </button>
          </div>
        ))}
      </div>
      {/* <section className="mt-12">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Schedule for{' '}
          <time dateTime="2022-01-21">
            {getMonthName(selectedDate.month)} {selectedDate.day}, {selectedDate.year}
          </time>
        </h2>
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
            >
              <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
              <div className="flex-auto">
                <p className="text-gray-900">{meeting.name}</p>
                <p className="mt-0.5">
                  <time dateTime={meeting.startDatetime}>{meeting.start}</time> -{' '}
                  <time dateTime={meeting.endDatetime}>{meeting.end}</time>
                </p>
              </div>
              <Menu
                as="div"
                className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
              >
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ol>
      </section> */}
    </div>
  )
}
