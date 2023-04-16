import NavBar from '../../../components/NavBar'
import TableHeader from '../../../components/PageHeader'
import SideBar from '../../../components/SideBar'
import { testUser } from '../../../mock/MockData'
import SongListTable from '../components/SongListTable'

export default function SongsPage() {
  const songs: Song[] = [
    {
      id: 'song-1',
      name: '10,000 reasons',
      author: 'Matt Redman',
      tempo: 73,
      key: 'D',
      sheetUrlString:
        'https://drive.google.com/file/d/1XNuqZDNr68Ab-L1zChZcXSTrYsIOJiHI/view?usp=share_link',
      songUrlString: 'https://www.youtube.com/watch?v=DXDGE_lRI0E',
    },
    {
      id: 'song-2',
      name: 'Blessed Be Your Name',
      author: 'Matt Redman',
      tempo: 116,
      key: 'A',
      sheetUrlString:
        'https://drive.google.com/file/d/13GB-j8kFLj-M2mvIEwopinCSA9XbvxO7/view?usp=share_link',
      songUrlString: 'https://www.youtube.com/watch?v=tTpTQ4kBLxA',
    },
    {
      id: 'song-3',
      name: 'Mighty to Save',
      author: 'Hillsong',
      tempo: 74,
      key: 'G',
      sheetUrlString:
        'https://drive.google.com/file/d/1eoSE8E89fflSFJgqCBgfdJJ_9JQdR3-i/view?usp=share_link',
      songUrlString: 'https://www.youtube.com/watch?v=GEAcs2B-kNc',
    },
  ]
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
