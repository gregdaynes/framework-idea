import registry from './framework.js';

registry.router = {z: 'kontroller', ...registry.router}

export default function controller() {
  console.log('->>>> controller called')

  console.log('I have access to db', registry.db())
}

