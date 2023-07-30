import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'

import DashboardPageContent from '../components/DashboardPageContent'

const DashboardPage = () => {
  return <LayoutCommon currentPage={'dashboard'} mainContent={<DashboardPageContent />} />
}

export default withRequireAuth(DashboardPage)
