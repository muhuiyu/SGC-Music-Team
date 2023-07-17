import classNames from 'classnames'
import { useState } from 'react'
import useAllAvailability from '../../../api/providers/useAllAvailability'
import useAllServicesWithFilter, {
  getCurrentServiceYearMonths,
} from '../../../api/providers/useAllServicesWithFilter'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import { Availability } from '../../../models/service/Availability'
import Service, { isUserOnDuty, morningServiceTime } from '../../../models/service/Service'
import AvailabilitySurveyModal from './AvailabilitySurveyModal'
import CalendarView from './CalendarView'
import UpcomingServicesView from './UpcomingServicesView'
import useAllUsers from '../../../api/providers/useAllUsers'
import useAllSongs from '../../../api/providers/useAllSongs'
import { useNavigate } from 'react-router-dom'
import { pageInfo } from '../../../models/common/AppPage'

export default function DashboardPageContent() {
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(false)
  // for testing, later we will connect to useNotifications

  const { allServiceDates, services } = useAllServicesWithFilter(
    getCurrentServiceYearMonths(),
    morningServiceTime,
  )

  const { users, isLoading: isGetAllUsersLoading } = useAllUsers()
  const { songs, generateSongDictionary } = useAllSongs({
    order: 'name',
  })

  const { currentUser } = useCurrentUser()
  const { availabilities, addAvailability, isLoading } = useAllAvailability(
    currentUser?.id ?? null,
    allServiceDates,
  )

  const getUpcomingServices = () => {
    return services.filter((service) => isUserOnDuty(service, currentUser?.id ?? ''))
  }

  const onSubmitAvailabilitySurvey = (responses: Availability[]) => {
    const updatedResponses = responses.map((response) => ({
      dateTime: response.dateTime,
      availabilityState:
        response.availabilityState == 'unknown' ? 'no' : response.availabilityState,
    }))
    addAvailability(updatedResponses)
  }
  const onDismissAvailabilitySurvey = () => {
    // todo
    console.log('dismiss')
  }

  const navigate = useNavigate()
  const onClickView = (serviceId: Service['id']) => {
    navigate(`${pageInfo.serviceDetail.href}/${serviceId}`)
  }

  return (
    <>
      <div className="flex flex-row gap-4 pr-4">
        <UpcomingServicesView
          {...{
            services: getUpcomingServices(),
            users,
            songDictionary: generateSongDictionary(),
            onClickView,
          }}
        />
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
            serviceDateTimes: allServiceDates,
            responses: availabilities,
            onSubmit: onSubmitAvailabilitySurvey,
            onDismiss: onDismissAvailabilitySurvey,
          }}
        />
      </div>
    </>
  )
}
