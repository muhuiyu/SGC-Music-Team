import { AppPage, pageInfo } from '../../../models/common/AppPage'

export default function PlannerEmptyView() {
  const serviceList = 'serviceList' as AppPage
  return (
    <>
      {' '}
      <div className="flex flex-col justify-center relative py-8 px-7 sm:px-6 text-center items-center">
        <span className="text-gray-800 pb-8">
          There's no service in selected months. Please go to <b>Service List</b> page to add
          services first.
        </span>
        <a href={pageInfo[serviceList].href}>
          <button
            type="button"
            className="block rounded-md w-auto bg-primary px-3 py-1.5 text-center text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go to Service Page
          </button>
        </a>
      </div>
    </>
  )
}
