import _ from 'lodash'
import useSong from '../../../api/providers/useSong'
import { ServiceSong } from '../../../models/song/ServiceSong'
import { SongOccasion, allOccasions, songOccasionInfo } from '../../../models/song/SongOccasion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Song } from '../../../models/song/Song'

interface Props {
  songDictionary: { [id: Song['id']]: Song }
  serviceSong: ServiceSong
  index: number
  numberOfSongs: number
  onRequestChangeOccasion(occasion: SongOccasion): void
  onRequestChangeSong(): void
  onRequestRemoveSong(): void
  onRequestMoveUp(): void
  onRequestMoveDown(): void
}

export default function ServiceSongInput({
  songDictionary,
  serviceSong,
  index,
  numberOfSongs,
  onRequestChangeOccasion,
  onRequestChangeSong,
  onRequestRemoveSong,
  onRequestMoveUp,
  onRequestMoveDown,
}: Props) {
  const song = songDictionary[serviceSong.songId]

  return (
    <div className="flex flex-row gap-4 items-center">
      <select
        name="song"
        id="key"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={serviceSong.occasion}
        onChange={(e) => {
          onRequestChangeOccasion(e.target.value as SongOccasion)
        }}
      >
        {allOccasions.map((occasion) => (
          <option
            key={occasion}
            value={occasion}
            className="text-gray-900 text-sm"
            defaultValue={'worship'}
          >
            {songOccasionInfo[occasion].name}
          </option>
        ))}
      </select>
      {_.isEmpty(serviceSong.songId) || !song ? (
        <button
          type="button"
          className="border-gray-300 border border-dashed px-10 rounded-lg p-2 w-[500px]"
          onClick={onRequestChangeSong}
        >
          Choose song
        </button>
      ) : (
        <button
          type="button"
          className="text-white bg-indigo-600 px-10 rounded-lg p-2 w-[500px]"
          onClick={onRequestChangeSong}
        >
          {_.isEmpty(song.version) ? song.name : `${song?.version} - ${song?.name}`}
        </button>
      )}
      {index !== 0 && (
        <FontAwesomeIcon
          icon={faArrowUp}
          onClick={onRequestMoveUp}
          className="hover:bg-slate-200 rounded-full p-1"
        />
      )}

      {index < numberOfSongs && (
        <FontAwesomeIcon
          icon={faArrowDown}
          onClick={onRequestMoveDown}
          className="hover:bg-slate-200 rounded-full p-1"
        />
      )}
    </div>
  )
}
