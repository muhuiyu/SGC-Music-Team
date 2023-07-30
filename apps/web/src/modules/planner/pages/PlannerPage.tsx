import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import PlannerPageContent from '../components/PlannerPageContent'

const PlannerPage = () => {
  return <LayoutCommon currentPage={'planner'} mainContent={<PlannerPageContent />} />
}

export default withRequireAuth(PlannerPage)
