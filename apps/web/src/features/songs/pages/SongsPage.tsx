import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
import useAllSongs from '../../../api/providers/useAllSongs'
import useCurrentUser from '../../../api/providers/useCurrentUser'
import NavBar from '../../../components/NavBar'
import SideBar from '../../../components/SideBar'
import TableHeader from '../../../components/TableHeader'
import { Song, emptySong } from '../../../models/song/Song'
import AddSongModal from '../components/AddSongModal'
import SongListTable from '../components/SongListTable'

const SongsPage = () => {
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

  return (
    <>
      <div className="flex flex-row flex-1 h-full">
        <SideBar
          currentPage="songs"
          onUpdateSelection={function (selected: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
        <main className="p-8 flex flex-col flex-1">
          <NavBar currentPage="songs" user={currentUser} />
          <TableHeader
            isSearchable={true}
            title="Songs"
            buttonText="Add song"
            searchPlaceholder="Search song name, author..."
            {...{ searchQuery, setSearchQuery }}
            onClickButton={() => {
              setCurrentEditingSong(emptySong)
              setShowingAddSongModal(true)
            }}
          />
          <SongListTable
            {...{ updateSong, isLoading, orderBy, setOrderBy, onRequestEdit }}
            songs={filteredData}
          />
        </main>
      </div>
      {/* add song */}
      <div
        className={classNames(
          'inset-0 flex absolute bg-black bg-opacity-30 justify-center items-center',
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
          'inset-0 flex absolute bg-black bg-opacity-30 justify-center items-center',
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
export default withRequireAuth(SongsPage)
