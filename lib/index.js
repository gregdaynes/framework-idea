import path from 'path'
import express from 'express'
import controller from './controller.js'

const registry = {
  router: express.Router,
  logger: {
    info: (msg, ...args) => console.log('logger:info', msg, {...args}),
    error: (msg, ...args) => console.error('logger:error', msg, {...args})
  },
  config: {
    dirs: {
      components: 'components'
    }
  }
};

let routes = {
  pre: new Set(),
  post: new Set(),
};

async function register(type, fn, opts = {}) {
  const func = (typeof fn === 'string') ? await loader(fn) : fn;
  const fnName = opts.name || func.name

  // if first of type, and no name provided - register as type
  if (!registry[type] && !opts.name) {
    return registry[type] = func;
  }

  // if first of type, and name provided - register as type.name
  if (!registry[type] && fnName) {
    return registry[type] = {
      [fnName]: func
    }
  }

  // if not first of type, and name exists - throw error
  if (registry[type] && registry[type][fnName]) {
    throw new Error('Could not register, entry already exists');
  }

  // if not first of type, and type is not expanded - expand existing and register as type.fn.name
  if (registry[type] && typeof registry[type] !== 'object') {
    registry[type] = {
      [registry[type].name]: registry[type],
      [fnName]: func
    }
  }

  return registry[type][fnName] = func;
}

async function loader(filepath) {
  const module = await import(filepath)
    .then(module => module.default)

  return module
}

Object.defineProperty(registry, 'register', {
  value: register,
  writeable: false,
  enumerable: false
})

Object.defineProperty(registry, 'start', {
  value: start,
  writeable: false,
  enumerable: false
})

const app = express();

Object.defineProperty(registry, 'mount', {
  value: (hook, component) => {
    routes[hook] = new Set([...routes[hook], component])
  },
  writeable: false,
  enumerable: false
})

Object.defineProperty(registry, 'controller', {
  value: controller,
  writeable: false,
  enumerable: false
})

export default registry

async function start({port}, callback) {
  if (!registry.logger) throw new Error('Logger missing from registry');

  const zzz = await loadComponents(registry.config.dirs.components)

  const x = Promise.all([
    ...routes['pre'],
    ...zzz,
    ...routes['post'],
  ])
    .then(components => {
      components
        .forEach(component => {
          if (component.filename) {
            app.use(component.filename + '/', component())
          } else {
            app.use(component())
          }
        })
    })
    .then(() => {
      callback = !callback ? () => registry.logger.info('running') : callback
      app.listen(port, callback)
      console.log(app._router)
    })
}

import glob from 'glob';

function loadComponents(dir) {
  const x = glob.sync(`${dir}/**/*.js`)
    .map(path.parse)
    .filter(filepath => {
      if (filepath.name === 'index') return true;
      // is named with uppercase
      if (!!/[A-Z]/.exec(filepath.name[0])) return true
    })
    .map(async filepath => {
      const x = path.join('../', filepath.dir, filepath.base)
      const component = await loader(x);

      if (!component) return;

      const y = filepath.dir
        .split(dir)
        .filter(Boolean) // split on the directory name - removing it
        .map(dirname => dirname.toLowerCase())

      // component is a directory with index file
      if (filepath.name === 'index') {
        component.filename = y.join('/') // done
        return component;
      }

      const z = y.flatMap(path => path.split('/'))
        .filter(Boolean)

      component.filename = ['', ...z, filepath.name.toLowerCase()].join('/')

      return component;
    })

  return Promise.all(x)
    .then(components => {
      return components
        .sort((a, b) => {
          return b.filename.length - a.filename.length
        })
    })
}
