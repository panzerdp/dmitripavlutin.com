import * as styles from './index.module.scss'

interface ShareButtonProps {
  className?: string;
  [x: string]: any;
}

export function ShareLink({ className = '', ...restProps }: ShareButtonProps) {
  return <a {...restProps} className={`${className} ${styles.share}`} />
}

export function ShareButton({ className = '', ...restProps }: ShareButtonProps) {
  return <button {...restProps} className={`${className} ${styles.share}`} />
}