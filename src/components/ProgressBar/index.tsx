import "./_progressbar.scss"
import { PropsProgressBar } from '@models/ProgressBar'
import ProgressBarInternal from "@ramonak/react-progress-bar";
import { Corner } from '@components/ui'

const ProgressBar = (
    { 
        total,
        hasMagic
    }: PropsProgressBar

    ) => {
        total = total || 100
  return (
    <div className="bar-outer_wrapper">
        <div className="bar-inner_wrapper">
            <div className="bar-inner_slant" />

        </div>
    
        <Corner />
        <div className="single-corner left" />
        <div className="single-corner right" />
    </div>
  )
}

export default ProgressBar