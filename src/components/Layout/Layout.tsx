import routes from '@/pages/routes';
import Link from 'next/link';
import style from './Layout.module.scss';

const Layout = ({ isHome = false, children }: LayoutProps) => {
  return (
    <div className={style.container}>
      {!isHome && (
        <div className={style.navbar}>
          <Navbar routes={routes}/>
        </div>
      )}
      <div className={style.main}>
        {!isHome && (
          <div>
            <Link href={routes[0].path}>←</Link>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

const Navbar = ({ routes }: { routes: Route[]}) => {
  return (
    <ul className={style.nav}>
      {routes.map(r => r.children ? (
        <li key={r.path} className={style.parent}>
          <div className={style.parentTitle}>{r.name}</div>
          <Navbar routes={r.children}/>
        </li>
      ) : (
          <Link
            key={r.path}
            className={style.link}
            href={r.path}>
              {r.name}
          </Link>
      ))}
    </ul>
  )
}

export default Layout