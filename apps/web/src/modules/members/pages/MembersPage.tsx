import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import MembersPageContent from '../components/MembersPageContent'

const MemberPage = () => {
  return <LayoutCommon currentPage={'members'} mainContent={MembersPageContent()} />
}

export default withRequireAuth(MemberPage)
