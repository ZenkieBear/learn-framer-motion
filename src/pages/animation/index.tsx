import Layout from '@/components/Layout/Layout'
import { Range } from '@/components/Range/Range'
import Showcase from '@/components/Showcase/Showcase'
import {
  animate,
  AnimatePresence,
  delay,
  easeIn,
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
  Variants,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import styles from './index.module.scss'
import utilStyles from '@/styles/utils.module.scss'
import Menu from './Menu/Menu'
import { H1, H2, H3 } from '@/components/Headings/Headings'

const Animation = () => {
  return (
    <Layout>
      <H1>Animation</H1>

      <H2>Simple animations</H2>
      <Showcase style={{ overflow: 'hidden' }}>
        <TheBox />
      </Showcase>

      <H2>Transition</H2>
      <Showcase>
        <motion.div
          className={styles.ball}
          whileHover={{ scale: 2 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        />
      </Showcase>

      <H2>Enter animation</H2>
      <Showcase>
        <motion.div
          className={styles.ball}
          initial={{ scale: 2 }}
          // initial={false} // This will disable enter animation
          animate={{ scale: 1.5 }}
        />
      </Showcase>

      <H2>Exit animations</H2>
      <Showcase>
        <HowExit />
      </Showcase>

      <H2>Keyframes</H2>
      <Showcase>
        <motion.div
          className={styles.ball}
          animate={{
            x: [-50, 50, 50, -50, -50],
            y: [-50, -50, 50, 50, -50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut', // Ease controlls the speed and fluency
            times: [0, 0.2, 0.5, 0.8, 1], // Times define time positions
          }}
        />
        <motion.div
          className={styles.ball}
          animate={{
            x: [-50, 50, 50, -50, -50],
            y: [-50, -50, 50, 50, -50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      </Showcase>

      <H3>Using “null”</H3>
      <Showcase>
        <motion.div
          className={styles.ball}
          whileHover={{ scale: [1.5, 1.4] }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.3,
          }}
          style={{ marginLeft: 10 }}
        />
        <motion.div
          className={styles.ball}
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{
            duration: 0.3,
          }}
        />
      </Showcase>

      <H3>Times</H3>
      <Showcase>
        <svg viewBox='0 0 1000 1000' width={200} height={200}>
          <motion.circle
            style={{ fill: 'white' }}
            cx={500}
            cy={500}
            r={200}
            animate={{ cx: [null, 100, 200] }}
            transition={{ duration: 2, times: [0, 0.4, 1] }}
          />
        </svg>
      </Showcase>

      <H2>Gesture animations</H2>
      <Showcase>
        <motion.button
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.1,
          }}
        >
          Hello
        </motion.button>
      </Showcase>

      <H2>Variants</H2>
      <Showcase
        style={{
          background: 'var(--clr-primary)',
        }}
      >
        <Menu />
      </Showcase>

      <H3>Propagation</H3>
      <Showcase>
        <Propagation />
      </Showcase>

      <H3>Orchestration</H3>
      <Showcase>
        <Orchestration />
      </Showcase>

      <H3>Dynamic variants</H3>
      <Showcase>
        <Dynamic />
      </Showcase>

      <H3>Multiple variants</H3>
      <Showcase>
        <Multiple />
      </Showcase>

      <H2>Manual controls</H2>
      <Showcase>
        <Manual />
      </Showcase>

      <H2>Animate single values</H2>
      <Showcase>
        <Single />
      </Showcase>

      <H2>Animate content</H2>
      <Showcase>
        <Content />
      </Showcase>
    </Layout>
  )
}

const TheBox = () => {
  const [status, setStatus] = useState({
    x: 0,
    y: 0,
    rotate: 0,
  })
  const updateX = (val: number) => {
    // The after will overwrite existed attributes.
    const nextStatus = {
      ...status,
      x: val,
    }
    setStatus(nextStatus)
  }
  const updateY = (val: number) => {
    setStatus({
      ...status,
      y: val,
    })
  }
  const updateRotate = (val: number) => {
    setStatus({
      ...status,
      rotate: val,
    })
  }
  return (
    <div className={styles['flex-ltr']}>
      <motion.div
        className={styles['the-box']}
        animate={{
          ...status,
        }}
        transition={{ type: 'spring' }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Range value={status.x} set={updateX}>
          X
        </Range>
        <Range value={status.y} set={updateY}>
          Y
        </Range>
        <Range value={status.rotate} set={updateRotate}>
          Rotate
        </Range>
      </div>
    </div>
  )
}

const HowExit = () => {
  const [isShow, setIsShow] = useState(true)
  const [count, setCount] = useState(0)

  return (
    <>
      <button
        className={utilStyles.pinTL}
        onClick={() => {
          setIsShow(!isShow)
          setCount(count + 1)
        }}
      >
        {isShow ? 'Show' : 'Hide'}
      </button>
      <AnimatePresence>
        {isShow && (
          <motion.div
            key={count}
            className={styles.ball}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const Propagation = () => {
  const [visible, setVisible] = useState(false)

  const list: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  const item: Variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }

  return (
    <>
      <button
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
        }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      <motion.ul
        className={styles.list}
        variants={list}
        initial='hidden'
        // When parent changes, its children will also change variant status
        animate={visible ? 'visible' : 'hidden'}
      >
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
    </>
  )
}

const Orchestration = () => {
  const [visible, setVisible] = useState(true)

  const list: Variants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1, // This make children animated one-by-one
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.1,
      },
    },
  }
  const item: Variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }

  return (
    <>
      <button
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
        }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      <motion.ul
        className={styles.list}
        variants={list}
        initial='hidden'
        // When parent changes, its children will also change variant status
        animate={visible ? 'visible' : 'hidden'}
      >
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
    </>
  )
}

const items = [1, 2, 3]
const Dynamic = () => {
  const [visible, setVisible] = useState(true)
  const variants: Variants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
  }
  return (
    <>
      <button
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
        }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            custom={i} // the value passed in visible function
            initial='hidden'
            animate={visible ? 'visible' : 'hidden'}
            variants={variants}
          />
        ))}
      </ul>
    </>
  )
}

