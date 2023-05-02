import { useState } from 'react'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import useAllAvailability from '../../../api/providers/useAllAvailability'
import useAllServices, { getCurrentServiceYearMonths } from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { Availability } from '../../../models/service/Availability'
import { morningServiceTime } from '../../../models/service/Service'
import AvailabilitySurveyModal from '../components/AvailabilitySurveyModal'
import CalendarView from '../components/CalendarView'

const DashboardPage = () => {
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
    <div className="flex flex-row flex-1 h-full">
      <SideBar
        currentPage="dashboard"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1">
        {/* Navbar */}
        <NavBar currentPage="dashboard" user={currentUser} />
        <div className="flex flex-row justify-between">
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
      </main>
    </div>
  )
}

export default withRequireAuth(DashboardPage)
