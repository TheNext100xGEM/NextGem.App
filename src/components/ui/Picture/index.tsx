import React, { HTMLAttributes } from "react"
import LazyLoad from "react-lazyload"

interface PictureProps extends HTMLAttributes<HTMLPictureElement> {
  src?: string
  width?: string
  height?: string
  alt?: string
  className?: string
  classPicture?: string
}

const Picture: React.FC<PictureProps> = ({
  src,
  width,
  height,
  alt,
  className,
  classPicture
}) => {
  return (
    <LazyLoad height={100} offset={100} once>
      <picture className={classPicture}>
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={className}
          draggable='false'
          loading='lazy'
        />
      </picture>
    </LazyLoad>
  )
}

export default Picture
