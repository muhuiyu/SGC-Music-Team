import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import useAllServicesWithFilter from '../../../api/providers/useAllServicesWithFilter'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import { getCurrentMonths, thisYear } from '../../../helpers/DateHelpers'
import Service, {
  HourMinute,
  emptyService,
  morningServiceTime,
} from '../../../models/service/Service'
import YearMonthsTimeFilter from '../../common/components/YearMonthsFilter'
import AddServiceModal from './AddServiceModal'
import ServiceEmptyView from './ServiceEmptyView'
import ServiceListTable from './ServiceListTable'

export default function ServiceListPageContent() {
  const [selectedYear, setYear] = useState(thisYear)
  const [isShowingAddServiceModal, setShowingAddServiceModal] = useState(false)
  const [currentEditingService, setCurrentEditingService] = useState<Service | null>(null)
  const [months, setMonths] = useState<[number, number]>(getCurrentMonths())
  const [time, setTime] = useState<HourMinute>(morningServiceTime)

  const { services, allSundays, populateDefaultServices, isLoading } = useAllServicesWithFilter(
    {
      year: selectedYear,
      startMonth: months[0],
      endMonth: months[1],
    },
    time,
  )

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingAddServiceModal(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  function onRequestEdit(service: Service) {
    setCurrentEditingService(service)
    setShowingAddServiceModal(true)
  }

  const filter = (
    <YearMonthsTimeFilter
      selectedYear={selectedYear}
      thisYear={thisYear}
      months={months}
      selectedTime={time}
      onChangeYear={(year) => setYear(year)}
      onChangeMonths={(months) => setMonths(months)}
      onChangeTime={(time) => setTime(time)}
    />
  )
  return (
    <div className="flex flex-col gap-4">
      <TableHeader
        title="Services"
        buttonText={_.isEmpty(services) ? '' : 'Add service'}
        onClickButton={() => {
          setCurrentEditingService(emptyService)
          setShowingAddServiceModal(true)
        }}
        filterElement={filter}
      />
      {/* planner view */}
      {_.isEmpty(services) ? (
        <ServiceEmptyView {...{ populateDefaultServices, allSundays }} />
      ) : (
        <ServiceListTable {...{ services, onRequestEdit, isLoading }} />
      )}
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingAddServiceModal },
        )}
      >
        <AddServiceModal
          isShowingAddServiceModal={isShowingAddServiceModal}
          service={currentEditingService ?? emptyService}
          onSaveService={() => {}}
          onAddService={() => {}}
          onDismiss={() => {
            setShowingAddServiceModal(false)
            setCurrentEditingService(null)
          }}
        />
      </div>
    </div>
  )
}
