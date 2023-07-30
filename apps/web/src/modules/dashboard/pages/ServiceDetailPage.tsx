import { useParams } from 'react-router-dom'
import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import ServiceDetailPageContent from '../components/ServiceDetailPageContent'

const ServiceDetailPage = () => {
  const { id: serviceId } = useParams()
  if (serviceId === undefined) {
    return null
  }
  return <LayoutCommon currentPage={'serviceDetail'} mainContent={<ServiceDetailPageContent {...{ serviceId }} />} />
}

export default withRequireAuth(ServiceDetailPage)
