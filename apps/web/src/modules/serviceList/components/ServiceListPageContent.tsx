import classNames from 'classnames'
import { useEffect, useState } from 'react'
import useAllServices from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import { getCurrentMonths, thisYear } from '../../../helpers/DateHelpers'
import Service, { emptyService, morningServiceTime } from '../../../models/service/Service'
import YearMonthsFilter from '../../common/components/YearMonthsFilter'
import AddServiceModal from './AddServiceModal'
import ServiceEmptyView from './ServiceEmptyView'
import ServiceListTable from './ServiceListTable'

export default function ServiceListPageContent() {
  const [selectedYear, setYear] = useState(thisYear)
  const [isShowingAddServiceModal, setShowingAddServiceModal] = useState(false)
  const [currentEditingService, setCurrentEditingService] = useState<Service | null>(null)
  const [months, setMonths] = useState<[number, number]>(getCurrentMonths())
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
    <YearMonthsFilter
      selectedYear={selectedYear}
      thisYear={thisYear}
      months={months}
      onChangeYear={(year) => setYear(year)}
      onChangeMonths={(months) => setMonths(months)}
    />
  )
  return (
    <div className="flex flex-col gap-4">
      <TableHeader
        title="Services"
        buttonText={services.length === 0 ? '' : 'Add service'}
        onClickButton={() => {
          setCurrentEditingService(emptyService)
          setShowingAddServiceModal(true)
        }}
        filterElement={filter}
      />
      {/* planner view */}
      {services.length === 0 ? (
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
