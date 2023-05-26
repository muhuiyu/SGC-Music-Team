import { AppPage, pageInfo } from '../models/common/AppPage'

interface Props {
  currentPage: AppPage
}

export default function PageHeader({ currentPage }: Props) {
  return (
    <div className="col-span-full pb-4">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
        {pageInfo[currentPage].name}
      </h1>
    </div>
  )
}
