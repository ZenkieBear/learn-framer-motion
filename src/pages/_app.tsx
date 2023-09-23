import { AppProps } from 'next/app'
import '@/styles/global.scss'

export default function AppRoot({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
