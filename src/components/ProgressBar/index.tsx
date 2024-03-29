import "./_progressbar.scss"
import Magic from "@components/Magic"
import { Corner } from "@components/ui"
import { PropsProgressBar } from "@models/ProgressBar"

const ProgressBar = ({ total, hasMagic }: PropsProgressBar) => {
  total = total === undefined ? 100 : total
  return (
    <div className='ProgressBar-container'>
      <div className='bar-outer_wrapper'>
        <div
          className='bar-inner_wrapper shrinker timelapse'
          style={
            {
              //width: 'calc(45px + ' + total + '%)',
              "--total": `${100 - total}%`
            } as React.CSSProperties
          }
        ></div>
        <div className='bar-percentage'>{total + "%"}</div>
        <div className='bar-gradient' />
        <Corner />
      </div>
      <div
        className='bar-blur'
        style={{ left: "calc(" + total + "% - 75px + 22px)" }}
      />

      <div
        className='magic-container'
        style={{ left: "calc(" + total + "% - 75px + 22px)" }}
      >
        {hasMagic && <Magic />}
      </div>
    </div>
  )
}

export default ProgressBar
