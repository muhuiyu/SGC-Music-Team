import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickButton(): void
}

export default function DashboardNotification({ onClickButton }: Props) {
  return (
    <div className="w-full pr-8 mb-5">
      <div className="flex flex-row items-center gap-4 rounded-sm bg-blue-500 text-white w-full p-4 mr-10">
        <FontAwesomeIcon icon={faBell} />
        <p>One quick thing: please update your availability for the next two months!</p>
        <button className="underline" onClick={onClickButton}>
          Edit Now
        </button>
      </div>
    </div>
  )
}
