import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { AppPage, pageInfo } from '../models/common/AppPage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
  currentPage: AppPage
}

export default function PageHeader({ currentPage }: Props) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="col-span-full pb-4">
      <div className="flex flex-row items-center gap-4">
        {pageInfo[currentPage].isBackButtonAvailable && (
          <ChevronLeftIcon width={24} height={24} onClick={handleGoBack} />
        )}
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          {pageInfo[currentPage].name}
        </h1>
      </div>
    </div>
  )
}
