import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import _ from 'lodash'
import { Fragment, useMemo } from 'react'
import { HourMinute, eveningServiceTime, hourMinuteToString, morningServiceTime } from '../../../models/service/Service'
import { monthFormatter } from '../helpers/MonthFormatter'

interface Props {
  selectedYear: number
  thisYear: number
  months: [number, number]
  selectedTime: HourMinute
  onChangeYear(year: number): void
  onChangeMonths(months: [number, number]): void
  onChangeTime(time: HourMinute): void
}

export default function YearMonthsTimeFilter(props: Props) {
  const { selectedYear, thisYear, months, selectedTime, onChangeYear, onChangeMonths, onChangeTime } = props

  const firstDate = useMemo(() => {
    return new Date(`${selectedYear}-${_.padStart(months[0].toString(), 2, '0')}-01`)
  }, [months[0]])

  const secondDate = useMemo(() => {
    return new Date(`${selectedYear}-${_.padStart(months[1].toString(), 2, '0')}-01`)
  }, [months[1]])

  return (
    <div className="flex flex-row justify-start gap-3">
      {/* year */}
      <Menu refName="year" as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedYear}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {_.range(thisYear, thisYear + 2).map((year) => (
                <Menu.Item key={year}>
                  {({ active }) => (
                    <button
                      key={year}
                      value={year}
                      type="submit"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm',
                      )}
                      onClick={() => onChangeYear(year)}
                    >
                      {year}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* months */}
      <Menu refName="months" as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {monthFormatter.format(firstDate)} & {monthFormatter.format(secondDate)}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {_.chunk(_.range(1, 13), 2).map(([firstMonth, secondMonth]) => {
                const firstDate = new Date(`${selectedYear}-${_.padStart(firstMonth.toString(), 2, '0')}-01`)
                const secondDate = new Date(`${selectedYear}-${_.padStart(secondMonth.toString(), 2, '0')}-01`)
                return (
                  <Menu.Item key={`${firstMonth}-${secondMonth}`}>
                    {({ active }) => (
                      <button
                        type="submit"
                        key={`${firstMonth}_${secondMonth}`}
                        value={`${firstMonth}_${secondMonth}`}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm',
                        )}
                        onClick={() => {
                          onChangeMonths([firstMonth, secondMonth])
                        }}
                      >
                        {monthFormatter.format(firstDate)} & {monthFormatter.format(secondDate)}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* time */}
      <Menu refName="year" as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {hourMinuteToString(selectedTime)}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {[morningServiceTime, eveningServiceTime].map((time) => (
                <Menu.Item key={`${time.hour}-${time.minute}`}>
                  {({ active }) => (
                    <button
                      key={`${time.hour}-${time.minute}`}
                      value={hourMinuteToString(time)}
                      type="submit"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm',
                      )}
                      onClick={() => onChangeTime(time)}
                    >
                      {hourMinuteToString(time)}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
