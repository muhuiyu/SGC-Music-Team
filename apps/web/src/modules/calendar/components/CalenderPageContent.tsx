import useCurrentUser from '../../../api/providers/useCurrentUser'
import UnderConstructionView from '../../common/components/UnderConstructionView'
import { pageContentDivStyle } from '../../common/styles/ComponentStyles'

export default function CalenderPageContent() {
  const { currentUser } = useCurrentUser()
  return (
    <div className={pageContentDivStyle}>
      <UnderConstructionView />
    </div>
  )
}
