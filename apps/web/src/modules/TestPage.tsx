import { withRequireAuth } from '../api/auth/RequireAuth'
import LayoutCommon from '../app/LayoutCommon'

const TestPage = () => {
  const mainContent = (
    <div className="text-red-400 bg-blue-300 text-6xl h-[1500px] ">testtttttttttttttfdsfa</div>
  )
  return <LayoutCommon currentPage={'dashboard'} mainContent={mainContent} />
}

export default withRequireAuth(TestPage)
