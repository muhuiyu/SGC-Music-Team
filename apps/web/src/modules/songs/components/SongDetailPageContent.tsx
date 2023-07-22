import { Song } from '../../../models/song/Song'
import useSong from '../../../api/providers/useSong'
import _ from 'lodash'
import { LinkOutlined, YouTube } from '@material-ui/icons'
import { getFormattedLocalString } from '../../../models/service/Service'
import useAllServices from '../../../api/providers/useAllServices'
import { useMemo, useState } from 'react'
import useUpdateSong from '../../../api/providers/useUpdateSong'
import classNames from 'classnames'
import { SongTag } from '../../../models/song/SongTag'
import {
  detailPageSecondaryButtonStyle,
  detailPageFormRowStyle,
  detailPageHeaderDivStyle,
  detailPagePrimaryButtonStyle,
  detailPageTextFieldLabelStyle,
  detailPageTextFieldStyle,
  pageContentDivStyle,
  detailPageInfoDivStyle,
  detailPageInfoTitleStyle,
  detailPageInfoContentStyle,
  detailPageRowStyle,
} from '../../common/styles/ComponentStyles'
import { allKeys, keyInfo } from '../../../models/song/Key'
import SongTagInput from './SongTagInput'

interface Props {
  songId: Song['id']
}

