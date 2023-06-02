import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import UsersPageContent from '../components/UsersPageContent'

const UsersPage = () => {
  return <LayoutCommon currentPage={'users'} mainContent={UsersPageContent()} />
}

export default withRequireAuth(UsersPage)
