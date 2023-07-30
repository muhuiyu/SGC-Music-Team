import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import UsersPageContent from '../components/UsersPageContent'

const UsersPage = () => {
  return <LayoutCommon currentPage={'users'} mainContent={<UsersPageContent />} />
}

export default withRequireAuth(UsersPage)
