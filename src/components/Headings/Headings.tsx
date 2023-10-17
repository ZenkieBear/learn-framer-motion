import utilStyles from '@/styles/utils.module.scss'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
}

const children2Anchor = (children: string) => {
  return children.toLocaleLowerCase().replaceAll(' ', '-')
}
const Heading = ({ children }: HeadingProps) => {
  const anchor = children2Anchor(children as string)
  return (
    <Link id={anchor} href={`#${anchor}`} scroll={true}>
      {children}
    </Link>
  )
}
export const H1 = ({ children }: HeadingProps) => (
  <h1 className={utilStyles.heading2Xl}>
    <Heading>{children}</Heading>
  </h1>
)
export const H2 = ({ children }: HeadingProps) => (
  <h2 className={utilStyles.headingXl}>
    <Heading>{children}</Heading>
  </h2>
)
export const H3 = ({ children }: HeadingProps) => (
  <h3 className={utilStyles.headingLg}>
    <Heading>{children}</Heading>
  </h3>
)
export const H4 = ({ children }: HeadingProps) => (
  <h4 className={utilStyles.headingMd}>
    <Heading>{children}</Heading>
  </h4>
)
