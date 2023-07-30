import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import AvailabilityPageContent from '../components/AvailabilityPageContent'

const availabilityPage = () => {
  return <LayoutCommon currentPage={'availability'} mainContent={<AvailabilityPageContent />} />
}

export default withRequireAuth(availabilityPage)
