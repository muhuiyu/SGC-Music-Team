import { useEffect, useRef, useState } from 'react'
import { SongTag, allSongTags, songTagInfo } from '../../../models/song/SongTag'

interface Props {
  selectedTags: SongTag[]
  onTagAdd(tag: SongTag): void
  onTagRemove(tag: SongTag): void
}

export default function SongTagInput({ selectedTags, onTagAdd, onTagRemove }: Props) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SongTag[]>([])
  const searchResultsRef = useRef(null)

  const handleInputChange = (value: string) => {
    setQuery(value)

    if (value.trim()) {
      const filteredTags = allSongTags.filter((tag) => {
        const tagName = songTagInfo[tag].name
        return !selectedTags.includes(tag) && tagName.toLowerCase().includes(value.toLowerCase())
      })
      setSearchResults(filteredTags)
    } else {
      setSearchResults([])
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    setSearchResults([])
    setQuery('')
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleTagSelect = (tag: SongTag) => {
    setSearchResults([])
    setQuery('')
    onTagAdd(tag)
  }

  const handleTagRemove = (tag: SongTag) => {
    onTagRemove(tag)
  }

  return (
    <div className="relative">
      <div className="relative items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex mr-2 items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-sm font-medium"
          >
            {songTagInfo[tag].name}
            <button
              onClick={() => handleTagRemove(tag)}
              className="inline-flex text-blue-500 hover:text-blue-900 ml-1.5 rounded-full focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-grow bg-gray-50 text-sm focus:outline-none focus:border-blue-500"
          value={query}
          onChange={(e) => {
            handleInputChange(e.target.value)
          }}
          placeholder="Search for tags..."
        />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute left-0 mt-2 w-full z-10" ref={searchResultsRef}>
          <div className="bg-white rounded shadow overflow-hidden">
            {searchResults.map((tag) => (
              <button
                key={tag}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-blue-200 focus:outline-none"
                onClick={() => handleTagSelect(tag)}
              >
                {songTagInfo[tag].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
