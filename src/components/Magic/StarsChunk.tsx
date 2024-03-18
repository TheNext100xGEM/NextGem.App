import Star from './Star.jsx';
import './_star.scss'



export default function StarsChunk({stars} : {stars: any}) {
  return (
    stars.map((x : any) => {
        return <Star starObject={x} key={x.id}/>
    })
  )
}
