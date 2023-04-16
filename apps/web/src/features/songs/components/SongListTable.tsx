import produce from 'immer'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import SongListRow from './SongListRow'

interface Props {
  songs: Song[]
}

export default function SongListTable({ songs: suppliedSongs }: Props) {
  // Search
  const [searchQuery, setSearchQuery] = useState('')
  const [songs, setSongs] = useState(suppliedSongs)

  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return songs
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    return songs.filter((song) => {
      return song.name.toLowerCase().includes(lowercasedQuery)
    })
  }, [songs, searchQuery])

  const [editingSongId, setEditingSongId] = useState<Song['id'] | null>(null)
  const [selectedSongIds, setSelectedSongIds] = useState<Song['id'][]>([])

  const areAllSongsSelected = useMemo(() => {
    return _.isEmpty(_.difference(_.map(songs, 'id'), selectedSongIds))
  }, [selectedSongIds, songs])

  return (
    <div>
      <div className="mt-8 flow-root">
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
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Key
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tempo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Chart
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Song
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredData.map((item, index) => (
                      <SongListRow
                        key={item.id}
                        song={item}
                        editing={item.id === editingSongId}
                        selected={selectedSongIds.includes(item.id)}
                        onUpdateSelection={(selected) => {
                          setSelectedSongIds(
                            produce((draft) => {
                              if (selected) {
                                draft.push(item.id)
                              } else {
                                _.pull(draft, item.id)
                              }
                            }),
                          )
                        }}
                        onRequestEdit={() => setEditingSongId(item.id)}
                        onCommitEdit={(details) => {
                          setSongs(
                            produce((draft) => {
                              _.merge(draft[index], details)
                            }),
                          )
                          setEditingSongId(null)
                        }}
                        onCancelEdit={() => setEditingSongId(null)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
