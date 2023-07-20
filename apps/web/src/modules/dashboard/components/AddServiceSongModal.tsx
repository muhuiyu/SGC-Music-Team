import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import _, { filter, keyBy } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Service from '../../../models/service/Service'
import { Song } from '../../../models/song/Song'

interface Props {
  isShowingAddServiceSongModal: boolean
  originalSong?: Song
  songs: Song[]
  onSave(song: Song | undefined): void
  onDismiss(): void
  className?: string
}

export default function AddServiceSongModal({ originalSong, songs, onSave, onDismiss, className }: Props) {
  // current song
  const [currentSong, setCurrentSong] = useState<Song | undefined>(originalSong)
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const searchResultsRef = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // search
  const [searchQuery, setSearchQuery] = useState('')
  const handleInputChange = (value: string) => {
    setSearchQuery(value)

    if (!_.isEmpty(value.trim())) {
      const lowercasedQuery = value.trim().toLowerCase()
      var filteredSongs = songs.filter((song) => {
        return song.name.toLowerCase().includes(lowercasedQuery) || song.version.toLowerCase().includes(lowercasedQuery)
      })
      setSearchResults(filteredSongs)
    } else {
      setSearchResults([])
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setSearchQuery('')
      setSearchResults([])
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSongRemove = (song: Song) => {
    setCurrentSong(undefined)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className={classNames('relative w-full max-w-lg max-h-full', className)}>
      <div className="relative bg-white rounded-lg shadow ">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={() => {
              setCurrentSong(undefined)
              onDismiss()
            }}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Select song</h3>
          </div>

          <form className="space-y-6 text-left pt-6" action="#">
            {/* search song */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Song
              </label>
              <div className="relative">
                <div className="relative items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-grow bg-gray-50 text-sm focus:outline-none focus:border-blue-500 w-full"
                    value={searchQuery}
                    onChange={(e) => {
                      handleInputChange(e.target.value)
                    }}
                    placeholder="Search for song..."
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="absolute left-0 mt-2 w-full z-10" ref={searchResultsRef}>
                    <div className="bg-white rounded shadow overflow-hidden">
                      {searchResults.map((song) => (
                        <button
                          key={song.id}
                          className="block w-full px-4 py-2 text-sm text-left hover:bg-blue-200 focus:outline-none"
                          onClick={() => handleSongSelect(song)}
                        >
                          {song.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-4 pt-8">
              <button
                type="reset"
                className="w-1/2 text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  setCurrentSong(originalSong)
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
                  onSave(currentSong)
                  setCurrentSong(undefined)
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
