import useCurrentUser from '../../../api/providers/useCurrentUser'
import UnderConstructionView from '../../common/components/UnderConstructionView'

export default function CalenderPageContent() {
  const { currentUser } = useCurrentUser()
  return (
    <div className="flex flex-col gap-4">
      <UnderConstructionView />
    </div>
  )
}
