import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import PlannerPageContent from '../components/PlannerPageContent'

const PlannerPage = () => {
  return <LayoutCommon currentPage={'planner'} mainContent={PlannerPageContent()} />
}

export default withRequireAuth(PlannerPage)
