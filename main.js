import lib from './lib/index.js'
import data from './middleware/data.js'
import respond from './middleware/respond.js'
import error from './middleware/error.js'
// import User from './components/User.js'
import db from './db.js';

// register tools in container
lib.register('db', db);

// pre api middlware
lib.mount('pre', data)

// post api middleware
lib.mount('post', respond);
lib.mount('post', error)

export default lib;


// What about building something that setup the routes automaically based on self defined controllers?
// this would match Greg B's existing pattern
//
// component/x.js
// export default {
//   fetch: () => {},
//   list: () => {},
// }
//
// mounts as http://0.0.0.0:3000/x/fetch
// mounts as http://0.0.0.0:3000/x/list
//
// components/admin/y.js
// export default {
//   fetch: () => {},
//   list: () => {},
// }
//
// mounts as http://0.0.0.0:3000/admin/y/fetch
// mounts as http://0.0.0.0:3000/admin/y/list
//
// but how would middleware be set? unless the module mounted the middleware itself for these routes?
// - maybe the component also exports a router, with the bound middleware attached?
//
// components/x.js
// export default {
//   return router()
//     .use(groupMiddleware)
//     .post('/fetch', soloMiddleware, lib.controller(fetchController))
// }
//
// mounts as http://0.0.0.0:3000/x/fetch
