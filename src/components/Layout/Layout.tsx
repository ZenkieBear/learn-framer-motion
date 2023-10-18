import routes from '@/lib/routes'
import Link from 'next/link'
import { ReactNode, useRef } from 'react'
import styles from './Layout.module.scss'
import Scroll2TopButton from '@/components/ScrollTopButton/Scroll2TopButton'
import { MotionValue, useScroll } from 'framer-motion'

type LayoutProps = {
  isHome?: boolean
  children: ReactNode
}
const Layout = ({ isHome = false, children }: LayoutProps) => {
  const ref = useRef(null)

  return (
    <div className={styles.container}>
      {!isHome && (
        <div className={styles.navbar}>
          <Navbar routes={routes} />
        </div>
      )}
      <div className={styles.main} ref={ref}>
        <div className={styles.content}>
          {!isHome && (
            <div>
              <Link href={routes[0].path}>←</Link>
            </div>
          )}
          <Scroll2TopButton containerRef={ref} />
          {children}
        </div>
      </div>
    </div>
  )
}

const Navbar = ({ routes }: { routes: Route[] }) => {
  return (
    <ul className={styles.nav}>
      {routes.map(r =>
        r.children ? (
          <li key={r.path} className={styles.parent}>
            <div className={styles.parentTitle}>{r.name}</div>
            <Navbar routes={r.children} />
          </li>
        ) : (
          <Link key={r.path} className={styles.link} href={r.path}>
            {r.name}
          </Link>
        ),
      )}
    </ul>
  )
}

export default Layout
