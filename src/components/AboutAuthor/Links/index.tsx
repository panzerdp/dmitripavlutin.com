import * as styles from './index.module.scss';

interface AuthorLinksProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export default function AuthorLinks({ children, className }: AuthorLinksProps) {
  return (
    <div className={`${styles.authorLinks} ${className ? className : ''}`}>
      {children}
    </div>
  )
}