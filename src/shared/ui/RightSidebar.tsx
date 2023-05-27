import * as styles from './RightSidebar.module.scss'

interface RightSidebar {
  children: JSX.Element | JSX.Element[]
}

export function RightSidebar({ children }: RightSidebar): JSX.Element {
  return (
    <div className={styles.rightSidebar}>
      {children}
    </div>
  )
}