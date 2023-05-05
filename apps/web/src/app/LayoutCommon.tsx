import useCurrentUser from '../api/providers/useCurrentUser'
import { AppPage } from '../models/common/AppPage'
import FooterBar from './FooterBar'
import NavigationBar from './NavigationBar'
import SideBar from './SideBar'

interface Props {
  currentPage: AppPage
  mainContent: JSX.Element
}

export default function LayoutCommon({ currentPage, mainContent }: Props) {
  const { currentUser: user } = useCurrentUser()
  return (
    <div className="p-8 flex flex-col">
      <NavigationBar {...{ currentPage, user }} />
      <div className="flex flex-row flex-1 h-full overflow-x-scroll">
        <SideBar currentPage={currentPage} onUpdateSelection={() => {}} />
        <main className="p-8 flex flex-col flex-1">
          <div className="flex overflow-hidden">
            <div className="relative w-full h-full overflow-y-auto min-h-screen">{mainContent}</div>
          </div>
          <FooterBar />
        </main>
      </div>
    </div>
  )
}
