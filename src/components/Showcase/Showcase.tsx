import { ReactNode } from "react";
import styles from './Showcase.module.scss';

const Showcase = ({ style, children }: ShowcaseProps) => {
  return (
    <div
      className={styles.showcase}
      style={style}
    >
      {children}
    </div>
  )
}

export default Showcase