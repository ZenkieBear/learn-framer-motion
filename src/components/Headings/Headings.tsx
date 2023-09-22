import utilStyles from '@/styles/utils.module.scss';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode
}
export const H1 = ({ children }: HeadingProps) => <h1 className={utilStyles.heading2Xl}>{children}</h1>
export const H2 = ({ children }: HeadingProps) => <h2 className={utilStyles.headingXl}>{children}</h2>
export const H3 = ({ children }: HeadingProps) => <h3 className={utilStyles.headingLg}>{children}</h3>
export const H4 = ({ children }: HeadingProps) => <h4 className={utilStyles.headingMd}>{children}</h4>