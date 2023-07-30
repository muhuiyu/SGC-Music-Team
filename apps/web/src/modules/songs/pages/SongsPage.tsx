import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import SongPageContent from '../components/SongPageContent'

const SongPage = () => {
  return <LayoutCommon currentPage={'songs'} mainContent={<SongPageContent />} />
}

export default withRequireAuth(SongPage)
