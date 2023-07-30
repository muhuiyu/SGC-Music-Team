import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import CalenderPageContent from '../components/CalenderPageContent'

const CalendarPage = () => {
  return <LayoutCommon currentPage={'calendar'} mainContent={<CalenderPageContent />} />
}

export default withRequireAuth(CalendarPage)
