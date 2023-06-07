import { FunnelIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { forwardRef } from 'react'
import { SongTag } from '../../../models/song/SongTag'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFiltering: boolean
  filters: SongTag[]
  onClick: () => void
}

const SongFilterButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { isFiltering, filters, onClick } = props

  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center p-3 font-medium rounded-lg mr-2  bg-white',
        isFiltering ? 'border-indigo-500 border-2' : 'border-gray-300 hover:bg-indigo-50 border',
      )}
      ref={ref}
      onClick={onClick}
    >
      <FunnelIcon
        className={classNames('h-6 w-6 ', isFiltering ? 'text-indigo-500' : 'text-gray-500')}
      />
      {isFiltering ? (
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-indigo-500 border-2 border-white rounded-full -top-2 -right-2 ">
          {filters.length}
        </div>
      ) : null}
    </button>
  )
})

export default SongFilterButton
