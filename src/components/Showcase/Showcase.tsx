import { CSSProperties, ReactNode } from 'react'
import styles from './Showcase.module.scss'

interface ShowcaseProps {
  children: ReactNode
  style?: CSSProperties
}

const Showcase = ({ style, children }: ShowcaseProps) => {
  return (
    <div className={styles.showcase} style={style}>
      {children}
    </div>
  )
}

export default Showcase
