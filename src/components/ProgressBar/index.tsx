import "./_progressbar.scss"
import { PropsProgressBar } from '@models/ProgressBar'
import { Corner } from '@components/ui'
import Magic  from '@components/Magic'

const ProgressBar = (
    { 
        total,
        hasMagic
    }: PropsProgressBar

    ) => {
        total = total === undefined ? 100 : total
  return (
    <div className="ProgressBar-container">
        <div className="bar-outer_wrapper">
            <div className="bar-inner_wrapper" style={{width: 'calc(45px + ' + total + '%)'}}>
                <div className="bar-percentage">{total + '%'}</div>
            </div>

            <Corner />

        </div>
        <div className="bar-blur" style={{left: 'calc(' + total + '% - 75px + 22px)'}}/>

        <div className="magic-container" style={{left: 'calc(' + total + '% - 75px + 22px)'}}>
        {hasMagic && <Magic />}
        </div>
    </div>
  )
}

export default ProgressBar