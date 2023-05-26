import { withRequireAuth } from '../../api/auth/RequireAuth'
import LayoutCommon from '../../app/LayoutCommon'
import MembersPageContent from '../members/components/MembersPageContent'

const TestPage = () => {
  return <LayoutCommon currentPage={'members'} mainContent={MembersPageContent()} />
}

export default withRequireAuth(TestPage)
