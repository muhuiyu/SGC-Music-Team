import { DateTime } from 'luxon'
import { useState } from 'react'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import { Availability } from '../../../models/service/Availability'
import AvailabilitySurveyModal from '../components/AvailabilitySurveyModal'
import useAllServices from '../../../api/providers/useAllServices'

// use current year and next month
const thisYear = new Date().getFullYear()
// const thisMonth = new Date().getMonth()
const thisMonth = 5

export default function DashboardPage() {
  const [isShowingAvailabilitySurveryModal, setShowingAvailabilitySurveryModal] = useState(true)
  // for testing, later we will connect to useNotifications

  const {services} = useAllServices({})

  const availabilitySurveyDates = [
    DateTime.fromObject({ year: 2023, month: 5, day: 12 }),
    DateTime.fromObject({ year: 2023, month: 5, day: 17 }),
  ]

  const responses = availabilitySurveyDates.map((dateTime) => ({
    dateTime: dateTime,
    isAvailable: false,
  }))

  const onSubmitAvailabilitySurvey = (response: Availability[]) => {
    // todo
    console.log(response)
  }
  const onDismissAvailabilitySurvey = () => {
    // todo
    console.log('dismiss')
  }

  const { currentUser } = useCurrentUser()
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
            serviceDateTimes: availabilitySurveyDates,
            responses,
            onSubmit: onSubmitAvailabilitySurvey,
            onDismiss: onDismissAvailabilitySurvey,
          }}
        />
      </main>
    </div>
  )
}
