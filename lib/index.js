import path from 'path'
import express from 'express'
import controller from './controller.js'

const registry = {
  router: express.Router(),
  logger: {
    info: (msg, ...args) => console.log('logger:info', msg, {...args}),
    error: (msg, ...args) => console.error('logger:error', msg, {...args})
  },
};

let routes = new Set();

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

function getPath(file) {
  const base = new URL(import.meta.url).pathname;
  const dir = path.dirname(base)
  const newFilePath = path.join(dir, file + '.js')

  return newFilePath;
}

async function loader(filename) {
  const filepath = getPath(filename);

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
  value: (component) => {
    routes = new Set([...routes, component])
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

function start({port}) {
  if (!registry.logger) throw new Error('Logger missing from registry');

  // TODO maintain middleware order
  for (let route of routes) {
    app.use(route)
  }

  app.listen(port, () => registry.logger.info('running'))
}
