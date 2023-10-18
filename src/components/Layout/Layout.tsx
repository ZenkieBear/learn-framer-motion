import routes from '@/lib/routes'
import Link from 'next/link'
import { RefObject, useEffect, useRef, useState } from 'react'
import styles from './Layout.module.scss'
import { motion, Variants } from 'framer-motion'
import { triagle } from '@/lib/paths'

const Layout = ({ isHome = false, children }: LayoutProps) => {
  const backButton = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.container}>
      {!isHome && (
        <div className={styles.navbar}>
          <Navbar routes={routes} />
        </div>
      )}
      <div className={styles.main} ref={backButton}>
        <div className={styles.content}>
          {!isHome && (
            <div>
              <Link href={routes[0].path}>←</Link>
            </div>
          )}
          <ToTop top={backButton} />
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

const ToTopVariants: Variants = {
  hide: {
    rotate: 180,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  show: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.05,
    },
  },
}
const ToTop = ({ top }: { top: RefObject<HTMLElement> }) => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y > 100) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }
    handleScroll()
    window.addEventListener('scrollend', handleScroll)
    return () => window.removeEventListener('scrollend', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      className={styles['to-top']}
      variants={ToTopVariants}
      initial='hide'
      animate={isShow ? 'show' : 'hide'}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <svg
        width={15}
        height={15}
        viewBox='0 0 20 20'
        style={{ rotate: '180deg' }}
      >
        <path d={triagle} />
      </svg>
    </motion.button>
  )
}

export default Layout
