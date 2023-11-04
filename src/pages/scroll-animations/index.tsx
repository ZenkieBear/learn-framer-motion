import Layout from '@/components/Layout/Layout'
import styles from './index.module.scss'
import { H1, H2 } from '@/components/Headings/Headings'
import Showcase from '@/components/Showcase/Showcase'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const ScrollAnimations = () => {
  return (
    <Layout>
      <H1>Scroll animations</H1>
      <H2>Scroll-linked animations</H2>
      <Showcase
        style={{
          display: 'block',
        }}
      >
        <ScrollLinked />
      </Showcase>

      <H2>Scroll-triggered animations</H2>
      <Showcase
        style={{
          display: 'block',
          overflowY: 'auto',
          alignContent: 'center',
          position: 'relative',
        }}
      >
        <ScrollTriggered />
      </Showcase>
    </Layout>
  )
}

const useIndexes = (n: number) => {
  const indexes = []
  for (let i = 0; i < n; i++) {
    indexes.push(i)
  }
  return indexes
}

const ScrollLinked = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    container: ref,
  })

  const width = useTransform(
    useSpring(scrollYProgress, {
      damping: 50,
      stiffness: 200,
    }),
    [0, 1],
    ['0', '100%'],
  )
  const rotate = useTransform(
    useSpring(scrollYProgress, {
      damping: 50,
      stiffness: 300,
    }),
    [0, 1],
    ['0', '360deg'],
  )

  return (
    <section className={styles['scroll-linked']} ref={ref}>
      <h1>Je suis Zenkié Bear</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ab nemo
        perferendis maiores numquam cum reprehenderit repellendus voluptas sint
        voluptatibus recusandae itaque harum ratione quibusdam consequuntur,
        reiciendis sunt aliquam provident!Lorem
      </p>
      <h1>Mon joli bébé chat</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ab nemo
        perferendis maiores numquam cum reprehenderit repellendus voluptas sint
        voluptatibus recusandae itaque harum ratione quibusdam consequuntur,
        reiciendis sunt aliquam provident!Lorem
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ab nemo
        perferendis maiores numquam cum reprehenderit repellendus voluptas sint
        voluptatibus recusandae itaque harum ratione quibusdam consequuntur,
        reiciendis sunt aliquam provident!Lorem
      </p>

      <motion.div
        className={styles.headpic}
        animate={{
          rotate: '360deg',
          transition: {
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        <motion.div
          style={{
            rotate,
          }}
        >
          <Image
            src='/images/me.jpg'
            alt='Zenkie Bear'
            width={45}
            height={45}
          />

          <svg viewBox='0 0 100 100'>
            <path
              d='M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50'
              id='circle'
            />
            <text>
              <textPath xlinkHref='#circle'>
                👋🏼 I AM ZENKIE BEAR 💻 🎹 💪🏼
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.progress}
        style={{
          width,
        }}
      />
    </section>
  )
}

const ScrollTriggered = () => {
  const ids = useIndexes(10)

  return (
    <>
      {ids.map(id => (
        <motion.div
          key={id}
          className='ball'
          initial={
            {
              // marginLeft: 0
            }
          }
          whileInView={{
            marginLeft: 'calc(100% - 150px)',
            transition: {
              type: 'spring',
              stiffness: 50,
              damping: 8,
            },
          }}
        />
      ))}
    </>
  )
}

export default ScrollAnimations
