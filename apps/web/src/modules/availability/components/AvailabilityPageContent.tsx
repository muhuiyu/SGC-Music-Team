import classNames from 'classnames'
import UnderConstructionView from '../../common/components/UnderConstructionView'
import { pageContentDivStyle } from '../../common/styles/ComponentStyles'

interface Props {}

export default function AvailabilityPageContent(props: Props) {
  return (
    <div className={classNames(pageContentDivStyle, 'h-full')}>
      <UnderConstructionView />
    </div>
  )
}
