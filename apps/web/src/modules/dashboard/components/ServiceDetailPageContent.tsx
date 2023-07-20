import { PaperClipIcon } from '@heroicons/react/20/solid'
import useService from '../../../api/providers/useService'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import useAllUsers from '../../../api/providers/useAllUsers'
import { roleInfo } from '../../../models/user/User'
import _ from 'lodash'
import useAllSongs from '../../../api/providers/useAllSongs'

import { allOccasions, songOccasionInfo } from '../../../models/song/SongOccasion'
import {
  detailPageFormRowStyle,
  detailPageHeaderDivStyle,
  detailPageInfoContentStyle,
  detailPageInfoDivStyle,
  detailPageInfoTitleStyle,
  detailPagePrimaryButtonStyle,
  detailPageRowStyle,
  detailPageSecondaryButtonStyle,
  detailPageTextFieldLabelStyle,
  detailPageTextFieldStyle,
  pageContentDivStyle,
} from '../../common/styles/ComponentStyles'
import { useEffect, useMemo, useState } from 'react'
import { Song } from '../../../models/song/Song'
import useUpdateService from '../../../api/providers/useUpdateService'
import classNames from 'classnames'
import ServiceSongInput from './ServiceSongInput'
import { ServiceSong } from '../../../models/song/ServiceSong'
import produce from 'immer'
import AddServiceSongModal from './AddServiceSongModal'

interface Props {
  serviceId: Service['id']
}

