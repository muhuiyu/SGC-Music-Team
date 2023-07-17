import { PaperClipIcon } from '@heroicons/react/20/solid'
import useService from '../../../api/providers/useService'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import useAllUsers from '../../../api/providers/useAllUsers'
import { roleInfo } from '../../../models/user/User'
import _ from 'lodash'
import useAllSongs from '../../../api/providers/useAllSongs'
import { useMemo } from 'react'
import { songOccasionInfo } from '../../../models/song/SongOccasion'

interface Props {
  serviceId: Service['id']
}

export default function ServiceDetailPageContent({ serviceId }: Props) {
  const { service } = useService(serviceId)

  const { generateUserDictionary } = useAllUsers()
  const { generateSongDictionary } = useAllSongs({ order: 'name' })

  const getServiceLeadName = (): string => {
    if (service?.lead === undefined || _.isEmpty(service.lead)) return '-'
    const leadUser = generateUserDictionary()[service.lead]
    return leadUser.firstName + ' ' + leadUser.lastName
  }

  const getServiceTeamList = () => {
    if (service === undefined || _.isEmpty(service.assignments))
      return <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">-</div>
    return Object.entries(service.assignments).map(([userId, role]) => {
      const user = generateUserDictionary()[userId]
      return (
        <div key={userId} className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          {user.firstName} {user.lastName} ({roleInfo[role].name})
        </div>
      )
    })
  }

  const getSongList = () => {
    if (service === undefined || _.isEmpty(service.songs)) {
      return <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">-</div>
    }
    return service.songs.map((serviceSong) => {
      const song = generateSongDictionary()[serviceSong.songId]
      return (
        <div key={serviceSong.songId} className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
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

  if (service === null) {
    return null
  }
  return (
    <>
      <div className="flex flex-row gap-4 pr-4">
        <div className="w-full mt-4">
          <div className="">
            <h3 className="text-base font-semibold leading-7 text-gray-900 px-10">
              {getServiceDateString()}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">{service?.topic}</p>
          </div>
          <div className="mt-6">
            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Sermon</div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Pastor Jacob</div>
              </div>
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Music lead</div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {getServiceLeadName()}
                </div>
              </div>
            </div>
            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Team</div>
                {getServiceTeamList()}
              </div>
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Songs</div>
                {getSongList()}
              </div>
            </div>
            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Note</div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {getServiceNoteString()}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 py-6 px-10">
              <div className="text-sm font-medium leading-6 text-gray-900">Attachments</div>
              <div className="mt-2 text-sm text-gray-900">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
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
      </div>
    </>
  )
}
