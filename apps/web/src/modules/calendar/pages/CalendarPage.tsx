import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import CalenderPageContent from '../components/CalenderPageContent'

const CalendarPage = () => {
  return <LayoutCommon currentPage={'calendar'} mainContent={<CalenderPageContent />} />
}

export default withRequireAuth(CalendarPage)
