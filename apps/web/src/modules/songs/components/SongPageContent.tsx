import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import useAllSongs from '../../../api/providers/useAllSongs'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import TableHeader from '../../../components/TableHeader'
import { Song, emptySong } from '../../../models/song/Song'
import NavigationPagination from '../../common/components/NavigationPagination'
import SearchBar from '../../common/components/SearchBar'
import AddSongModal from './AddSongModal'
import SongListTable from './SongListTable'

export default function SongPageContent() {
  const [isShowingAddSongModal, setShowingAddSongModal] = useState(false)
  const [isShowingEditSongModal, setShowingEditSongModal] = useState(false)
  const [currentEditingSong, setCurrentEditingSong] = useState<Song | null>(null)
  const [orderBy, setOrderBy] = useState<'name' | 'key' | 'tempo' | 'version'>('name')

  const { currentUser } = useCurrentUser()

  // firebase
  const { songs, updateSong, addSong, isLoading } = useAllSongs({
    order: orderBy,
  })

  // search
  const [searchQuery, setSearchQuery] = useState('')
  const filteredData = useMemo(() => {
    if (_.isEmpty(searchQuery)) {
      return songs
    }
    const lowercasedQuery = searchQuery.toLowerCase()
    return songs.filter((song) => {
      return (
        song.name.toLowerCase().includes(lowercasedQuery) ||
        song.version.toLowerCase().includes(lowercasedQuery)
      )
    })
  }, [songs, searchQuery])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingAddSongModal(false)
        setShowingEditSongModal(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  function onRequestEdit(song: Song) {
    setCurrentEditingSong(song)
    setShowingEditSongModal(true)
  }

  const searchBar = (
    <SearchBar
      className="w-1/3"
      placeholder="Search song name, author..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e)}
    />
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <TableHeader
          title="Songs"
          buttonText="Add song"
          searchElement={searchBar}
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
          onSaveSong={() => {}}
          onAddSong={(songDetails) => {
            addSong(songDetails)
            setShowingAddSongModal(false)
          }}
          onDismiss={() => {
            setShowingAddSongModal(false)
            setShowingEditSongModal(false)
            setCurrentEditingSong(null)
          }}
        />
      </div>
      {/* edit song */}
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingEditSongModal },
        )}
      >
        <AddSongModal
          {...{ isShowingAddSongModal: isShowingEditSongModal }}
          song={currentEditingSong ?? emptySong}
          onSaveSong={(song) => {
            updateSong(song.id, song)
          }}
          onAddSong={() => {}}
          onDismiss={() => {
            setShowingAddSongModal(false)
            setShowingEditSongModal(false)
            setCurrentEditingSong(null)
          }}
        />
      </div>
    </>
  )
}
