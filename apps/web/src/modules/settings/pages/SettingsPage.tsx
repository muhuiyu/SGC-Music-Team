import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import SettingsPageContent from '../components/SettingsPageContent'

const SettingsPage = () => {
  return <LayoutCommon currentPage={'settings'} mainContent={<SettingsPageContent />} />
}

export default withRequireAuth(SettingsPage)