export default function SongDetailPageContent({ songId }: Props) {
  const { song } = useSong(songId)
  const { updateSong } = useUpdateSong()
  const { getLastServiceWithSong } = useAllServices()

  console.log('select song', songId)
  function getLastTimeWithSongString(): string {
    const lastService = getLastServiceWithSong(songId)
    return lastService === null ? '-' : getFormattedLocalString(lastService.dateTime)
  }

  // Editing
  const [isEditing, setIsEditing] = useState(false)

  const [editingSong, setEditingSong] = useState<Partial<Song>>({})
  const resolvedSong = useMemo(
    (): Song | undefined =>
      song
        ? {
            ...song,
            ...editingSong,
          }
        : undefined,
    [song, editingSong],
  )

  const clearResolvedSong = () => {
    setEditingSong({})
  }

  const updateSongDetail = <K extends keyof Song>(
    key: K,
    value: Song[K] | ((prevValue: Song[K] | undefined) => Song[K]),
  ) => {
    setEditingSong((prevSong) => ({
      ...prevSong,
      [key]: typeof value === 'function' ? value(prevSong[key] ?? song?.[key]) : value,
    }))
  }

  const onChangeSongDetail =
    <K extends keyof Omit<Song, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateSongDetail(key, e.target.value as Song[K])
    }

  const onChangeTags = (tags: SongTag[]) => {
    updateSongDetail('tags', tags)
  }

  const onSaveSong = () => {
    if (resolvedSong === undefined || resolvedSong.id === undefined) {
      return
    }
    updateSong(resolvedSong.id, resolvedSong)
  }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedSong?.name)
  }, [resolvedSong])

  if (!song || !resolvedSong) {
    return null
  }

  return (
    <>
      <div className={pageContentDivStyle}>
        <div className="w-full mt-4">
          {isEditing ? (
            <div className="flex flex-col gap-8">
              {/* header */}
              <div className={classNames(detailPageHeaderDivStyle, 'justify-end')}>
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    className={detailPageSecondaryButtonStyle}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={detailPagePrimaryButtonStyle}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onSaveSong()
                      clearResolvedSong()
                      setIsEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* form */}
              <div className={detailPageFormRowStyle}>
                {/* name */}
                <div className="flex-1">
                  <label htmlFor="name" className={detailPageTextFieldLabelStyle}>
                    Song name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={detailPageTextFieldStyle}
                    placeholder="e.g. Alive"
                    required
                    value={resolvedSong.name}
                    onChange={onChangeSongDetail('name')}
                  />
                </div>
                {/* version */}
                <div className="flex-1">
                  <label htmlFor="version" className={detailPageTextFieldLabelStyle}>
                    Version (author/artist)
                  </label>
                  <input
                    type="text"
                    name="version"
                    id="version"
                    placeholder="e.g. Hillsong"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedSong.version}
                    onChange={onChangeSongDetail('version')}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                <div className="flex-1">
                  {/* song link */}
                  <label htmlFor="songUrlString" className={detailPageTextFieldLabelStyle}>
                    Song URL
                  </label>
                  <input
                    type="text"
                    name="songUrlString"
                    id="songUrlString"
                    placeholder="e.g. youtube, spotify..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedSong.songUrlString}
                    onChange={onChangeSongDetail('songUrlString')}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                <div className="flex-1">
                  {/* sheet link */}
                  <label htmlFor="sheetUrlString" className={detailPageTextFieldLabelStyle}>
                    Sheet URL
                  </label>
                  <input
                    type="text"
                    name="sheetUrlString"
                    id="sheetUrlString"
                    placeholder="e.g. Google Drive shared link"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedSong.sheetUrlString}
                    onChange={onChangeSongDetail('sheetUrlString')}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                {/* Key */}
                <div className="flex-1">
                  <label htmlFor="key" className={detailPageTextFieldLabelStyle}>
                    Key
                  </label>
                  <select
                    name="key"
                    id="key"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedSong.key}
                    onChange={onChangeSongDetail('key')}
                  >
                    {allKeys.map((key) => (
                      <option key={key} value={key} className="text-gray-900 text-sm" defaultValue="C">
                        {keyInfo[key].name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Tempo */}
                <div className="flex-1">
                  <label htmlFor="tempo" className={detailPageTextFieldLabelStyle}>
                    Tempo
                  </label>
                  <input
                    type="number"
                    name="tempo"
                    id="tempo"
                    placeholder="e.g. 178"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedSong.tempo ?? 0}
                    onChange={(e) => {
                      const tempo = Number.parseInt(e.target.value, 10)
                      if (tempo !== 0) updateSongDetail('tempo', tempo)
                    }}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                {/* tags */}
                <div className="flex-1">
                  <label htmlFor="tags" className={detailPageTextFieldLabelStyle}>
                    Tags
                  </label>
                  <SongTagInput
                    selectedTags={resolvedSong.tags}
                    onTagAdd={(tag) => {
                      onChangeTags([...resolvedSong.tags, tag])
                    }}
                    onTagRemove={(tag) => {
                      onChangeTags(resolvedSong.tags.filter((t) => t !== tag))
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* header */}
              <div className={classNames(detailPageHeaderDivStyle, 'justify-between')}>
                <div className="flex flex-row flex-1">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{song.name}</h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {_.isEmpty(song.version) ? '-' : song.version}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{song.tags.join(', ')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className={detailPageSecondaryButtonStyle}
                  onClick={() => {
                    setIsEditing(true)
                  }}
                >
                  Edit
                </button>
              </div>

              <div className="mt-6">
                <div className={detailPageRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Key</div>
                    <div className={detailPageInfoContentStyle}>{song.key}</div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Tempo</div>
                    <div className={detailPageInfoContentStyle}>{song.tempo}</div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Song Link</div>
                    <div className={classNames(detailPageInfoContentStyle, 'whitespace-nowrap')}>
                      {!_.isEmpty(song.songUrlString) && (
                        <a href={song.songUrlString}>
                          <YouTube htmlColor="red" />{' '}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Sheet Link</div>
                    <div className={classNames(detailPageInfoContentStyle, 'whitespace-nowrap')}>
                      {!_.isEmpty(song.sheetUrlString) && (
                        <a href={song.sheetUrlString}>
                          <LinkOutlined />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className={detailPageRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Note</div>
                    <div className={detailPageInfoContentStyle}>-</div>
                  </div>
                </div>
                <div className={detailPageRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Last time used when</div>
                    <div className={detailPageInfoContentStyle}>{getLastTimeWithSongString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
