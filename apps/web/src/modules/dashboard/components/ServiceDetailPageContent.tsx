import { PaperClipIcon } from '@heroicons/react/20/solid'
import _ from 'lodash'
import useAllSongs from '../../../hooks/useAllSongs'
import useAllUsers from '../../../hooks/useAllUsers'
import useService from '../../../hooks/useService'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import { roleInfo } from '../../../models/user/User'

import { faEdit, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import useUpdateService from '../../../hooks/useUpdateService'
import { songOccasionInfo } from '../../../models/song/SongOccasion'
import TagLabel from '../../common/components/TagLabel'
import {
  detailPageHeaderDivStyle,
  detailPageInfoContentStyle,
  detailPageInfoDivStyle,
  detailPageInfoTitleStyle,
  detailPageRowStyle,
  pageContentDivStyle,
} from '../../common/styles/ComponentStyles'
import EditSongsModal from './EditSongsModal'

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
    return leadUser.name
  }

  const getServiceTeamList = useCallback(() => {
    if (!service || _.isEmpty(service.assignments)) return <div className={detailPageInfoContentStyle}>-</div>
    return Object.entries(service.assignments).map(([userId, role]) => {
      const user = generateUserDictionary()[userId]
      return (
        <div key={userId} className={detailPageInfoContentStyle}>
          {user.name} ({roleInfo[role].name})
        </div>
      )
    })
  }, [service])

  const getSongList = useCallback(() => {
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
  }, [service])

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
        setShowingEditSongsModal(false)
        setShowingEditSongsModal(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  })

  const { updateService } = useUpdateService()
  const [isShowingEditSongsModal, setShowingEditSongsModal] = useState(false)

  const onSaveService = (service: Service) => {
    if (service === undefined || service.id === undefined) {
      return
    }
    updateService(service.id, service)
  }

  if (!service) {
    return null
  }
  return (
    <>
      <div className={pageContentDivStyle}>
        <div className="w-full mt-4">
          <div>
            {/* reminder */}
            <div className="mx-10 p-4 border border-yellow-400 text-sm rounded-lg bg-yellow-100">
              <FontAwesomeIcon icon={faLightbulb} className="mr-3" />
              You can edit the service details in{' '}
              <a href="/serviceList" className="text-blue-600">
                Service List
              </a>{' '}
              ; update songs list by clicking <FontAwesomeIcon icon={faEdit} />; update music team in{' '}
              <a href="/planner" className="text-blue-600">
                Planner
              </a>
            </div>

            {/* header */}
            <div className={classNames(detailPageHeaderDivStyle, 'justify-between mt-6')}>
              <div className="flex flex-row flex-1">
                <div className="flex-1">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">{getServiceDateString()}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    {service?.title}
                    {_.isEmpty(service.theme) ? '' : ` - ${service.theme}`}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{service?.readings}</p>
                  {service.hasCommunion && <TagLabel title="Communion service" />}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className={detailPageRowStyle}>
                <div className={detailPageInfoDivStyle}>
                  <div className={detailPageInfoTitleStyle}>Preacher</div>
                  <div className={detailPageInfoContentStyle}>{service?.preacher}</div>
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
                  <div className={classNames(detailPageInfoTitleStyle, 'flex flex-row items-center')}>
                    <div>Songs</div>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="ml-2"
                      color="#4f46e5"
                      onClick={() => {
                        setShowingEditSongsModal(true)
                      }}
                    />
                  </div>
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
                <div className={detailPageInfoTitleStyle}>Attachments (fake data, not updated yet)</div>
                <div className="mt-2 text-sm text-gray-900">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">worship_schedule.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4MB</span>
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
        </div>
      </div>
      <div
        className={classNames(
          'fixed z-50 overflow-x-hidden overflow-y-auto h-full inset-0 flex bg-black bg-opacity-30 justify-center items-center',
          { hidden: !isShowingEditSongsModal },
        )}
      >
        <EditSongsModal
          {...{ isShowingEditSongsModal, service, songs, songDictionary: generateSongDictionary() }}
          onSave={onSaveService}
          onDismiss={() => {
            setShowingEditSongsModal(false)
          }}
        />
      </div>
    </>
  )
}
