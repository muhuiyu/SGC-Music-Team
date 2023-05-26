import { useState } from 'react'
import useAllAvailability from '../../../api/providers/useAllAvailability'
import useAllServices, { getCurrentServiceYearMonths } from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import { Availability } from '../../../models/service/Availability'
import { morningServiceTime } from '../../../models/service/Service'
import AvailabilitySurveyModal from './AvailabilitySurveyModal'
import CalendarView from './CalendarView'

export default function DashboardPageContent() {
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(true)
  // for testing, later we will connect to useNotifications

  console.log(getCurrentServiceYearMonths())

  const { allServiceDates, isFetching } = useAllServices(
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
    <div className="m-1 flex flex-row justify-between">
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
      <CalendarView />
    </div>
  )
}
