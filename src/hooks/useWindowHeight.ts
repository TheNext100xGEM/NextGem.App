import { useEffect, useState } from 'react'

const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight)
  const handleResize = () => setHeight(window.innerHeight)

  useEffect(() => {
    window.setTimeout(() => {
      setHeight(window.innerHeight);
    }, 100)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => document.documentElement.style.setProperty('--height-window', `${height}px`), [height])

  return height
}

export default useWindowHeight