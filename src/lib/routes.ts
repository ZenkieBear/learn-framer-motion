const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Getting Start',
    path: 'getting-start',
    default: '/examples',
    children: [
      {
        name: 'Examples',
        path: '/examples',
      },
    ],
  },
  {
    name: 'Animation',
    path: 'animation',
    default: '/animation',
    children: [
      {
        name: 'Overview',
        path: '/animation',
      },
    ],
  },
]
export default routes
