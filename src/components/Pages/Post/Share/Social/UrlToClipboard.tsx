import { useEffect, useState } from 'react'
import { ShareButton } from '../Button'
import * as styles from './UrlToClipboard.module.scss'
import classNames from 'classnames'

interface Props {
  url: string;
  tooltipPosition?: 'left' | 'right' | 'bottom' | 'top'
}

export const ANIMATION_TIME = 2000

export function UrlToClipboard({ url, tooltipPosition = 'left' }: Props): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false)

  const onClick = () => {
    navigator.clipboard.writeText(url)
    setShowTooltip(true)
  }

  useEffect(() => {
    if (!showTooltip) {
      return
    }
    const timeoutId = setTimeout(() => setShowTooltip(false), ANIMATION_TIME)
    return () => clearTimeout(timeoutId)
  }, [showTooltip])

  const className = classNames(styles.button, { [styles.show]: showTooltip })

  return (
    <div className={styles.urlToClipboard}>
      <ShareButton
        tooltip="Link Copied"
        tooltip-position={tooltipPosition}
        title="Copy link to clipboard"
        className={className}
        onClick={onClick}
      />
    </div>
  )
}