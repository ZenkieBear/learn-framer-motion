import { Variants, motion } from 'framer-motion'
import { RefObject, useEffect, useState } from 'react'
import styles from './Scroll2TopButton.module.scss'
import { triagle } from '@/lib/paths'

const Scroll2TopVariants: Variants = {
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

interface Scroll2TopProps {
  /**
   * The container will be listened for scrolling
   */
  containerRef: RefObject<HTMLDivElement>
  /**
   * When scrolled bigger than this value, button will show
   */
  topDistance?: number
}
const Scroll2TopButton = ({
  containerRef,
  topDistance = 120,
}: Scroll2TopProps) => {
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    const handleScroll = () => {
      if (!container) return null
      if (container.scrollTop > topDistance) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }
    handleScroll()
    container?.addEventListener('scrollend', handleScroll)
    return () => container?.removeEventListener('scrollend', handleScroll)
  }, [containerRef])

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      className={styles['to-top']}
      variants={Scroll2TopVariants}
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

export default Scroll2TopButton
