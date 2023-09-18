import Layout from "@/components/Layout/Layout";
import Showcase from "@/components/Showcase/Showcase";
import {
  motion,
  useMotionValue,
  useTransform,
  Variant,
  AnimatePresence,
  animate
} from "framer-motion";
import Head from "next/head";
import styles from './index.module.scss';
import utilStyles from '@/styles/utils.module.scss';
import { useEffect, useState } from "react";
import MenuToggle from "./MenuToggle";
import clsx from "clsx";
import ScrollAnimation from "./ScrollAnimatoin";
import CircleIndicator from "./ScrollTrigger";
import { initialTabs as tabs } from "@/lib/examples/ingredients";
import { getIndex, useFlubber } from "@/lib/examples/use-flubber";
import { angular, react, solid, svelte, vue } from "@/lib/examples/paths";

const examples = () => {  
  return (
    <Layout>
      <Head>
        <title>Examples</title>
      </Head>
      <h1 className={utilStyles.heading2Xl}>Animation</h1>
      <Showcase>
        <motion.div
          className={styles.ball}
          initial={{ opacity: 0, scale: .5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .5 }}
        />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Keyframes</h1>
      <Showcase style={{
        background: 'black'
      }}>
        <motion.div
          className={styles.ball} style={{ background: 'white', borderRadius: 0}}
          animate={{
            // They passed with an array ↓
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270],
            borderRadius: ['0%', '0%', '50%', '50%', '0%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            times: [0, .2, .5, .8, 1]
          }}
        />
      </Showcase>
      
      <h1 className={utilStyles.heading2Xl}>Keyframes</h1>
      <p>This example is not finished</p>
      <Showcase>
        <Navigator />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Gesture animations</h1>
      <Showcase>
        <motion.div
          className={styles.ball} style={{ background: 'white' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .9 }}
        />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Drag</h1>
      <Showcase>
        <div className={clsx([styles.dragbox, utilStyles.flexCenter])}>
          <motion.div
            className={styles.ball}
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50
            }}
          />
        </div>
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>MotionValues</h1>
      <Showcase>
        <MotionValueDemo />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Scroll-trigger animations</h1>
      <Showcase style={{
        height: 500,
        overflowY: 'scroll',
        display: 'block'
      }}>
        <ScrollAnimation />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Scroll-linked animations</h1>
      <Showcase style={{ overflow: 'hidden', overflowY: 'scroll' }}>
        <CircleIndicator />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Exit animations</h1>
      <Showcase>
        <ExitAnimation />
      </Showcase>
      
      <h1 className={utilStyles.heading2Xl}>Layout animations</h1>
      <Showcase style={{ background: 'linear-gradient(250deg, #7b2ff7, #f107a3)'}}>
        <Switch />
      </Showcase>
      
      <h1 className={utilStyles.heading2Xl}>Shared layout animations</h1>
      <Showcase>
        <Tabs />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Line drawing</h1>
      <Showcase>
        <LineDraw />
      </Showcase>

      <h1 className={utilStyles.heading2Xl}>Path morphing</h1>
      <Showcase>
        <PathMorphing />
      </Showcase>
      
      <h1 className={utilStyles.heading2Xl}>React Router 6 page transition</h1>
      <p>This example is embed, not manually implementation.</p>
      <Showcase>
        <div
          style={{
            width: '100%',
            height: '100%'
          }}
          dangerouslySetInnerHTML={{__html: `<iframe src="https://codesandbox.io/embed/framer-motion-react-router-6-page-transitions-2f2olf?fontsize=14&hidenavigation=1&theme=dark"
          style="width:100%; height:100%; border:0; border-radius: 4px; overflow:hidden;"
          title="Framer Motion: React Router 6 page transitions"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>`}}></div>
      </Showcase>
    </Layout>
  )
}

const variants: {[key: string]: Variant} = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
}
const Navigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <MenuToggle toggle={() => setIsOpen(!isOpen)}/>
    </motion.nav>
  )
}

const MotionValueDemo = () => {
  const x = useMotionValue(0);
  // The useTransform hook will return the value smooth, and its value is computed by MotionValue x
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  );

  return (
    <motion.div
      className={utilStyles.flexCenter}
      style={{
        background,
        width: '100%',
        height: 80,
        borderRadius: 10
      }}
    >
      <motion.div
        className={styles.ball}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        // This x is a property defined in motion.div, it will pass its x-axis data into the MotionValue object.
        style={{ x, background: 'white' }}
      />
    </motion.div>
  )
}

