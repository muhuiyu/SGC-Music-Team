import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import SettingsPageContent from '../components/SettingsPageContent'

const SettingsPage = () => {
  return <LayoutCommon currentPage={'settings'} mainContent={<SettingsPageContent />} />
}

export default withRequireAuth(SettingsPage)
