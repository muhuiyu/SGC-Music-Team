import useCurrentUser from '../../../api/providers/useCurrentUser'

export default function CalenderPageContent() {
  const { currentUser } = useCurrentUser()
  return <div className="flex flex-col gap-4"></div>
}