const indexes = [1, 2, 3, 4, 5];
const ExitAnimation = () => {
  const [index, setIndex] = useState(0);

  const showNext = () => {
    let next = index + 1;
    if (next === indexes.length - 1) {
      next = 0;
    }
    setIndex(next);
  }

  return (
    <>
      <div style={{
        position: 'relative'
      }}>
        {indexes.map((val, idx) =>
          <SlideShow val={val} key={val} visible={idx === index}/>
        )}
      </div>
      <button onClick={showNext}>Next</button>
    </>
  )
}
const showVariants = {
  enter: {
    zIndex: 0,
    y: 200,
    opacity: 0
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    y: -200,
    opacity: 0
  }
}
const SlideShow = ({ val, visible }: { val: number, visible: boolean }) => (
  <AnimatePresence initial={false}>
    {visible && <motion.div
      key={val}
      className={styles.ball}
      style={{ background: 'white' }}
      variants={showVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {val}
    </motion.div>}
  </AnimatePresence>
)

const Switch = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <div
      className={styles.switch}
      data-is-on={isOn}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        layout // when data-isOn changed, the handler's position will change.
        className={styles.handle}
      />
    </div>
  )
}

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={styles.tabs}>
    <ul>
      {tabs.map(tab => (
        <li
          key={tab.label}
          className={tab === selectedTab ? styles.selected : ''}
          onClick={() => setSelectedTab(tab)}
        >
          {tab.icon} {tab.label}
          {tab === selectedTab && (
            // The "underline" will be animated when its unmount and a new underline mounted.
            <motion.div className={styles.underline} layoutId="underline"/>
          )}
        </li>
      ))}
      </ul>
    </div>
  )
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number) => {
    const delay = 1 + custom * .5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        // Length starts from the startpoint
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0},
        opacity: { delay, duration: .01 }
      },
    }
  }
}
const LineDraw = () => {
  return (
    <motion.svg
      className={styles.linebox}
      viewBox="0 0 240 240"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx='120' cy='120' r='25'
        stroke="aquamarine"
        variants={draw} custom={1}
      />
      <motion.line
        x1='20' y1='20' x2='60' y2='60'
        stroke='#1e90ff'
        variants={draw} custom={2}
      />
      <motion.line
        x1='60' y1='20' x2='20' y2='60'
        stroke='#1e90ff'
        variants={draw} custom={2.5}
      />
      <motion.circle
        cx='200' cy='40' r='25'
        stroke="aquamarine"
        variants={draw} custom={3}
      />
      <motion.line
        x1='20' y1='180' x2='60' y2='220'
        stroke='#1e90ff'
        variants={draw} custom={4}
      />
      <motion.line
        x1='60' y1='180' x2='20' y2='220'
        stroke='#1e90ff'
        variants={draw} custom={4.5}
      />
      <motion.circle
        cx={200} cy={200} r={25}
        stroke='aquamarine'
        variants={draw} custom={5}
      />
      <motion.line
        x1={180} y1={100} x2={220} y2={140}
        stroke='#1e90ff'
        variants={draw} custom={6}
      />
      <motion.line
        x1={220} y1={100} x2={180} y2={140}
        stroke='#1e90ff'
        variants={draw} custom={6.5}
      />
      <motion.rect
        width={50} height={50}
        x={95} y={15} rx={10}
        stroke='white'
        variants={draw} custom={7}
      />
      <motion.rect
        width={50} height={50}
        x={15} y={95} rx={10}
        stroke='white'
        variants={draw} custom={7.2}
      />
      <motion.rect
        width={50} height={50}
        x={95} y={175} rx={10}
        stroke='white'
        variants={draw} custom={7.4}
      />
    </motion.svg>
  )
}

const paths = [vue, react, angular, solid, svelte, vue];
const colors = [
  "#00cc88",
  "#61DAFB",
  "#DD0031",
  "#2C4F7C",
  "#FF3E00",
  "#00cc88",
];
const PathMorphing = () => {
  const [pathIndex, setPathIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors)
  const path = useFlubber(progress, paths);

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: .8,
      ease: 'easeInOut',
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      }
    });
    !isPlaying && animation.stop();
    
    return () => animation.stop();
  }, [pathIndex, progress, isPlaying]);

  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Play'}</button>
      <svg width={240} height={240}>
        <g transform="translate(10 10) scale(9 9)">
          <motion.path fill={fill} d={path} />
        </g>
      </svg>
    </>
  )
}
export default examples