import './_3D.scss'
import { Loader } from '@components/ui'
import Spline from '@splinetool/react-spline'
import { Suspense } from 'react'

type PropsScene = {
  id: string
}

const Scene = ({ id }: PropsScene) => {
  const url = `https://prod.spline.design/${id}/scene.splinecode`

  return (
    <div className="scene">
      <Suspense fallback={<Loader />}>
        <Spline scene={url} />
      </Suspense>
    </div>
  )
}

export default Scene