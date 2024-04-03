import { Path, Svg } from "@react-pdf/renderer"

export const CornerTopLeft = () => {
  return (
    <Svg
      style={{
        position: "absolute",
        top: 0,
        left: 0
      }}
      width='25'
      height='25'
      viewBox='0 0 50 50'
      fill='none'
    >
      <Path
        d="M0 1.79881e-06L50 0L1.64247e-06 50L0 1.79881e-06Z"
        fill='#09090A'
        stroke='#09090A'
      />
    </Svg>
    
  )
}

export const CornerTopRight = () => {
  return (
    <Svg
      style={{
        position: "absolute",
        top: 0,
        right: 0
      }}
      width='23'
      height='23'
      viewBox='0 0 46 46'
      fill='none'
    >
      <Path
        d="M50 0L50 50L0 1.64247e-06L50 0Z"
        fill='#09090A'
        stroke='#09090A'
      />
    </Svg>
  )
}

export const CornerBottomRight = () => {
  return (
    <Svg
      style={{
        position: "absolute",
        bottom: 0,
        right: 0
      }}
      width='25'
      height='25'
      viewBox='0 0 50 50'
      fill='none'
    >
      <Path
        d="M50 50H0L50 0V50Z"
        fill='#09090A'
        stroke='#09090A'
      />
    </Svg>
    
  )
}

export const CornerBottomLeft = () => {
  return (
    <Svg
      style={{
        position: "absolute",
        bottom: 0,
        left: 0
      }}
      width='25'
      height='25'
      viewBox='0 0 50 50'
      fill='none'
    >
      <Path
        d="M3.8147e-06 50L0 0L50 50H3.8147e-06Z"
        fill='#09090A'
        stroke='#09090A'
      />
    </Svg>
    
  )
}
