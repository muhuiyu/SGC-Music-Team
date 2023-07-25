import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import useAllServices from '../../../api/providers/useAllServices'
import useSong from '../../../api/providers/useSong'
import useUpdateSong from '../../../api/providers/useUpdateSong'
import { getFormattedLocalString } from '../../../models/service/Service'
import { Chart, ChartType, allChartTypes, chartTypeInfo } from '../../../models/song/Chart'
import { Key, allKeys, keyInfo } from '../../../models/song/Key'
import { Song } from '../../../models/song/Song'
import { SongTag } from '../../../models/song/SongTag'
import {
  detailPageFormRowStyle,
  detailPageHeaderDivStyle,
  detailPagePrimaryButtonStyle,
  detailPageSecondaryButtonStyle,
  detailPageTextFieldLabelStyle,
  detailPageTextFieldStyle,
  pageContentDivStyle,
} from '../../common/styles/ComponentStyles'
import SongDetailPageViewContent from './SongDetailPageViewContent'
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
  const [isEditing, setEditing] = useState(false)

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

  const onChangeCharts = (chart: Chart, index: number) => {
    if (!song) return
    let updatedCharts = [...song.charts]
    updatedCharts[index] = chart
    updateSongDetail('charts', updatedCharts)
  }

  const onSaveSong = () => {
    if (resolvedSong === undefined || resolvedSong.id === undefined) {
      return
    }
    console.log('updateSong', resolvedSong)
    updateSong(resolvedSong.id, resolvedSong)
  }

  const areDetailsValid: boolean = useMemo(() => {
    if (_.isEmpty(resolvedSong?.name)) {
      return false
    } else {
      resolvedSong?.charts.forEach((chart) => {
        if (_.isEmpty(chart.url)) {
          return false
        }
      })
    }

    return true
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
                      setEditing(false)
                    }}
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
                      setEditing(false)
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

              {/* tags */}
              <div className={detailPageFormRowStyle}>
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

              {/* song link */}
              <div className={detailPageFormRowStyle}>
                <div className="flex-1">
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

              {/* Chart versions */}
              <div className={detailPageFormRowStyle}>
                <div className="flex-1">
                  <label htmlFor="charts" className={detailPageTextFieldLabelStyle}>
                    Chart versions
                  </label>
                  {resolvedSong.charts.map((chart, index) => {
                    return (
                      <div className="flex flex-row gap-4 mt-2 items-center" key={index}>
                        <div className="">
                          <select
                            name="key"
                            id="key"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            value={chart.key}
                            onChange={(e) => {
                              let updatedChart = { ...chart }
                              updatedChart.key = e.target.value as Key
                              onChangeCharts(updatedChart, index)
                            }}
                          >
                            {allKeys.map((key) => (
                              <option key={key} value={key} className="text-gray-900 text-sm" defaultValue="C">
                                {keyInfo[key].name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="">
                          <select
                            name="chartType"
                            id="chartType"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            value={chart.type}
                            onChange={(e) => {
                              let updatedChart = { ...chart }
                              updatedChart.type = e.target.value as ChartType
                              onChangeCharts(updatedChart, index)
                            }}
                          >
                            {allChartTypes.map((type) => (
                              <option
                                key={type}
                                value={type}
                                className="text-gray-900 text-sm"
                                defaultValue="leadSheet"
                              >
                                {chartTypeInfo[type].name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            name="sheetUrlString"
                            id="sheetUrlString"
                            placeholder="e.g. Google Drive shared link"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            value={chart.url}
                            onChange={(e) => {
                              let updatedChart = { ...chart }
                              updatedChart.url = e.target.value
                              onChangeCharts(updatedChart, index)
                            }}
                          />
                        </div>
                        <FontAwesomeIcon
                          className="hover:cursor-pointer"
                          icon={faXmark}
                          onClick={() => {
                            const updatedCharts = [
                              ...resolvedSong.charts.slice(0, index),
                              ...resolvedSong.charts.slice(index + 1),
                            ]
                            updateSongDetail('charts', updatedCharts)
                          }}
                        />
                      </div>
                    )
                  })}
                  <button
                    type="button"
                    className="py-2 mt-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 hover:cursor-pointer"
                    onClick={() => {
                      const updatedCharts = [...resolvedSong.charts]
                      updatedCharts.push({ key: 'C', type: 'leadSheet', url: '' })
                      updateSongDetail('charts', updatedCharts)
                    }}
                  >
                    + Add chart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <SongDetailPageViewContent {...{ song, setEditing, lastTimeWithSongString: getLastTimeWithSongString() }} />
          )}
        </div>
      </div>
    </>
  )
}
