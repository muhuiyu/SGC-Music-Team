import { withRequireAuth } from '../../api/auth/RequireAuth'
import LayoutCommon from '../../app/LayoutCommon'
import UsersPageContent from '../users/components/UsersPageContent'

const TestPage = () => {
  return <LayoutCommon currentPage={'users'} mainContent={UsersPageContent()} />
}

export default withRequireAuth(TestPage)
