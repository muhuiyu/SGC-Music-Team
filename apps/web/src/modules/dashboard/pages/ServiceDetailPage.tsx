import LayoutCommon from '../../../app/LayoutCommon'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import ServiceDetailPageContent from '../components/ServiceDetailPageContent'
import { useParams } from 'react-router-dom'

const ServiceDetailPage = () => {
  const { id: serviceId } = useParams()
  if (serviceId === undefined) {
    return null
  }
  return (
    <LayoutCommon
      currentPage={'serviceDetail'}
      mainContent={<ServiceDetailPageContent {...{ serviceId }} />}
    />
  )
}

export default withRequireAuth(ServiceDetailPage)
