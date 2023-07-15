import classNames from 'classnames'
import { useState } from 'react'
import useAllAvailability from '../../../api/providers/useAllAvailability'
import useAllServices, { getCurrentServiceYearMonths } from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import { Availability } from '../../../models/service/Availability'
import { morningServiceTime } from '../../../models/service/Service'
import AvailabilitySurveyModal from './AvailabilitySurveyModal'
import CalendarView from './CalendarView'
import UpcomingServicesView from './UpcomingServicesView'

export default function DashboardPageContent() {
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(false)
  // for testing, later we will connect to useNotifications

  console.log(getCurrentServiceYearMonths())

  const { allServiceDates, isFetching, services } = useAllServices(
    getCurrentServiceYearMonths(),
    morningServiceTime,
  )

  const { currentUser } = useCurrentUser()
  const { availabilities, addAvailability, isLoading } = useAllAvailability(
    currentUser?.id ?? null,
    allServiceDates,
  )

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

  return (
    <>
      <div className="flex flex-row gap-4">
        <UpcomingServicesView {...{ services }} />
        <CalendarView />
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
