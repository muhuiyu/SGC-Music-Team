import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import ServiceListPageContent from '../components/ServiceListPageContent'

const ServiceListPage = () => {
  return <LayoutCommon currentPage={'serviceList'} mainContent={ServiceListPageContent()} />
}

export default withRequireAuth(ServiceListPage)
