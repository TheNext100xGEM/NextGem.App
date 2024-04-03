import { Path, Svg } from "@react-pdf/renderer"

export const GemIcon = () => {
  return (
    <Svg width='20' height='20' viewBox='0 0 32 32' fill='none'>
      <Path
        d='M9.5 5.5H22.5L28.5 12.5L16 26.5L3.5 12.5L9.5 5.5Z'
        stroke='white'
        strokeWidth={3}
        strokeLineCap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
