import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import Service from '../../../models/service/Service'
import { Song } from '../../../models/song/Song'
import ServiceSongInput from './ServiceSongInput'

interface Props {
  service: Service
  isShowingEditSongsModal: boolean
  songs: Song[] // library
  songDictionary: { [id: Song['id']]: Song }
  onSave(service: Service): void
  onDismiss(): void
  className?: string
}

export default function EditSongsModal({ service, songs, songDictionary, onSave, onDismiss, className }: Props) {
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

  const onChangeSongs = (songs: Song['id'][]) => {
    // TODO:
    // updateServiceDetail('tags', tags)
  }

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

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedService?.dateTime)
  }, [resolvedService])

  return (
    <div className={classNames('relative w-full max-w-4xl max-h-full', className)}>
      <div className="relative bg-white rounded-lg shadow ">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={() => {
              clearResolvedService()
              onDismiss()
            }}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Select song</h3>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-2 mt-4">
              {resolvedService?.songs.map((song, index) => (
                <ServiceSongInput
                  key={index}
                  {...{
                    songs,
                    serviceSong: song,
                    index,
                    songDictionary,
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
                  onRequestChangeSong={(songId) => {
                    const updatedSongs = [...resolvedService.songs]
                    updatedSongs[index] = {
                      ...updatedSongs[index],
                      songId: songId ?? '',
                    }
                    updateServiceDetail('songs', updatedSongs)
                  }}
                  onRequestRemoveSong={() => {
                    const updatedSongs = resolvedService.songs
                    updatedSongs.splice(index, 1)
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
    </div>
  )
}
