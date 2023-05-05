import useCurrentUser from '../api/providers/useCurrentUser'
import { AppPage } from '../models/common/AppPage'
import FooterSideBar from './FooterSidebar'
import NavBar from './NavBar'
import SideBar from './UpdatedSideBar'

interface Props {
  currentPage: AppPage
  mainContent: JSX.Element
}

export default function LayoutCommon({ currentPage, mainContent }: Props) {
  const { currentUser: user } = useCurrentUser()
  return (
    <div className="flex flex-col bg-gray-50 justify-start">
      <NavBar currentPage={currentPage} user={user} />
      <div className="flex pt-20 fixed">
        <SideBar
          currentPage={'dashboard'}
          onUpdateSelection={function (selected: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
        <div className="fixed w-full h-full overflow-hidden overflow-y-auto bg-gray-50 lg:ml-64">
          {mainContent}
          <FooterSideBar />
        </div>
      </div>
    </div>
  )
}
