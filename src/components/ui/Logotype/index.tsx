import './_logotype.scss'
import logo from '@assets/img/logo-next-gem.webp'
import Sprite from '@components/Sprite'
import { SITE_NAME } from '@constants/index'
import classNames from 'classnames'

type PropsLogotype = {
  horizontal?: boolean
}

function Logotype({ horizontal }: PropsLogotype) {
  return (
    <div className={classNames('logotype', horizontal && 'horizontal')}>
      <img src={logo} alt={SITE_NAME} loading="lazy" width="265" height="198" draggable="false" />
      <Sprite 
        id={horizontal ? "logotype-horizontal" : "logotype"} 
        viewBox={horizontal ? "0 0 546 50" : "0 0 208 191"}
        />
    </div>
  )
}

export default Logotype