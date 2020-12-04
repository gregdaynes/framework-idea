const path = require('path');

const registry = {};

function register(key, operator) {
  registry[key] = operator;
}

function registerController(controllerName) {
  const x = path.join(__dirname, controllerName + '.js');
  require(x);
}

module.exports = function () {
  return {
    register,
    registerController,
    registry: () => registry
  }
}
