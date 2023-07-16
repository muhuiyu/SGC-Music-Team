import classNames from 'classnames'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { SongTag, allSongTags, songTagInfo } from '../../../models/song/SongTag'

interface Props {
  forwardedRef: React.RefObject<HTMLDivElement>
  filterButtonPosition: { top: number; left: number } | null
  filters: SongTag[]
  onTagAdd(tag: SongTag): void
  onTagRemove(tag: SongTag): void
  onAllTagsRemove(): void
}

export default function SongFilterPanel({
  forwardedRef,
  filterButtonPosition,
  filters,
  onTagAdd,
  onTagRemove,
  onAllTagsRemove,
}: Props) {
  // search
  const [searchQuery, setSearchQuery] = useState('')
  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return allSongTags
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    return allSongTags.filter((tag) => {
      return (
        songTagInfo[tag].name.toLowerCase().includes(lowercasedQuery) ||
        songTagInfo[tag].code.toLowerCase().includes(lowercasedQuery)
      )
    })
  }, [searchQuery])

  return (
    <div
      className={classNames('z-50 flex justify-start bg-white rounded-lg shadow')}
      ref={forwardedRef}
      style={{
        top: filterButtonPosition?.top ?? 0,
        left: filterButtonPosition?.left ?? 0,
        position: 'absolute',
      }}
    >
      <div id="dropdownSearch" className="z-10 bg-white ">
        <div className="p-3">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search tag"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 items-start"
          aria-labelledby="dropdownSearchButton"
        >
          {filteredData.map((tag) => (
            <li key={tag}>
              <div className="flex items-center pl-2 rounded bg-white hover:bg-gray-100">
                <input
                  id="checkbox-item-14"
                  type="checkbox"
                  value={songTagInfo[tag].code}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  checked={filters.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onTagAdd(tag)
                    } else {
                      onTagRemove(tag)
                    }
                  }}
                />
                <label
                  htmlFor="checkbox-item-14"
                  className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded"
                >
                  {songTagInfo[tag].name}
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center p-3 pl-5 text-sm font-medium text-indigo-600 border-t border-gray-200 rounded-b-lg bg-gray-50 w-full"
          onClick={onAllTagsRemove}
        >
          Remove all
        </button>
      </div>
    </div>
  )
}
