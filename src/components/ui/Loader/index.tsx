import { Icon } from "@iconify/react"
import "./_loader.scss"

function Loader({ big }: { big?: boolean }) {
  return big ? (
    <div className='bigloader'>
      <Icon icon='eos-icons:three-dots-loading' />
    </div>
  ) : (
    <Icon icon='eos-icons:three-dots-loading' />
  )
}

export default Loader
