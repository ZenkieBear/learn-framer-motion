const routes: Route[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Getting Start',
    path: 'getting-start',
    default: '/examples',
    children: [
      {
        name: 'Examples',
        path: '/examples'
      }
    ]
  }
]
export default routes;
