import {
  Easing,
  TargetAndTransition,
  Variants,
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from 'framer-motion'
import Layout from '@/components/Layout/Layout'
import Showcase from '@/components/Showcase/Showcase'
import styles from './index.module.scss'
import { H1, H2, H3 } from '@/components/Headings/Headings'
import { useRef, useState } from 'react'
import { useFollowPointer } from '@/lib/hooks'
import Spacer from '@/components/Spacer'
import Popup from '@/components/Popup/Popup'

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
      <H2>Spring</H2>
      <p>stiffness, damping, or mass</p>
      <ShowSpring />
      <Spacer />
      <p>duration + bounce</p>
      <ShowBounce />
      <p>
        <b>Note:</b> bounce and duration will be overridden if stiffness,
        damping or mass are set.
      </p>
      <H3>damping</H3>
      <Showcase refresh={true}>
        <motion.a
          animate={{ rotate: 180 }}
          transition={{ type: 'spring', damping: 2 }}
        >
          Look at here
        </motion.a>
      </Showcase>
      <H3>mass</H3>
      <Showcase refresh={true}>
        <svg width={100} height={100}>
          <filter id='feTurbulence'>
            <motion.feTurbulence
              initial={{ baseFrequency: 0.025 }}
              animate={{ baseFrequency: 1 }}
              style={{ width: 100, height: 100 }}
              // the mass larger, the animation look lazier
              transition={{ type: 'spring', mass: 20 }}
            />
          </filter>

          <motion.circle
            cx='50'
            cy='50'
            r='50'
            filter='url(#feTurbulence)'
            initial={{ x: 0, y: 0 }}
          />
        </svg>
      </Showcase>
      <H3>stiffness</H3>
      <Showcase refresh={true}>
        <motion.section
          animate={{ rotate: 180 }}
          transition={{ type: 'spring', stiffness: 2000 }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
          praesentium soluta quasi ratione enim, velit iusto modi dolores autem
          qui doloremque recusandae ut quae corrupti odio ipsa error libero
          possimus.
        </motion.section>
      </Showcase>
      <H3>velocity</H3>
      <ShowVelocity />
      <H3>restSpeed & restDelta</H3>
      <Showcase refresh={true}>
        <motion.div
          className='ball'
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 10,
            restSpeed: 8000,
            restDelta: 50,
          }}
        />
      </Showcase>
      <H2>Inertia</H2>
      <Showcase refresh>
        <motion.div
          className='radial-rect'
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ type: 'inertia', velocity: 100 }}
        />
        <motion.div
          className='radial-rect'
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ type: 'inertia', velocity: 400 }}
        />
        <motion.div
          className='radial-rect'
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ type: 'inertia', velocity: 800 }}
        />
      </Showcase>
      <H3>modifyTarget</H3>
      <Showcase
        refresh
        style={{
          padding: 0,
          display: 'block',
          background:
            'repeating-linear-gradient(0deg, transparent 0, transparent 99px, white 100px), repeating-linear-gradient(90deg, transparent 0, transparent 99px, white 100px) black',
          // background: 'repeating-linear-gradient(0deg, transparent 0, black 99px, #fff 100px), repeating-linear-gradient(90deg, transparent 0, var(--clr-primary), #ebedff 100px) black'
        }}
      >
        <motion.div
          className='ball'
          drag
          dragTransition={{
            power: 0,
            modifyTarget: target => Math.round(target / 100) * 100,
            timeConstant: 100,
          }}
        />
      </Showcase>
      <H3>bounceStiffness</H3>
      <Showcase refresh>
        <p>Drag them away</p>
        <motion.div
          className='ball'
          drag
          dragTransition={{
            min: 0,
            max: 100,
          }}
        />
        <motion.div
          className='ball'
          drag
          dragTransition={{
            min: 0,
            max: 100,
            bounceStiffness: 1000,
          }}
        />
      </Showcase>
      <H3>bounceDamping</H3>
      <Showcase refresh>
        <p>Drag them away</p>
        <motion.div
          className='ball'
          drag
          dragTransition={{
            min: 0,
            max: 100,
          }}
        />
        <motion.div
          className='ball'
          drag
          dragTransition={{
            min: 0,
            max: 100,
            bounceDamping: 8,
          }}
        />
      </Showcase>
      <H3>power</H3>
      <Showcase refresh>
        <p>Drag them away</p>
        <motion.div className='ball' drag dragTransition={{ power: 1 }} />
        <motion.div className='ball' drag dragTransition={{ power: 0.2 }} />
      </Showcase>
      <H3>timeConstant</H3>
      <Showcase refresh>
        <p>Drag them away</p>
        <motion.div className='ball' drag />
        <motion.div
          className='ball'
          drag
          dragTransition={{ timeConstant: 200 }}
        />
      </Showcase>
      <H3>restDelta</H3>
      End the animation if the distance to the animation target is below this
      value.
      <Showcase refresh>
        <p>Drag them away</p>
        <motion.div className='ball' drag />
        <motion.div className='ball' drag dragTransition={{ restDelta: 100 }} />
      </Showcase>
      <H3>min & max</H3>
      <Showcase>
        <motion.div
          className='ball'
          drag
          dragTransition={{ min: -100, max: 100 }}
        />
      </Showcase>
      <H2>Miscellaneous</H2>
      <Miscellaneous />
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

const ShowSpring = () => {
  const ref = useRef(null)
  const { x, y } = useFollowPointer(ref)

  return (
    <Showcase style={{ overflow: 'hidden' }} containerRef={ref}>
      <motion.div
        className='ball'
        style={{
          width: 150,
          height: 150,
          background: `var(--clr-primary)`,
        }}
        animate={{ x, y }}
        transition={{
          type: 'spring',
          damping: 3,
          stiffness: 50,
          restDelta: 0.001,
        }}
      />
    </Showcase>
  )
}

const ShowBounce = () => {
  return (
    <Showcase refresh={true}>
      <motion.div
        className='ball'
        initial={{
          y: -100,
        }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          duration: 0.8,
          bounce: 0.8,
        }}
      />
    </Showcase>
  )
}

const ShowVelocity = () => {
  return (
    <Showcase refresh={true}>
      <motion.div
        className='ball'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          velocity: 1000, // faster initial velocity
        }}
      />
      <motion.div
        className='ball'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          velocity: 1, // slower
        }}
      />
    </Showcase>
  )
}

const show: TargetAndTransition = {
  opacity: 1,
  display: 'block',
}
const hide: TargetAndTransition = {
  opacity: 0,
  transition: { duration: 1 },
  transitionEnd: { display: 'none' },
}

const Miscellaneous = () => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Showcase>
      <motion.div className='ball' animate={isVisible ? show : hide} />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'Hide' : 'Show'}
      </motion.button>
    </Showcase>
  )
}

export default Transition
