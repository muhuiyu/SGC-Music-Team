import UnderConstructionView from '../../common/components/UnderConstructionView'
import { pageContentDivStyle } from '../../common/styles/ComponentStyles'

interface Props {}

export default function SettingsPageContent(props: Props) {
  return (
    <>
      <div className={pageContentDivStyle}>
        <UnderConstructionView />
      </div>
    </>
  )
}