export default function ServiceDetailPageContent({ serviceId }: Props) {
  const { service } = useService(serviceId)

  const { generateUserDictionary } = useAllUsers()
  const { songs, generateSongDictionary } = useAllSongs({ order: 'name' })

  const getServiceLeadName = (): string => {
    if (service?.lead === undefined || _.isEmpty(service.lead)) return '-'
    const leadUser = generateUserDictionary()[service.lead]
    return leadUser.firstName + ' ' + leadUser.lastName
  }

  const getServiceTeamList = () => {
    if (!service || _.isEmpty(service.assignments)) return <div className={detailPageInfoContentStyle}>-</div>
    return Object.entries(service.assignments).map(([userId, role]) => {
      const user = generateUserDictionary()[userId]
      return (
        <div key={userId} className={detailPageInfoContentStyle}>
          {user.firstName} {user.lastName} ({roleInfo[role].name})
        </div>
      )
    })
  }

  const getSongList = () => {
    if (!service || _.isEmpty(service.songs)) {
      return <div className={detailPageInfoContentStyle}>-</div>
    }
    return service.songs.map((serviceSong) => {
      const song = generateSongDictionary()[serviceSong.songId]
      return (
        <div key={serviceSong.songId} className={detailPageInfoContentStyle}>
          {songOccasionInfo[serviceSong.occasion].name}: {song.name}
        </div>
      )
    })
  }

  const getServiceDateString = (): string => {
    if (service?.dateTime === undefined) return '-'
    return getFormattedLocalString(service.dateTime)
  }

  const getServiceNoteString = (): string => {
    if (service?.note == undefined || _.isEmpty(service.note)) return '-'
    return service.note
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setIsShowingAddServiceSongModal(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  })

  // Editing
  const [isEditing, setIsEditing] = useState(true)
  const { updateService } = useUpdateService()
  const [isShowingAddServiceSongModal, setIsShowingAddServiceSongModal] = useState(false)

  const [editingService, setEditingService] = useState<Partial<Service>>({})
  const resolvedService = useMemo(
    (): Service | undefined =>
      service
        ? {
            ...service,
            ...editingService,
          }
        : undefined,
    [service, editingService],
  )

  const clearResolvedService = () => {
    setEditingService({})
  }

  const updateServiceDetail = <K extends keyof Service>(
    key: K,
    value: Service[K] | ((prevValue: Service[K] | undefined) => Service[K]),
  ) => {
    setEditingService((prevService) => ({
      ...prevService,
      [key]: typeof value === 'function' ? value(prevService[key] ?? service?.[key]) : value,
    }))
  }

  const onChangeServiceDetail =
    <K extends keyof Omit<Service, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateServiceDetail(key, e.target.value as Service[K])
    }

  // const onChangeSongs = (songs: Song['id'][]) => {
  // updateServiceDetail('tags', tags)
  // }

  const moveIndex = (array: any[], index: number, offset: number): any[] => {
    if (index < 0 || index >= array.length) {
      console.log('Invalid index')
      return array
    }

    const newIndex = index + offset
    if (newIndex < 0 || newIndex >= array.length) {
      console.log('New index is out of bounds')
      return array
    }
    const newArray = [...array]
    const item = newArray.splice(index, 1)[0]
    newArray.splice(newIndex, 0, item)

    return newArray
  }

  const onSaveService = () => {
    if (resolvedService === undefined || resolvedService.id === undefined) {
      return
    }
    updateService(resolvedService.id, resolvedService)
  }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedService?.dateTime)
  }, [resolvedService])

  if (!service) {
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
                      onSaveService()
                      clearResolvedService()
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
                <div className="flex-1">
                  {/* topic */}
                  <label htmlFor="songUrlString" className={detailPageTextFieldLabelStyle}>
                    Topic
                  </label>
                  <input
                    type="text"
                    name="songUrlString"
                    id="songUrlString"
                    placeholder="e.g. Luke 1:1-10..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    value={resolvedService?.topic}
                    onChange={onChangeServiceDetail('topic')}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                {/* Songs */}
                <div className="flex-1">
                  <label htmlFor="key" className={detailPageTextFieldLabelStyle}>
                    Songs
                  </label>
                  <div className="flex flex-col gap-2 mt-4">
                    {resolvedService?.songs.map((song, index) => (
                      <ServiceSongInput
                        key={index}
                        {...{
                          serviceSong: song,
                          index,
                          songDictionary: generateSongDictionary(),
                          numberOfSongs: resolvedService.songs.length,
                        }}
                        onRequestChangeOccasion={(newOccasion) => {
                          const updatedSongs = [...resolvedService.songs]
                          updatedSongs[index] = {
                            ...updatedSongs[index],
                            occasion: newOccasion,
                          }
                          updateServiceDetail('songs', updatedSongs)
                        }}
                        onRequestChangeSong={() => {
                          // todo
                          setIsShowingAddServiceSongModal(true)
                        }}
                        onRequestRemoveSong={() => {
                          const updatedSongs = [...resolvedService.songs].splice(index, 1)
                          updateServiceDetail('songs', updatedSongs)
                        }}
                        onRequestMoveUp={() => {
                          const updatedSongs = moveIndex(resolvedService.songs, index, -1)
                          updateServiceDetail('songs', updatedSongs)
                        }}
                        onRequestMoveDown={() => {
                          const updatedSongs = moveIndex(resolvedService.songs, index, 1)
                          updateServiceDetail('songs', updatedSongs)
                        }}
                      />
                    ))}
                  </div>
                  <button
                    className="mt-4 text-sm text-primary font-bold"
                    onClick={() => {
                      if (!resolvedService) {
                        return
                      }
                      const updateSongs = resolvedService.songs.concat({
                        songId: '',
                        occasion: 'worship',
                        note: '',
                      })
                      updateServiceDetail('songs', updateSongs)
                    }}
                  >
                    + Add Song
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* header */}
              <div className={classNames(detailPageHeaderDivStyle, 'justify-between')}>
                <div className="flex flex-row flex-1">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 px-10">{getServiceDateString()}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">{service?.topic}</p>
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
                    <div className={detailPageInfoTitleStyle}>Sermon</div>
                    <div className={detailPageInfoContentStyle}>Pastor Jacob</div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Music lead</div>
                    <div className={detailPageInfoContentStyle}>{getServiceLeadName()}</div>
                  </div>
                </div>
                <div className={detailPageRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Team</div>
                    {getServiceTeamList()}
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Songs</div>
                    {getSongList()}
                  </div>
                </div>
                <div className={detailPageRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Note</div>
                    <div className={detailPageInfoContentStyle}>{getServiceNoteString()}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 py-6 px-10">
                  <div className={detailPageInfoTitleStyle}>Attachments</div>
                  <div className="mt-2 text-sm text-gray-900">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">worship_timesheet.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                      {/* todo: add upload button */}
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">special_event_transcript.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingAddServiceSongModal },
        )}
      >
        <AddServiceSongModal
          {...{ isShowingAddServiceSongModal, songs }}
          onSave={(song) => {
            // todo
            setIsShowingAddServiceSongModal(false)
          }}
          onDismiss={() => {
            setIsShowingAddServiceSongModal(false)
          }}
        />
      </div>
    </>
  )
}
