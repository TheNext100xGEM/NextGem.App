import "./_notfound.scss"
import logo from "@assets/img/logo-next-gem.webp"
import { Button, Picture } from "@components/ui"
import { SITE_NAME } from "@constants/index"

const NotFound = () => {
  return (
    <div className='not-found wrapper'>
      <div className='not-found__image'>
        <Picture
          src={logo}
          alt={SITE_NAME}
          width='265'
          height='198'
          draggable='false'
        />
      </div>

      <h1>Oops...</h1>
      <h5>Sorry, we cannot find the page you're looking for.</h5>

      <Button href='/' icon='carbon:text-mining-applier'>
        Back to home
      </Button>
    </div>
  )
}

export default NotFound
