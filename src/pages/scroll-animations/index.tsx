import Layout from '@/components/Layout/Layout'
import styles from './index.module.scss'
import { H1, H2 } from '@/components/Headings/Headings'
import Showcase from '@/components/Showcase/Showcase'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

const ScrollAnimations = () => {
  return (
    <Layout>
      <H1>Scroll animations</H1>
      <H2>Scroll-linked animations</H2>
      <Showcase>
        <Component />
      </Showcase>
    </Layout>
  )
}

const Component = () => {
  const { scrollYProgress } = useScroll()

  return <motion.div className='ball' style={{ scaleX: scrollYProgress }} />
}

export default ScrollAnimations
