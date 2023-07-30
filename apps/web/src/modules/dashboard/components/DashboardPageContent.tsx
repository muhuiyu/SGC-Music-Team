import classNames from 'classnames'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAllAvailability from '../../../hooks/useAllAvailability'
import useAllServicesWithFilter, { getCurrentServiceYearMonths } from '../../../hooks/useAllServicesWithFilter'
import useAllSongs from '../../../hooks/useAllSongs'
import useAllUsers from '../../../hooks/useAllUsers'
import useAuth from '../../../hooks/useAuth'
import useUpdateAvailability from '../../../hooks/useUpdateAvailability'
import { pageInfo } from '../../../models/common/AppPage'
import { Availability } from '../../../models/service/Availability'
import Service, { isUserOnDuty, morningServiceTime } from '../../../models/service/Service'
import { pageContentDashboardDivStyle } from '../../common/styles/ComponentStyles'
import AvailabilitySurveyModal from './AvailabilitySurveyModal'
import CalendarView from './CalendarView'
import DashboardNotification from './DashboardNotification'
import UpcomingServicesView from './UpcomingServicesView'

export default function DashboardPageContent() {
  // Availability notification
  // Availability survey will be displayed one month ahead from the next cycle (on even month number)
  // TODO: change to == 0
  const shouldShowAvailabilitySurveyNotification = DateTime.now().month % 2 == 1
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(false)

  // for testing, later we will connect to useNotifications

  const { allServiceDates, services } = useAllServicesWithFilter(getCurrentServiceYearMonths(), morningServiceTime)

  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()
  const { songs, generateSongDictionary } = useAllSongs({
    order: 'name',
  })

  const { user } = useAuth()
  const { availabilities, isLoading } = useAllAvailability(user?.id ?? null, allServiceDates)
  const { updateAvailability } = useUpdateAvailability()

  const getUpcomingServices = () => {
    return services
      .filter((service) => service.dateTime >= DateTime.now())
      .filter((service) => isUserOnDuty(service, user?.id ?? ''))
  }

  const onSubmitAvailabilitySurvey = (responses: Availability[]) => {
    setShowingAvailabilitySurveryModal(false)
    responses.forEach((response) => {
      updateAvailability(response.id, {
        ...response,
        availabilityState: response.availabilityState === 'unknown' ? 'no' : response.availabilityState,
      })
    })
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingAvailabilitySurveryModal(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const navigate = useNavigate()
  const onClickView = (serviceId: Service['id']) => {
    navigate(`${pageInfo.serviceDetail.href}/${serviceId}`)
  }

  return (
    <>
      <div className={pageContentDashboardDivStyle}>
        <div className="flex flex-col flex-1">
          {shouldShowAvailabilitySurveyNotification && (
            <DashboardNotification
              onClickButton={() => {
                setShowingAvailabilitySurveryModal(true)
              }}
            />
          )}
          <UpcomingServicesView
            {...{
              services: getUpcomingServices(),
              users,
              songDictionary: generateSongDictionary(),
              onClickView,
            }}
          />
        </div>
        <CalendarView {...{ services }} />
      </div>
      {/* availability modal */}
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingAvailabilitySurveryModal },
        )}
      >
        <AvailabilitySurveyModal
          {...{
            isShowingAvailabilitySurveryModal,
            isFetching: isLoading,
            responses: availabilities,
            onSubmit: onSubmitAvailabilitySurvey,
          }}
          onDismiss={() => {
            setShowingAvailabilitySurveryModal(false)
          }}
        />
      </div>
    </>
  )
}
