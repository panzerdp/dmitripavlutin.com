import { useRef, useEffect } from 'react'
import './CarbonAdsBanner.module.scss'

interface Props {
  scriptSrc: string;
}

export function CarbonAdsBannerLive({ scriptSrc }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.id = '_carbonads_js'
    ref.current.appendChild(script)

    return () => { script.parentElement.removeChild(script) }
  }, [])

  return <div ref={ref} />
}