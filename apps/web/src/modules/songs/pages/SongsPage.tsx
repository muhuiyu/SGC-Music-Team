import { withRequireAuth } from '../../../api/auth/RequireAuth'
import LayoutCommon from '../../../app/LayoutCommon'
import SongPageContent from '../components/SongPageContent'

const SongPage = () => {
  return <LayoutCommon currentPage={'songs'} mainContent={SongPageContent()} />
}

export default withRequireAuth(SongPage)
