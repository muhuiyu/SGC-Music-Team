import { Song } from '../../../models/song/Song'
import useSong from '../../../api/providers/useSong'
import _ from 'lodash'
import { LinkOutlined, YouTube } from '@material-ui/icons'
import Service, { getFormattedLocalString } from '../../../models/service/Service'
import { DateTime } from 'luxon'
import useAllServicesWithFilter from '../../../api/providers/useAllServicesWithFilter'
import useAllServices from '../../../api/providers/useAllServices'

interface Props {
  songId: Song['id']
}

export default function SongDetailPageContent({ songId }: Props) {
  const { song } = useSong(songId)
  const { services } = useAllServices()

  function getLastTimeWithSongString(): string {
    const servicesWithSong = services.filter((service) =>
      service.songs.some((song) => song.songId === songId),
    )

    const sortedServices = _.sortBy(servicesWithSong, (a) => a.dateTime)

    if (_.isEmpty(sortedServices)) {
      return '-'
    } else {
      return getFormattedLocalString(sortedServices[0].dateTime)
    }
  }

  if (!song) {
    return null
  }

  return (
    <>
      <div className="flex flex-row gap-4 pr-4">
        <div className="w-full mt-4">
          <div className="">
            <h3 className="text-base font-semibold leading-7 text-gray-900 px-10">{song.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">
              {_.isEmpty(song.version) ? '-' : song.version}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">
              {song.tags.join(', ')}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Key</div>
                <div className="mt-2 text-sm leading-6 text-gray-700">{song.key}</div>
              </div>
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Tempo</div>
                <div className="mt-2 text-sm leading-6 text-gray-700">{song.tempo}</div>
              </div>
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Song Link</div>
                <div className="mt-2 text-sm leading-6 text-gray-500 whitespace-nowrap">
                  {!_.isEmpty(song.songUrlString) && (
                    <a href={song.songUrlString}>
                      <YouTube htmlColor="red" />{' '}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Sheet Link</div>
                <div className="mt-2 text-sm leading-6 text-gray-500 whitespace-nowrap">
                  {!_.isEmpty(song.sheetUrlString) && (
                    <a href={song.sheetUrlString}>
                      <LinkOutlined />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">Note</div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">-</div>
              </div>
            </div>
            <div className="flex flex-row px-10">
              <div className="flex-1 py-6 border-t border-gray-100">
                <div className="text-sm font-medium leading-6 text-gray-900">
                  Last time used when
                </div>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {getLastTimeWithSongString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
