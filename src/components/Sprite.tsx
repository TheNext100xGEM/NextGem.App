import SpriteAsset from '@assets/img/sprites.svg'

type PropsSprite = {
  id: string
  viewBox?: string
  className?: string
  fill?: string
  stroke?: string
  title?: string
  width?: string | number
  height?: string | number
}

function Sprite({ id, viewBox, className, fill, stroke, title, width, height }: PropsSprite) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width}
      height={height} 
      viewBox={viewBox || '0 0 24 24'}
      fill={fill || 'currentColor'}
      stroke={stroke || 'none'}
      className={className}
    >
      {title && <title>{title}</title>}
      <use href={`${SpriteAsset}#${id}`} />
    </svg>
  )
}

export default Sprite