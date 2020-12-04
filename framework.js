import path from 'path';

const registry = {};

function register(key, operator) {
  registry[key] = operator;
}

function getPath(file) {
  const base = new URL(import.meta.url).pathname;
  const dir = path.dirname(base)
  const newFilePath = path.join(dir, file + '.js')

  return newFilePath;
}

async function registerController(controllerName) {
  const controllerPath = getPath(controllerName);

  const controller = await import(controllerPath)
    .then(module => module.default)

  register('controller', controller)
}

export default {
  register,
  registerController,
  registry: () => registry
}
