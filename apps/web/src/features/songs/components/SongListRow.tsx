import { IconButton } from '@material-ui/core'
import { Check, Close, LinkOutlined, YouTube } from '@material-ui/icons'
import produce from 'immer'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { Song } from '../../../models/song/Song'
import User from '../../../models/user/User'

interface Props {
  song: Song
  editing: boolean
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onRequestEdit(): void
  onCommitEdit(details: Partial<User>): void
  onCancelEdit(): void
}

export default function SongListRow(props: Props) {
  const {
    song,
    editing,
    selected = false,
    onUpdateSelection,
    onRequestEdit,
    onCommitEdit,
    onCancelEdit,
  } = props

  const [editingSong, setEditingSong] = useState<Partial<Song>>({})

  const resolvedSong = useMemo(
    () => ({
      ...song,
      ...editingSong,
    }),
    [song, editingSong],
  )

  const updateSongDetail = <K extends keyof Omit<Song, 'id'>>(key: K, value: Song[K]) => {
    setEditingSong(
      produce((draft) => {
        draft[key] = value
      }),
    )
  }

  const onChangeSongDetail =
    <K extends keyof Omit<Song, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateSongDetail(key, e.target.value as Song[K])
    }

  return (
    <tr key={resolvedSong.id}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={resolvedSong.id}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {editing ? (
          <input
            type="text"
            name="name"
            value={resolvedSong.name}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeSongDetail('name')}
          />
        ) : (
          resolvedSong.name
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="version"
            value={resolvedSong.version}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeSongDetail('version')}
          />
        ) : (
          resolvedSong.version
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="key"
            value={resolvedSong.key}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeSongDetail('key')}
          />
        ) : (
          resolvedSong.key
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="number"
            name="tempo"
            value={resolvedSong.tempo}
            style={{ backgroundColor: 'lightblue' }}
            onChange={(e) => {
              const tempo = Number.parseInt(e.target.value, 10)
              updateSongDetail('tempo', tempo)
            }}
          />
        ) : (
          resolvedSong.tempo !== 0 && resolvedSong.tempo
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="sheetLinkUrl"
            value={resolvedSong.sheetUrlString}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeSongDetail('sheetUrlString')}
          />
        ) : (
          !_.isEmpty(resolvedSong.sheetUrlString) && (
            <a href={resolvedSong.sheetUrlString}>
              <LinkOutlined />
            </a>
          )
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="songLinkUrl"
            value={resolvedSong.songUrlString}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onChangeSongDetail('songUrlString')}
          />
        ) : (
          !_.isEmpty(resolvedSong.songUrlString) && (
            <a href={resolvedSong.songUrlString}>
              <YouTube htmlColor="red" />{' '}
            </a>
          )
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {editing ? (
          <div className="flex flex-row">
            <IconButton
              aria-label="cancel"
              onClick={() => {
                onCancelEdit()
                setEditingSong({})
              }}
              color="secondary"
            >
              <Close />
            </IconButton>
            <IconButton
              size="small"
              aria-label="save"
              onClick={() => {
                onCommitEdit(editingSong)
                setEditingSong({})
              }}
              color="primary"
            >
              <Check />
            </IconButton>
          </div>
        ) : (
          <a
            onClick={() => {
              onRequestEdit()
            }}
            className="text-primary hover:text-indigo-900"
          >
            Edit<span className="sr-only">, {resolvedSong.name}</span>
          </a>
        )}
      </td>
    </tr>
  )
}
