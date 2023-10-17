import { H1, H2 } from '@/components/Headings/Headings'
import Layout from '@/components/Layout/Layout'
import Showcase from '@/components/Showcase/Showcase'
import { plus } from '@/lib/paths'
import { PanInfo, Variants, motion, useDragControls } from 'framer-motion'
import { PointerEventHandler, useRef, useState } from 'react'
import styles from './index.module.scss'

const Gestures = () => {
  return (
    <Layout>
      <H1>Gestures</H1>
      <H1>Animation helpers</H1>
      <Showcase>
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          Hover & tap on me
        </motion.button>
        <SpreadButton />
      </Showcase>

      <H2>Propagation</H2>
      <Showcase>
        <StopPropagation />
      </Showcase>

      <H1>Hover</H1>
      <Showcase>
        <ShowHover />
      </Showcase>

      <H1>Focus</H1>
      <Showcase>
        <motion.a
          className={styles['radial-button']}
          whileFocus={{
            border: '2px dashed white',
            outline: 'none',
          }}
          href='#'
        >
          Hi
        </motion.a>
      </Showcase>

      <H1>Tap</H1>
      <Showcase>
        <ShowTap />
      </Showcase>

      <H1>Pan</H1>
      <Showcase
        style={{
          background: 'linear-gradient(45deg, #2fdf67, #006cff)',
          // background: 'url(https://picsum.photos/600/300) no-repeat'
        }}
      >
        <ShowPan />
      </Showcase>

      <H1>Drag</H1>
      <Showcase>
        <motion.div
          className={styles.ball}
          drag='x'
          whileDrag={{ scale: 0.8 }}
        />
      </Showcase>

      <H2>Drag constraint with ref</H2>
      <Showcase>
        <DragRef />
      </Showcase>

      <H2>Back to the origin</H2>
      <Showcase>
        <LetItBack />
      </Showcase>

      <H2>Drag elastic</H2>
      <Showcase>
        <HowFarCanLeave />
      </Showcase>

      <H2>Drag momentum</H2>
      <Showcase>
        <Momentum />
      </Showcase>

      <H2>Drag transition</H2>
      <Showcase>
        <DragTransition />
      </Showcase>

      <H2>Drag propagation</H2>
      <Showcase>
        <PropagationToChildren />
      </Showcase>

      <H2>Drag controls</H2>
      <Showcase>
        <VideoController />
      </Showcase>
    </Layout>
  )
}

const SpreadButton = () => {
  const buttonVariants: Variants = {
    tap: {
      scale: 0.9,
    },
  }
  const iconVariants: Variants = {
    tap: {
      rotate: '45deg',
      scale: 2,
      strokeWidth: 3,
    },
  }
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap='tap'
      variants={buttonVariants}
    >
      <svg width={18} height={18} viewBox='0 0 48 48'>
        <motion.path
          d={plus}
          stroke='#000'
          strokeWidth={5}
          variants={iconVariants}
        />
      </svg>
    </motion.button>
  )
}

const StopPropagation = () => {
  return (
    <motion.div
      style={{
        padding: 20,
        background: '#fff',
      }}
      whileTap={{ scale: 2 }}
    >
      <motion.button
        onPointerDownCapture={e => e.stopPropagation()}
        whileHover={{ scale: 1.2 }}
        whileTap={{ backgroundColor: '#000' }}
        initial={{ backgroundColor: 'skyblue' }}
        drag
      >
        Click me
      </motion.button>
    </motion.div>
  )
}

const ShowHover = () => {
  const [hoverEvent, setHoverEvent] = useState('none')
  const [mouseEvent, setMouseEvent] = useState('none')

  return (
    <>
      <div style={{ color: 'white' }}>Try pc and mobile devices</div>
      <motion.a
        className={styles['radial-button']}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        onHoverStart={() => setHoverEvent('onHoverStart')}
        onHoverEnd={() => setHoverEvent('onHoverEnd')}
      >
        Event: {hoverEvent}
      </motion.a>
      <motion.a
        className={styles['radial-button']}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        onMouseEnter={() => setMouseEvent('onMouseIn')}
        onMouseLeave={() => setMouseEvent('onMouseLeave')}
      >
        Event: {mouseEvent}
      </motion.a>
    </>
  )
}

