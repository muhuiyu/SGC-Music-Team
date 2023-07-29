import { faArrowDown, faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ServiceSong } from '../../../models/song/ServiceSong'
import { Song } from '../../../models/song/Song'
import { SongOccasion, allOccasions, songOccasionInfo } from '../../../models/song/SongOccasion'

interface Props {
  songs: Song[]
  songDictionary: { [id: Song['id']]: Song }
  serviceSong: ServiceSong
  index: number
  numberOfSongs: number
  onRequestChangeOccasion(occasion: SongOccasion): void
  onRequestChangeSong(song: Song['id'] | undefined): void
  onRequestRemoveSong(): void
  onRequestMoveUp(): void
  onRequestMoveDown(): void
}

export default function ServiceSongInput({
  songs,
  songDictionary,
  serviceSong,
  index,
  numberOfSongs,
  onRequestChangeOccasion,
  onRequestChangeSong,
  onRequestRemoveSong,
  onRequestMoveUp,
  onRequestMoveDown,
}: Props) {
  const song = songDictionary[serviceSong.songId]
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const searchResultsRef = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedSongDivRef = useRef<HTMLDivElement>(null)
  const emptySongDivRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const onChangeSong = () => {
    onRequestChangeSong(undefined)
    setIsEditing(true)
  }

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
    if (
      (inputRef.current && !inputRef.current.contains(event.target as Node)) ||
      (selectedSongDivRef.current && !selectedSongDivRef.current.contains(event.target as Node)) ||
      (emptySongDivRef.current && !emptySongDivRef.current.contains(event.target as Node))
    ) {
      setIsEditing(false)
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
    onRequestChangeSong(song.id)
    setIsEditing(false)
    setSearchQuery('')
    setSearchResults([])

    console.log(song)
  }

  const handleSongRemove = (song: Song) => {
    onRequestChangeSong(undefined)
    setIsEditing(false)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="flex flex-row gap-4 items-center">
      <FontAwesomeIcon icon={faXmark} onClick={onRequestRemoveSong} className="hover:bg-slate-200 rounded-full p-1" />
      <select
        name="song"
        id="key"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={serviceSong.occasion}
        onChange={(e) => {
          onRequestChangeOccasion(e.target.value as SongOccasion)
        }}
      >
        {allOccasions.map((occasion) => (
          <option key={occasion} value={occasion} className="text-gray-900 text-sm" defaultValue={'worship'}>
            {songOccasionInfo[occasion].name}
          </option>
        ))}
      </select>
      {isEditing ? (
        <div
          className="relative items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
          ref={inputRef}
        >
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent p-2.5"
            value={searchQuery}
            onChange={(e) => {
              handleInputChange(e.target.value)
            }}
            placeholder="Search for song..."
          />
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
      ) : song ? (
        <div
          ref={selectedSongDivRef}
          className="flex flex-row justify-between text-center text-white bg-indigo-600 px-3 rounded-lg py-2 flex-1 hover:cursor-pointer"
        >
          <div>{_.isEmpty(song?.version) ? song?.name : `${song?.version} - ${song?.name}`}</div>
          <button className="font-semibold text-xs" onClick={onChangeSong}>
            CLEAR
          </button>
        </div>
      ) : (
        <div
          ref={emptySongDivRef}
          className="border-gray-300 border text-gray-400 border-dashed px-3 rounded-lg p-2 flex-1 hover:cursor-pointer hover:bg-gray-100"
          onClick={onChangeSong}
        >
          Choose song
        </div>
      )}

      {index !== 0 && (
        <FontAwesomeIcon icon={faArrowUp} onClick={onRequestMoveUp} className="hover:bg-slate-200 rounded-full p-1" />
      )}

      {index < numberOfSongs - 1 && (
        <FontAwesomeIcon
          icon={faArrowDown}
          onClick={onRequestMoveDown}
          className="hover:bg-slate-200 rounded-full p-1"
        />
      )}

      {/* extra padding */}
      {(index === 0 || index === numberOfSongs - 1) && <div className="w-5 h-5" />}
    </div>
  )
}
