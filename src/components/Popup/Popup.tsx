import { Variants, motion } from 'framer-motion'
import { ComponentProps, useState } from 'react'
import styles from './Popup.module.scss'

const prompt: Variants = {
  hide: {
    scale: 0,
  },
  show: {
    scale: 1,
  },
}

const Popup = ({
  children,
  title,
}: ComponentProps<any> & {
  title: string
}) => (
  <motion.div initial='hide' whileHover='show' className={styles.popup}>
    <motion.div variants={prompt} className={styles.prompt}>
      {title}
    </motion.div>
    {children}
  </motion.div>
)

export default Popup
