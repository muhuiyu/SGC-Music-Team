import useAllSongs from '../../../api/providers/useAllSongs'
import NavBar from '../../../components/NavBar'
import TableHeader from '../../../components/PageHeader'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
import SongListTable from '../components/SongListTable'

export default function SongsPage() {
  const songs = useAllSongs()

  return (
    <div className="flex flex-row flex-1 h-full">
      <SideBar
        currentPage="songs"
        onUpdateSelection={function (selected: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <main className="p-8 flex flex-col flex-1">
        <NavBar title="Songs" user={testUser} />
        <TableHeader
          title="Songs"
          buttonText="Add song"
          onClickButton={function (): void {
            throw new Error('Function not implemented.')
          }}
        />

        {/* table */}
        <SongListTable songs={songs} />
        {/* table end  */}
      </main>
    </div>
  )
}
