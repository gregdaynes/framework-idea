import r from 'lib'

async function root(req, res) {
  console.log(req.data)

  const db = r.db()
  console.log(db);

  res.json({test: 'test'})
}

const router = () => {
  return r.router
    .get('/', r.controller(root))
    .get('/home', (req, res) => res.send('home'))
    .get('/error', r.controller((req, res) => {console.log('test'); throw new Error('xxx')}))
}

export default router