const Multiple = () => {
  const variants: Variants = {
    hover: {
      background: 'white',
    },
    focus: {
      border: '2px solid var(--clr-primary)',
    },
    active: {
      background: '#eee',
    },
  }
  return (
    <motion.button
      variants={variants}
      whileHover='hover'
      whileTap={['active', 'focus']}
    >
      Halo👋🏼
    </motion.button>
  )
}

const Manual = () => {
  const [played, setPlayed] = useState(false)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animation = async () => {
      await animate(scope.current, { x: played ? 100 : 0 })
      // mention: "li" is ul's children
      animate('li', { opacity: played ? 1 : 0 })
    }
    animation()
  }, [played, animate, scope])

  return (
    <>
      <button onClick={() => setPlayed(!played)}>
        {played ? 'Back' : 'Play'}
      </button>
      <motion.ul
        className={styles.list}
        ref={scope}
        style={{
          x: 0,
        }}
      >
        {items.map(i => (
          <li
            key={i}
            style={{
              opacity: 0,
            }}
          />
        ))}
      </motion.ul>
    </>
  )
}

const Single = () => {
  const [isDown, setIsDown] = useState(false)
  const [scope, animate] = useAnimate()
  const y = useMotionValue(0)

  useEffect(() => {
    const controls = animate(y, isDown ? 50 : -50, {
      type: 'spring',
      stiffness: 2000,
      onComplete: () => {},
    })

    return controls.stop
  }, [isDown, animate, y])

  return (
    <>
      <button onClick={() => setIsDown(!isDown)}>
        {isDown ? 'Up' : 'Down'}
      </button>
      <motion.div className={styles.ball} style={{ y }} />
    </>
  )
}

const Content = () => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const [time, setTime] = useState(0)

  useEffect(() => {
    count.set(0)
    const animation = animate(count, 100, { duration: 10, ease: 'easeInOut' })

    return animation.stop
  })

  return (
    <>
      <button onClick={() => setTime(time + 1)}>Replay</button>
      <motion.h1
        style={{
          color: 'white',
        }}
      >
        {rounded}
      </motion.h1>
    </>
  )
}
export default Animation
