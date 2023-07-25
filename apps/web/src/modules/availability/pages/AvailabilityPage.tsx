import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import AvailabilityPageContent from '../components/AvailabilityPageContent'

const availabilityPage = () => {
  return <LayoutCommon currentPage={'availability'} mainContent={<AvailabilityPageContent />} />
}

export default withRequireAuth(availabilityPage)
