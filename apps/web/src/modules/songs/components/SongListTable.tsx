import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { Song } from '../../../models/song/Song'
import Spinner from '../../common/components/Spinner'
import SongListRow from './SongListRow'
import { useNavigate } from 'react-router-dom'
import { pageInfo } from '../../../models/common/AppPage'

interface Props {
  songs: Song[]
  orderBy: 'name' | 'tempo' | 'version' | 'key'
  setOrderBy(order: 'name' | 'tempo' | 'version' | 'key'): void
  isLoading: boolean
}

interface Header {
  name: string
  key: 'name' | 'tempo' | 'version' | 'key' | 'sheetUrlString' | 'songUrlString'
  order: 'name' | 'tempo' | 'version' | 'key'
}

export default function SongListTable({ songs, orderBy, setOrderBy, isLoading }: Props) {
  const [selectedSongIds, setSelectedSongIds] = useState<Song['id'][]>([])

  const headers: Header[] = [
    {
      name: 'Name',
      key: 'name',
      order: 'name',
    },
    {
      name: 'Version (author/artist)',
      key: 'version',
      order: 'version',
    },
    {
      name: 'Key',
      key: 'key',
      order: 'key',
    },
    {
      name: 'Tempo',
      key: 'tempo',
      order: 'tempo',
    },
    {
      name: 'Chart',
      key: 'sheetUrlString',
      order: 'name',
    },
    {
      name: 'Song',
      key: 'songUrlString',
      order: 'name',
    },
  ]

  const areAllSongsSelected = useMemo(() => {
    return _.isEmpty(_.difference(_.map(songs, 'id'), selectedSongIds))
  }, [selectedSongIds, songs])

  const navigate = useNavigate()
  const navigateToDetailPage = (songId: Song['id']) => {
    navigate(`${pageInfo.songDetail.href}/${songId}`)
  }

  return (
    <>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <div className="relative">
                {selectedSongIds.length > 0 && (
                  <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={areAllSongsSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSongIds(_.map(songs, 'id'))
                            } else {
                              setSelectedSongIds([])
                            }
                          }}
                        />
                      </th>
                      {/* table header */}
                      {headers.map((header) => (
                        <th
                          key={header.key}
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          <button
                            className="group inline-flex"
                            onClick={() => setOrderBy(header.order)}
                          >
                            {header.name}
                            {header.key != 'songUrlString' && header.key != 'sheetUrlString' && (
                              <span
                                className={classNames(
                                  orderBy !== header.order
                                    ? 'invisible group-hover:visible group-focus:visible text-gray-400'
                                    : 'bg-gray-100 text-gray-900 group-hover:bg-gray-200',
                                  'ml-2 flex-none rounded text-left',
                                )}
                              >
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {songs.map((song) => (
                      <SongListRow
                        key={song.id}
                        song={song}
                        selected={selectedSongIds.includes(song.id)}
                        onUpdateSelection={(selected) => {
                          setSelectedSongIds(
                            produce((draft) => {
                              if (selected) {
                                draft.push(song.id)
                              } else {
                                _.pull(draft, song.id)
                              }
                            }),
                          )
                        }}
                        onClick={() => {
                          navigateToDetailPage(song.id)
                        }}
                      />
                    ))}
                  </tbody>
                </table>
                {/* Loading */}
                <div
                  className={classNames(
                    'absolute inset-0 flex justify-center items-center text-center',
                    {
                      hidden: !isLoading,
                    },
                  )}
                >
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
