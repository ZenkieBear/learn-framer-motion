import { triagle } from '@/lib/paths'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import styles from './Menu.module.scss'

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
}
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className={styles.menu}
    >
      <motion.button
        whileTap={{ scale: 0.97, transition: { duration: 0.05 } }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
        >
          <svg width={15} height={15} viewBox="0 0 20 20">
            <path d={triagle} />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <motion.li key={`menu-${i}`} variants={itemVariants}>
            Item {i}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  )
}

export default Menu
