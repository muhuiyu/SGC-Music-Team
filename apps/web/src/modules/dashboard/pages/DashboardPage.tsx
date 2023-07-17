import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import DashboardPageContent from '../components/DashboardPageContent'

const DashboardPage = () => {
  return <LayoutCommon currentPage={'dashboard'} mainContent={<DashboardPageContent />} />
}

export default withRequireAuth(DashboardPage)
