import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import { allKeys, keyInfo } from '../../../models/song/Key'
import { Song } from '../../../models/song/Song'

interface Props {
  isShowingAddSongModal: boolean
  onAddSong(details: Omit<Song, 'id'>): void
  onDismiss(): void
  className?: string
}

export default function AddSongModal({
  isShowingAddSongModal,
  onAddSong,
  onDismiss,
  className,
}: Props) {
  const [songDetails, setSongDetails] = useState<Omit<Song, 'id'>>({
    name: '',
    version: '',
    sheetUrlString: '',
    songUrlString: '',
    key: 'C',
    tags: [],
  })

  const clearSongDetails = () => {
    updateSongDetail('name', '')
    updateSongDetail('version', '')
    updateSongDetail('sheetUrlString', '')
    updateSongDetail('songUrlString', '')
    updateSongDetail('key', 'C')
  }

  const updateSongDetail = <K extends keyof Omit<Song, 'id'>>(key: K, value: Song[K]) => {
    setSongDetails(
      produce((draft) => {
        draft[key] = value
      }),
    )
  }

  const onChangeSongDetail =
    <K extends keyof Omit<Song, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateSongDetail(key, e.target.value as Song[K])
    }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(songDetails.name)
  }, [songDetails])

  return (
    <div
      className={classNames(
        'relative w-full max-w-lg max-h-full',
        {
          hidden: !isShowingAddSongModal,
        },
        className,
      )}
    >
      <div className="relative bg-white rounded-lg shadow ">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={() => {
              clearSongDetails()
              onDismiss()
            }}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Add song</h3>
          </div>

          <form className="space-y-6 text-left pt-6" action="#">
            {/* song name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Song name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Alive"
                required
                value={songDetails.name}
                onChange={onChangeSongDetail('name')}
              />
            </div>
            {/* version */}
            <div>
              <label htmlFor="version" className="block mb-2 text-sm font-medium text-gray-900 ">
                Version (author/artist)
              </label>
              <input
                type="text"
                name="version"
                id="version"
                placeholder="e.g. Hillsong"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                value={songDetails.version}
                onChange={onChangeSongDetail('version')}
              />
            </div>
            {/* song link */}
            <div>
              <label
                htmlFor="songUrlString"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Song URL
              </label>
              <input
                type="text"
                name="songUrlString"
                id="songUrlString"
                placeholder="e.g. youtube, spotify..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                value={songDetails.songUrlString}
                onChange={onChangeSongDetail('songUrlString')}
              />
            </div>
            {/* song link */}
            <div>
              <label
                htmlFor="sheetUrlString"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Sheet URL
              </label>
              <input
                type="text"
                name="sheetUrlString"
                id="sheetUrlString"
                placeholder="e.g. Google Drive shared link"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                value={songDetails.sheetUrlString}
                onChange={onChangeSongDetail('sheetUrlString')}
              />
            </div>
            <div className="flex gap-4">
              {/* Key */}
              <div>
                <label htmlFor="key" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Key
                </label>
                <select
                  name="key"
                  id="key"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  value={songDetails.key}
                  onChange={onChangeSongDetail('key')}
                >
                  {allKeys.map((key) => (
                    <option
                      key={key}
                      value={key}
                      className="text-gray-900 text-sm"
                      defaultValue="C"
                    >
                      {keyInfo[key].name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Key */}
              <div>
                <label htmlFor="tempo" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Tempo
                </label>
                <input
                  type="number"
                  name="tempo"
                  id="tempo"
                  placeholder="e.g. 178"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  value={songDetails.tempo ?? 0}
                  onChange={(e) => {
                    const tempo = Number.parseInt(e.target.value, 10)
                    if (tempo !== 0) updateSongDetail('tempo', tempo)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 pt-8">
              <button
                type="reset"
                className="w-1/2 text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  clearSongDetails()
                  onDismiss()
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  onAddSong(songDetails)
                  clearSongDetails()
                }}
                disabled={!areDetailsValid}
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
