import lib from './lib/index.js'
import data from './middleware/data.js'
import error from './middleware/error.js'
import User from './components/User.js'

// register tools in container
lib.register('db', function db() {return 'I am the database'});

// pre api middlware
lib.mount(data)

// mount controllers
lib.mount(User())

// post api middleware
lib.mount(error())

export default lib;
