import { useScroll, useSpring, motion, MotionValue } from 'framer-motion'
import styles from './index.module.scss'
import { useRef, useState } from 'react'

const ProgressIndicator = () => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ container: ref })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className={styles.progress}>
      <motion.div className={styles['progress-bar']} style={{ scaleX }} />
      <div ref={ref} className={styles.content}>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
          nesciunt ratione ab blanditiis. Sint odit ullam beatae, maiores omnis
          ipsam, facere, aliquid illum at vero ad laborum optio. Eveniet,
          blanditiis?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
          nesciunt ratione ab blanditiis. Sint odit ullam beatae, maiores omnis
          ipsam, facere, aliquid illum at vero ad laborum optio. Eveniet,
          blanditiis?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
          nesciunt ratione ab blanditiis. Sint odit ullam beatae, maiores omnis
          ipsam, facere, aliquid illum at vero ad laborum optio. Eveniet,
          blanditiis?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
          nesciunt ratione ab blanditiis. Sint odit ullam beatae, maiores omnis
          ipsam, facere, aliquid illum at vero ad laborum optio. Eveniet,
          blanditiis?
        </p>
      </div>
    </div>
  )
}

export default ProgressIndicator
