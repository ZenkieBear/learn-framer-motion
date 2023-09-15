import clsx from "clsx"
import { useScroll, useSpring, motion } from "framer-motion"
import styled from "styled-components"
import styles from './index.module.scss'
import utilStyles from '@/styles/utils.module.scss';
import { useState } from "react"

const div = styled.div`
  flex: 1;
  color: white;
  margin: 2rem;
`
const Progress = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 200vw;
  height: 200vw;
  width: 100%;
  height: 5px;
  overflow: hidden;
`

const CircleIndicator = () => {
  const [show, setShow] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: .001
  });
  
  
  return (
    <>
      {show && <motion.div className={styles['progress-bar']} style={{ scaleX }} />}
      <motion.div
        style={{
          padding: "5px 10px",
          background: 'white',
          borderRadius: 5,
          cursor: 'pointer'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: .95 }}
        onClick={() => setShow(!show)}
      >
        {show ? 'Show Progress' : 'No Progress'}
      </motion.div>
    </>
  )
}

export default CircleIndicator