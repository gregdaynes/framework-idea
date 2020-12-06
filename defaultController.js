import registry from './framework.js';

registry.router = {x: 'defaultController', ...registry.router}

export default function defaultController() {
  console.log('->>>> controller called')

  console.log('I have access to db', registry.db())
  console.log(registry.router)

  return 'test'
}
