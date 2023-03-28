interface ImgShadowProps {
  children: JSX.Element
}

import * as styles from './ImgShadow.module.scss'

export function ImgShadow({ children }: ImgShadowProps) {
  return (
    <div className={styles.imgShadow}>
      {children}
    </div>
  )
}