import { IconButton } from '@material-ui/core'
import { Filter, LinkOutlined, YouTube } from '@material-ui/icons'
import { useState } from 'react'

type SongListTableProps = {
  songs: Song[]
}

export default function SongListTable({ songs }: SongListTableProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = songs.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFilterClick = () => {
    // TODO:
  }

  return (
    <div className="h-full">
      <div className="flex flex-row">
        <input
          className="p-4 my-4"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: '2px solid #ccc',
            borderRadius: '5px',
            width: '40%',
            boxSizing: 'border-box',
            color: '#333',
          }}
          placeholder="Enter song or author name"
        />
        <IconButton onClick={() => handleFilterClick()}>
          <Filter />
        </IconButton>
      </div>
      <table>
        <thead>
          <tr>
            <th className="pr-4" align="left">
              Name
            </th>
            <th className="pr-4" align="left">
              Author
            </th>
            <th className="pr-4" align="left">
              Key
            </th>
            <th className="pr-4" align="left">
              Tempo
            </th>
            <th className="pr-4" align="left">
              Chart
            </th>
            <th className="pr-4" align="left">
              Song
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((song, index) => {
            return (
              <tr key={index}>
                <td className="pr-4">{song.name}</td>
                <td className="pr-4">{song.author}</td>
                <td className="pr-4">{song.key}</td>
                <td className="pr-4">{song.tempo}</td>
                <td className="pr-4">
                  <a href={song.sheetLinkURL}>
                    <LinkOutlined />
                  </a>
                </td>
                <td className="pr-4">
                  <a href={song.songLinkURL}>
                    <YouTube htmlColor="red" />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
