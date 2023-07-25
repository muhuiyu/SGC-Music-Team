import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import _ from 'lodash'
import { Song } from '../../../models/song/Song'
import {
  detailPageHeaderDivStyle,
  detailPageSecondaryButtonStyle,
  detailPageRowStyle,
  detailPageInfoTitleStyle,
  detailPageInfoDivStyle,
  detailPageInfoContentStyle,
} from '../../common/styles/ComponentStyles'
import YouTubeEmbed from './YouTubeEmbed'
import { chartTypeInfo } from '../../../models/song/Chart'

interface Props {
  song: Song
  lastTimeWithSongString: string
  setEditing(isEditing: boolean): void
}

const sheetTableHeaderStyle = 'text-start text-sm border-gray-300 border p-2 font-semibold'
const sheetTableContentStyle = 'border-gray-300 border p-2 text-sm'

export default function SongDetailPageViewContent({ song, lastTimeWithSongString, setEditing }: Props) {
  const getYouTubeEmbedLink = () => {
    const url = song.songUrlString.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '')
    console.log(url)
    return url
  }
  return (
    <div>
      {/* header */}
      <div className={classNames(detailPageHeaderDivStyle, 'justify-between')}>
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">{song.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{_.isEmpty(song.version) ? '-' : song.version}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{song.tags.join(', ')}</p>
          </div>
        </div>
        <button
          type="button"
          className={detailPageSecondaryButtonStyle}
          onClick={() => {
            setEditing(true)
          }}
        >
          Edit
        </button>
      </div>
      <div className="mt-6">
        <div className={detailPageRowStyle}>
          <div className="flex-1 pr-8">
            <div className={detailPageInfoTitleStyle}>Chart version</div>
            <table className="mt-4 border-collapse w-full">
              <thead>
                <tr>
                  <th className={sheetTableHeaderStyle}>Key</th>
                  <th className={sheetTableHeaderStyle}>Type</th>
                  <th className={sheetTableHeaderStyle}>Download</th>
                </tr>
              </thead>
              <tbody>
                {song.charts.map((chart, index) => (
                  <tr key={index}>
                    <td className={sheetTableContentStyle}>{chart.key}</td>
                    <td className={sheetTableContentStyle}>{chartTypeInfo[chart.type].name}</td>
                    <td className={sheetTableContentStyle}>
                      <a href={chart.url} target="_blank">
                        <FontAwesomeIcon icon={faFileLines} color="#555555" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={detailPageInfoDivStyle}>
              <div className={detailPageInfoTitleStyle}>Note</div>
              <div className={detailPageInfoContentStyle}>-</div>
            </div>

            <div className={detailPageInfoDivStyle}>
              <div className={detailPageInfoTitleStyle}>Last time used when</div>
              <div className={detailPageInfoContentStyle}>{lastTimeWithSongString}</div>
            </div>
          </div>
          {!_.isEmpty(song.songUrlString) && <YouTubeEmbed className="flex-1" embedId="DXDGE_lRI0E" />}
        </div>
      </div>
    </div>
  )
}
