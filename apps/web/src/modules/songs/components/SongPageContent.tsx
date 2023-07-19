import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import useAllSongs from '../../../api/providers/useAllSongs'
import TableHeader from '../../../components/TableHeader'
import { Song, emptySong } from '../../../models/song/Song'
import { SongTag } from '../../../models/song/SongTag'
import NavigationPagination from '../../common/components/NavigationPagination'
import SearchBar from '../../common/components/SearchBar'
import AddSongModal from './AddSongModal'
import SongFilterButton from './SongFilterButton'
import SongFilterPanel from './SongFilterPanel'
import SongListTable from './SongListTable'
import useUpdateSong from '../../../api/providers/useUpdateSong'
import useAddSong from '../../../api/providers/useAddSong'

export default function SongPageContent() {
  const [isShowingAddSongModal, setShowingAddSongModal] = useState(false)
  const [currentEditingSong, setCurrentEditingSong] = useState<Song | null>(null)
  const [orderBy, setOrderBy] = useState<'name' | 'key' | 'tempo' | 'version'>('name')

  const { songs, isLoading } = useAllSongs({
    order: orderBy,
  })

  const { addSong } = useAddSong()
  const { updateSong } = useUpdateSong()

  // filter (currently filtered by tags only)
  const [filters, setFilters] = useState<SongTag[]>([])
  const [isShowingFilterPanel, setShowingFilterPanel] = useState(false)
  const filterPanelRef = useRef<HTMLDivElement>(null)
  const isFiltering = !_.isEmpty(filters)

  // search
  const [searchQuery, setSearchQuery] = useState('')
  const filteredData = useMemo(() => {
    var filteredSongs = songs
    if (!_.isEmpty(searchQuery)) {
      const lowercasedQuery = searchQuery.toLowerCase()
      filteredSongs = filteredSongs.filter((song) => {
        return (
          song.name.toLowerCase().includes(lowercasedQuery) ||
          song.version.toLowerCase().includes(lowercasedQuery)
        )
      })
    }
    if (isFiltering) {
      filteredSongs = filteredSongs.filter((song) => song.tags.some((tag) => filters.includes(tag)))
    }
    return filteredSongs
  }, [songs, searchQuery, filters])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingAddSongModal(false)
        setShowingFilterPanel(false)
      }
    }
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (!filterPanelRef.current?.contains(target) && !filterButtonRef.current?.contains(target)) {
        setShowingFilterPanel(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function onRequestEdit(song: Song) {
    setCurrentEditingSong(song)
    setShowingAddSongModal(true)
  }

  // Filter
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const [filterButtonPosition, setFilterButtonPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const updateButtonPosition = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect()
      setFilterButtonPosition({
        top: rect.bottom + window.pageYOffset,
        left: rect.left + window.pageXOffset,
      })
    }
  }
  function handleFilterButtonClick() {
    setShowingFilterPanel((prev) => !prev)
    if (!isShowingFilterPanel) {
      updateButtonPosition()
    }
  }
  function onTagAdd(tag: SongTag) {
    setFilters([...filters, tag])
  }
  function onTagRemove(tag: SongTag) {
    setFilters(filters.filter((t) => t !== tag))
  }
  function onAllTagsRemove() {
    setFilters([])
  }

  const searchBarAndFilter = (
    <div className="flex gap-2">
      <SearchBar
        className="w-1/3"
        placeholder="Search song name, author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e)}
      />
      <SongFilterButton
        {...{
          isFiltering,
          filters,
          ref: filterButtonRef,
          onClick: handleFilterButtonClick,
        }}
      />
    </div>
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <TableHeader
          title="Songs"
          buttonText="Add song"
          filterElement={searchBarAndFilter}
          onClickButton={() => {
            setCurrentEditingSong(emptySong)
            setShowingAddSongModal(true)
          }}
        />
        <SongListTable
          {...{ isLoading, orderBy, setOrderBy, onRequestEdit }}
          songs={filteredData}
        />
        <NavigationPagination />
      </div>
      {/* add song */}
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingAddSongModal },
        )}
      >
        <AddSongModal
          {...{ isShowingAddSongModal }}
          song={currentEditingSong ?? emptySong}
          onSaveSong={(song) => {
            updateSong(song.id, song)
            setShowingAddSongModal(false)
          }}
          onAddSong={(songDetails) => {
            addSong(songDetails)
            setShowingAddSongModal(false)
          }}
          onDismiss={() => {
            setShowingAddSongModal(false)

            setCurrentEditingSong(null)
          }}
        />
      </div>
      {isShowingFilterPanel && (
        <SongFilterPanel
          {...{
            isShowingFilterPanel,
            forwardedRef: filterPanelRef,
            filterButtonPosition,
            filters,
            onTagAdd,
            onTagRemove,
            onAllTagsRemove,
          }}
        />
      )}
    </>
  )
}
