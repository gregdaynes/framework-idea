import lib from 'lib'

export default function User() {
  return lib.router('/')
    .all('/', lib.controller(root))
    .get('/home', (req, res) => res.send('home'))
    .get('/error', customMiddleware, lib.controller((req, res) => {throw new Error('xxx')}))
}


// Controllers
async function root(req, res) {
  res.data = {...req.data, controller: 'client/'}
}

// middlware
function customMiddleware(req, res, next) {
  console.log('customMiddleware')
  next();
}
