import { useState } from 'react'
import { withRequireAuth } from '../../../api/auth/Auth'
import useAllAvailability from '../../../api/providers/useAllAvailability'
import useAllServices from '../../../api/providers/useAllServices'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { Availability } from '../../../models/service/Availability'
import { morningServiceTime } from '../../../models/service/Service'
import AvailabilitySurveyModal from '../components/AvailabilitySurveyModal'

// use current year and next month
const thisYear = new Date().getFullYear()
// const thisMonth = new Date().getMonth()
const thisMonth = 5

const DashboardPage = () => {
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(true)
  // for testing, later we will connect to useNotifications

  const { allServiceDates, isFetching } = useAllServices(
    {
      year: 2023,
      startMonth: 3,
      endMonth: 4,
    },
    morningServiceTime,
  )

  const { currentUser } = useCurrentUser()
  const { availabilities, addAvailability, isLoading } = useAllAvailability(
    currentUser?.id ?? '',
    allServiceDates,
  )

  const onSubmitAvailabilitySurvey = (response: Availability[]) => {
    addAvailability(response)
    console.log(response)
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
      </main>
    </div>
  )
}

export default withRequireAuth(DashboardPage)
