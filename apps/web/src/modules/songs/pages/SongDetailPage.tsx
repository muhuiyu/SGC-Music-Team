import { useParams } from 'react-router-dom'
import { withRequireAuth } from '../../../auth/RequireAuth'
import LayoutCommon from '../../common/components/LayoutCommon'
import SongDetailPageContent from '../components/SongDetailPageContent'

const SongDetailPage = () => {
  const { id: songId } = useParams()
  if (songId === undefined) {
    return null
  }
  return <LayoutCommon currentPage={'songDetail'} mainContent={<SongDetailPageContent {...{ songId }} />} />
}

export default withRequireAuth(SongDetailPage)
