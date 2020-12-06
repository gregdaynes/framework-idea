import registry from './framework.js';

registry.router = {y: 'firstController', ...registry.router}

export default function firstController() {
  console.log('->>>> controller called')

  console.log('I have access to db', registry.db())
}
