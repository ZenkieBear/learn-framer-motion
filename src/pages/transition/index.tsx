import { Easing, Variants, motion } from 'framer-motion'
import Layout from '@/components/Layout/Layout'
import Showcase from '@/components/Showcase/Showcase'
import styles from './index.module.scss'
import { H1, H2, H3 } from '@/components/Headings/Headings'

const Transition = () => {
  return (
    <Layout>
      <H1>Transition</H1>
      <Showcase refresh={true}>
        <motion.div
          className='ball'
          animate={{ x: 100 }}
          transition={{
            delay: 1,
            type: 'spring',
            stiffness: 100,
          }}
        />
      </Showcase>

      <H2>Value-spefication</H2>
      <Showcase refresh={true} style={{ background: '#22dddd' }}>
        <motion.div
          className='ball'
          style={{ border: 0 }}
          animate={{ scale: 2 }}
          transition={{
            duration: 5, // this will be overwrite
            // delay: 2, // it could be negative
            scale: {
              type: 'spring',
              duration: 1,
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
        />
      </Showcase>

      <H2>Orchestration</H2>
      <p>
        delayChildren, staggerChildren, staggerDirection, repeat, repeatType,
        and repeatDelay
      </p>
      <ShowOrchestration />

      <H2>Tween</H2>
      <ShowTween />

      <H3>ease</H3>
      <Showcase refresh={true}>
        <ul className={styles.eases}>
          <EaseTrack ease='linear' />
          <EaseTrack ease='easeIn' />
          <EaseTrack ease='easeOut' />
          <EaseTrack ease='easeInOut' />
          <EaseTrack ease='circIn' />
          <EaseTrack ease='circOut' />
          <EaseTrack ease='circInOut' />
          <EaseTrack ease='backIn' />
          <EaseTrack ease='backOut' />
          <EaseTrack ease='backInOut' />
          <EaseTrack ease='anticipate' />
        </ul>
      </Showcase>

      <H3>from</H3>
      <Showcase refresh={true}>
        <motion.div
          className='radial-rect'
          animate={{ rotate: 180 }}
          transition={{ from: 90, duration: 2 }} // from 90deg to 180deg, cost 2 seconds.
        />
      </Showcase>

      <H3>times</H3>
      <ShowTimes />
    </Layout>
  )
}

const ShowOrchestration = () => {
  const container: Variants = {
    hidden: {
      opacity: 0.5,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
        staggerDirection: -1, // -1 means from the last to the first
        // when: 'afterChildren', // to finish children transitions before starting this transition
        duration: 1,
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 0.5,
      },
    },
  }
  const item: Variants = {
    hidden: {
      opacity: 0.0,
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  }
  return (
    <Showcase
      refresh={true}
      style={{
        background: 'repeating-linear-gradient(298deg, #5E2FB2, #3dc7ff)',
      }}
    >
      <motion.ul
        className={styles.menu}
        variants={container}
        initial='hidden'
        animate='show'
      >
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
    </Showcase>
  )
}

const ShowTween = () => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        type: 'tween', // the default type
        duration: 2,
      },
    },
  }

  return (
    <Showcase refresh={true}>
      <svg viewBox='0 0 100 100' width={100}>
        <motion.path
          // The path from MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
          d='M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z'
          fill='pink'
          variants={variants}
          initial='hidden'
          animate='show'
        />
      </svg>
    </Showcase>
  )
}

const EaseTrack = ({ ease }: { ease: Easing | Easing[] }) => {
  return (
    <li>
      <span style={{ width: 100, display: 'inline-block', color: 'white' }}>
        {ease.toString()}:
      </span>
      <motion.div className={styles['ease-track']}>
        <motion.div
          transition={{
            ease: ease,
            duration: 1,
          }}
          animate={{ x: 90 }}
        />
      </motion.div>
    </li>
  )
}

const ShowTimes = ({ radius = 100 }: { radius?: number }) => (
  <Showcase refresh={true}>
    <motion.div
      className='ball'
      style={{ width: 50, height: 50 }}
      animate={{
        // 60˚ = π / 3 rad
        x: [
          0,
          0,
          radius * Math.sin(Math.PI / 3),
          -1 * radius * Math.sin(Math.PI / 3),
          0,
          0,
        ],
        y: [
          0,
          -1 * radius,
          0.5 * radius, // cos60˚ = 1/2 = 0.5
          0.5 * radius,
          -1 * radius,
          0,
        ],
      }}
      transition={{
        duration: 2,
        times: [0, 0.1, 0.4, 0.5, 0.8, 1],
      }}
    />
  </Showcase>
)

export default Transition
