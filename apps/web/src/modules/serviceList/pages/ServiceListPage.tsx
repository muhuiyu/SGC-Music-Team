import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import ServiceListPageContent from '../components/ServiceListPageContent'

const ServiceListPage = () => {
  return <LayoutCommon currentPage={'serviceList'} mainContent={ServiceListPageContent()} />
}

export default withRequireAuth(ServiceListPage)
