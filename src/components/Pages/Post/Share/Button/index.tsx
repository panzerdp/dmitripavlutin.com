import * as styles from './index.module.scss'

interface ShareButtonProps {
  className?: string;
  [x: string]: any;
}

export default function ShareButton({ className = '', ...restProps }: ShareButtonProps) {
  return <a {...restProps} className={`${className} ${styles.share}`} />
}
