import { H1, H2 } from '@/components/Headings/Headings'
import Layout from '@/components/Layout/Layout'
import Showcase from '@/components/Showcase/Showcase'
import React, { useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import styles from './index.module.scss'
import { initialTabs as tabs } from '@/lib/examples/ingredients'

const LayoutAnimations = () => {
  return (
    <Layout>
      <H1>Layout Animations</H1>
      <Showcase
        style={{
          background: 'linear-gradient(90deg, #3742fa, #1e90ff)',
        }}
      >
        <Switch />
      </Showcase>

      <H1>Scale correction</H1>
      <Showcase
        style={{
          background: 'linear-gradient(75deg, #5352ed, #e84393)',
        }}
      >
        <ScaleCorrection correction={false} />
        <ScaleCorrection correction={true} />
      </Showcase>

      <H2>Coordinating layout animations</H2>
      <Showcase>
        <div className={styles['accordion-list']}>
          <Accordion />
          <Accordion />
        </div>
        <div className={styles['accordion-list']}>
          <LayoutGroup>
            <Accordion />
            <Accordion />
          </LayoutGroup>
        </div>
      </Showcase>

      <H1>Shared layout animations</H1>
      <Showcase>
        <Navbar />
      </Showcase>
    </Layout>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}
const Switch = () => {
  const [value, setValue] = useState(false)

  return (
    <div
      className={styles.switch}
      data-is-on={value}
      onClick={() => setValue(!value)}
    >
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  )
}

interface ScaleCorrectionProps {
  correction: boolean
}
const ScaleCorrection = ({ correction }: ScaleCorrectionProps) => {
  const [isOn, setIsOn] = useState(false)
  return (
    <motion.div
      // the size change will be animated smooth
      layout
      className={styles.record}
      data-is-on={isOn}
      // set border radius here can promise it not be distorted
      initial={{ borderRadius: 50 }}
      animate={{ opacity: !isOn ? 0.5 : 1 }}
      transition={{
        opacity: { ease: 'linear' },
        layout: {
          duration: 0.5,
        },
      }}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        // layout keep children correct when parent is transforming
        layout={correction}
      />
    </motion.div>
  )
}

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      layout
      className={styles.accordion}
      style={{
        height: isOpen ? 200 : 100,
      }}
      onClick={() => setIsOpen(!isOpen)}
    />
  )
}

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <ul className={styles.navbar}>
      {tabs.map(tab => (
        <li key={tab.label} onClick={() => setSelectedTab(tab)}>
          {tab.icon} {tab.label}
          {selectedTab === tab && (
            <motion.div
              className={styles['focus-line']}
              layoutId='focus-line'
              initial={{ scaleX: 1, scaleY: 0.5 }}
              animate={{ scaleX: 1, scaleY: 1 }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default LayoutAnimations