const ShowTap = () => {
  const [event, setEvent] = useState('initialize')
  return (
    <>
      <motion.a
        className={styles['radial-button']}
        style={{ background: 'orange' }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 12,
        }}
        onTap={() => setEvent('tap')}
        onTapCancel={() => setEvent('tap cancel')}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        {event}
      </motion.a>
    </>
  )
}

const ShowPan = () => {
  const [isOn, setIsOn] = useState(false)

  const handlePan = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (isOn && info.offset.x < -30) {
      setIsOn(false)
    }
    if (!isOn && info.offset.x > 30) {
      setIsOn(true)
    }
  }

  return (
    <div
      className={styles.switch}
      style={{
        justifyContent: isOn ? 'flex-end' : 'flex-start',
      }}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        className={styles['trigger']}
        onPanEnd={handlePan}
        layout
        drag='x'
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        whileTap={{
          cursor: 'grab',
        }}
        // ↓ it might be a bug, by adding this drag gesture animated smooth
        transition={{}}
      />
    </div>
  )
}

const DragRef = () => {
  const ref = useRef(null)

  return (
    <div className={styles['drag-container']} ref={ref}>
      <motion.div drag dragConstraints={ref} />
    </div>
  )
}

const LetItBack = () => {
  return <motion.div className={styles.ball} drag dragSnapToOrigin={true} />
}

const HowFarCanLeave = () => {
  return (
    <>
      <motion.div
        className={styles.ball}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
      />
      <motion.div
        className={styles.ball}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
      />
      <motion.div
        className={styles.ball}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
      />
    </>
  )
}

const Momentum = () => {
  return (
    <>
      <motion.div
        className={styles.ball}
        drag='x'
        dragConstraints={{ left: 0, right: 300 }}
        dragMomentum={true}
      />
      <motion.div
        className={styles.ball}
        drag='x'
        dragConstraints={{ left: 0, right: 300 }}
        dragMomentum={false}
      />
    </>
  )
}

const DragTransition = () => {
  return (
    <motion.div
      className={styles.ball}
      drag
      dragSnapToOrigin={true}
      dragTransition={{ bounceStiffness: 50, bounceDamping: 1 }}
    />
  )
}

const PropagationToChildren = () => {
  return (
    <>
      <motion.div className={styles.ball} drag='y'>
        <motion.div className={styles.ball} drag='y' />
      </motion.div>
      <motion.div
        className={styles.ball}
        drag='y'
        // drag parent, children will move
        // drag children, parent will move
        dragPropagation
      >
        <motion.div className={styles.ball} drag='y' />
      </motion.div>
    </>
  )
}

const VideoController = () => {
  const dragControls = useDragControls()
  const track = useRef(null)

  const thumbVariants: Variants = {
    hover: {
      scale: 1.5,
      transition: {
        type: 'spring',
      },
    },
    init: {
      scale: 1,
    },
  }

  const startDrag: PointerEventHandler = e => {
    dragControls.start(e, { snapToCursor: true })
  }

  return (
    // you can pressing down on the bar and move
    <motion.div
      className={styles['progress-track']}
      ref={track}
      onPointerDown={startDrag}
      whileHover={{ '--track-height': '4px' }}
    >
      <motion.div
        className={styles.thumb}
        variants={thumbVariants}
        whileHover='hover'
        whileTap='init'
        whileDrag='init'
        drag='x'
        dragConstraints={track}
        dragControls={dragControls}
        dragMomentum={false}
        // the thumb don’t need to listen drag event
        dragListener={false}
        onDrag={(e, info) => console.log(info.point.x, info.point.y)}
        onDirectionLock={axis => console.log(axis)}
      />
    </motion.div>
  )
}
export default Gestures
