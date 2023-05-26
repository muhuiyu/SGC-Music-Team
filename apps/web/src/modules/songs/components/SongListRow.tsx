import { LinkOutlined, YouTube } from '@material-ui/icons'
import _ from 'lodash'
import { Song } from '../../../models/song/Song'

interface Props {
  song: Song
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onRequestEdit(): void
}

export default function SongListRow(props: Props) {
  const { song, selected = false, onUpdateSelection, onRequestEdit } = props

  return (
    <tr key={song.id}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={song.id}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">{song.name}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{song.version}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{song.key}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
        {song.tempo !== 0 && song.tempo}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {!_.isEmpty(song.sheetUrlString) && (
          <a href={song.sheetUrlString}>
            <LinkOutlined />
          </a>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {!_.isEmpty(song.songUrlString) && (
          <a href={song.songUrlString}>
            <YouTube htmlColor="red" />{' '}
          </a>
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <a
          onClick={() => {
            onRequestEdit()
          }}
          className="text-primary hover:text-indigo-900"
        >
          Edit<span className="sr-only">, {song.name}</span>
        </a>
      </td>
    </tr>
  )
}
