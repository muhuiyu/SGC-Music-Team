import { useParams } from 'react-router-dom'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import UserDetailPageContent from '../components/UserDetailPageContent'

const UserDetailPage = () => {
  const { id: userId } = useParams()
  if (userId === undefined) {
    return null
  }
  return (
    <LayoutCommon
      currentPage={'userDetail'}
      mainContent={<UserDetailPageContent {...{ userId }} />}
    />
  )
}

export default withRequireAuth(UserDetailPage)
