import { AppPage } from '../models/common/AppPage'
import FooterSideBar from './FooterSidebar'
import NavBar from './NavBar'
import PageHeader from './PageHeader'
import SideBar from './SideBar'

interface Props {
  currentPage: AppPage
  mainContent: JSX.Element
}

export default function LayoutCommon({ currentPage, mainContent }: Props) {
  return (
    <div className="flex flex-col bg-gray-50 justify-start">
      <NavBar currentPage={currentPage} />
      <div className="flex">
        <SideBar currentPage={currentPage} />
        <div className="lg:ml-64 flex flex-col pt-24 px-6 w-full h-full overflow-y-scroll bg-gray-50">
          <PageHeader currentPage={currentPage} />
          <div className="my-4">{mainContent}</div>
          <FooterSideBar />
        </div>
      </div>
    </div>
  )
}
